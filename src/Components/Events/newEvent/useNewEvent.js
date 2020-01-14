import { useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { listCategorys, listLocations, listContacts } from '../../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { createEvent, createEventContacts } from '../../../graphql/mutations';
import Swal from 'sweetalert2';
import { uniq } from '../../Functions'

const useNewEvent = () => {
	const { register, handleSubmit, errors, formState, setValue } = useForm();
	let history = useHistory();
	const [ event, setEvent ] = useState({});
	const [ error, setError ] = useState(false);
	const [ eventLocationId, setEventLocationId ] = useState('');
	const [ eventContacts, setEventContacts ] = useState([]);
	const [ date, setDate ] = useState(new Date());

	useEffect(
		() => {
			let didCancel = false;
			const fetchEvent = async () => {
				let eventApi = {};

				try {
					const categories = await API.graphql(graphqlOperation(listCategorys, {limit: 400}));
					const locations = await API.graphql(graphqlOperation(listLocations, {limit: 400}));
					const contacts = await API.graphql(graphqlOperation(listContacts, {limit: 400}));
					eventApi = {
						categories: categories.data.listCategorys.items.filter(x => x.module === "event"),
						locations: locations.data.listLocations.items,
						contacts: contacts.data.listContacts.items,
					};
				} catch (e) {
					setError(true);
				}

				if (!didCancel) {
					setEvent(eventApi);
				}

				return () => {
					didCancel = true;
				};
			};
			fetchEvent();
		}
	);

	const onSubmit = async (input) => {
		try {
			const inputEvent = {
				name: input.name,
				description: input.description,
				duration: input.duration
			}
			
			if(date !== ""){
				inputEvent.date = date
			}else{
				Swal.fire('Campo Obligatorio', 'Favor completar el campo Fecha', 'error');
				return;
			}

			if(input.eventCategoryId !== "0"){
				inputEvent.eventCategoryId = input.eventCategoryId
			}else{
				Swal.fire('Campo Obligatorio', 'Favor completar el campo Tipo de Evento', 'error');
				return;
			}

			if(eventContacts == []){
				Swal.fire('Campo Obligatorio', 'Favor completar el campo Contacto', 'error');
				return;
			}

			if(eventLocationId !== ""){
				inputEvent.eventLocationId = eventLocationId
			}else{
				Swal.fire('Campo Obligatorio', 'Favor completar el campo Lugar de Evento', 'error');
				return;
			}

			const event = await API.graphql(graphqlOperation(createEvent, { input: inputEvent }));

			const createContacts = uniq(eventContacts, "id");

			createContacts.forEach(e => {
				const inputEventContact = {
					eventContactsEventId: event.data.createEvent.id,
					eventContactsContactId: e.id
				};
				API.graphql(graphqlOperation(createEventContacts, {input: inputEventContact} ));
			});
			
			await Swal.fire('Correcto', 'El evento se ha creado correctamente', 'success');
			history.push('/events');
		} catch (error) {
			Swal.fire('Ha ocurrido un error', 'Intentelo de nuevo mas tarde'+error, 'error');
		}
	};

	return { onSubmit, register, handleSubmit, errors, error, formState, event, setValue, setEventLocationId, setDate, setEventContacts };
};

export default useNewEvent;
