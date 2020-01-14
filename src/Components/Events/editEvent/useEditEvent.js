import { useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { listCategorys, listLocations, listContacts } from '../../../graphql/queries';
import { getEvent } from '../../../graphql/custom-queries';
import { updateEvent, createEventContacts, deleteEventContacts } from '../../../graphql/mutations';
import Swal from 'sweetalert2';
import { uniq } from '../../Functions'

const useEditEvent = () => {
	let history = useHistory();
	let { id } = useParams();
	const [ event, setEvent ] = useState({});
	const [ error, setError ] = useState(false);
	const { register, handleSubmit, errors, setValue } = useForm();
	const [ oldEventContacts, setOldEventContacts ] = useState([]);
	const [ eventContacts, setEventContacts ] = useState([]);
	const [ eventLocationId, setEventLocationId ] = useState('');
	const [ date, setDate ] = useState(new Date());

	useEffect(
		() => {
			let didCancel = false;
			const fetchEvent = async () => {
				let eventApi = {};

				try {
					const event = await API.graphql(graphqlOperation(getEvent, { id }));
					const categories = await API.graphql(graphqlOperation(listCategorys, {limit: 400}));
					const locations = await API.graphql(graphqlOperation(listLocations, {limit: 400}));
					const contacts = await API.graphql(graphqlOperation(listContacts, {limit: 400}));
					eventApi = {
						event: event.data.getEvent,
						categories: categories.data.listCategorys.items.filter(x => x.module === "event"),
						locations: locations.data.listLocations.items,
						contacts: contacts.data.listContacts.items,
					};
				} catch (e) {
					setError(true);
				}

				if (!didCancel) {
					setEvent(eventApi);
					setOldEventContacts(eventApi.event.contacts.items);
				}

				return () => {
					didCancel = true;
				};
			};

			fetchEvent();
		},
		[ id ]
	);

	const onSubmit = async (input) => {
		//input.id = id;
		const inputEvent = {
			id: id,
			name: input.name,
			description: input.description,
			duration: input.duration
		}

		if(date !== ""){
			inputEvent.date = date
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
		}

		const event = await API.graphql(graphqlOperation(getEvent, { id }));
		const contactid = (event.data.getEvent.contacts.items[0] === undefined)?("0"):(event.data.getEvent.contacts.items[0].contact.id);

		const inputEventContact = {
			eventContactsEventId: id,
    		eventContactsContactId: input.eventContactId
		}

		try {
			await API.graphql(graphqlOperation(updateEvent, {input: inputEvent} ));
			const updateContacts = uniq(eventContacts, "id");

			//delete event contacts removed
			oldEventContacts.forEach(e => {
				const eventContactIndex = updateContacts.findIndex(x => x.id === e.contact.id)
				if(eventContactIndex === -1){
					API.graphql(graphqlOperation(deleteEventContacts, {input: {id: e.id}} ));
				}
			});

			// create event contacts added
			updateContacts.forEach(e => {
				const inputEventContact = {
					eventContactsEventId: inputEvent.id,
					eventContactsContactId: e.id
				};
				const eventContact = oldEventContacts.findIndex(x => x.contact.id === e.id)
				if(eventContact === -1){
					API.graphql(graphqlOperation(createEventContacts, {input: inputEventContact} ));
				}
			});

			
			
			await Swal.fire('Correcto', 'El evento se ha actualizado correctamente', 'success');
			history.push('/events');
		} catch (e) {
			console.log(e);
			
			Swal.fire('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
		}
	};

	return { onSubmit, event, register, handleSubmit, setValue, errors, error, setEventLocationId, setDate, setEventContacts };
};

export default useEditEvent;
