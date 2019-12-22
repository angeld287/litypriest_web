import { useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { listCategorys, listLocations, listContacts } from '../../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import { createEvent, createEventLocations, createEventContacts } from '../../../graphql/mutations';
import Swal from 'sweetalert2';

const useNewEvent = () => {
	const { register, handleSubmit, errors, formState, setValue } = useForm();
	let history = useHistory();
	const [ event, setEvent ] = useState({});
	const [ error, setError ] = useState(false);

	useEffect(
		() => {
			let didCancel = false;
			const fetchEvent = async () => {
				let eventApi = {};

				try {
					const categories = await API.graphql(graphqlOperation(listCategorys));
					const locations = await API.graphql(graphqlOperation(listLocations));
					const contacts = await API.graphql(graphqlOperation(listContacts));
					eventApi = {
						categories: categories.data.listCategorys.items,
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
				eventCategoryId: input.eventCategoryId,
				description: input.description
			}

			if(input.date !== ""){
				inputEvent.date = input.date
			}

			const event = await API.graphql(graphqlOperation(createEvent, { input: inputEvent }));
			const inputEventContact = {
				eventContactsEventId: event.data.createEvent.id,
				eventContactsContactId: input.eventContactId
			}

			const inputEventLocation = {
				eventLocationsEventId: event.data.createEvent.id,
				eventLocationsLocationId: input.eventLocationId
			}

			if(inputEventContact.eventContactsContactId !== "0"){ await API.graphql(graphqlOperation(createEventContacts, {input: inputEventContact} )); }
			if(inputEventLocation.eventLocationsLocationId !== "0"){ await API.graphql(graphqlOperation(createEventLocations, {input: inputEventLocation} )); }
			
			await Swal.fire('Correcto', 'El evento se ha creado correctamente', 'success');
			history.push('/events');
		} catch (error) {
			Swal.fire('Ha ocurrido un error', 'Intentelo de nuevo mas tarde', 'error');
		}
	};

	return { onSubmit, register, handleSubmit, errors, error, formState, event, setValue };
};

export default useNewEvent;
