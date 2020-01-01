import { useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { listCategorys, listLocations, listContacts } from '../../../graphql/queries';
import { getEvent } from '../../../graphql/custom-queries';
import { updateEvent, createEventContacts } from '../../../graphql/mutations';
import Swal from 'sweetalert2';

const useEditEvent = () => {
	let history = useHistory();
	let { id } = useParams();
	const [ event, setEvent ] = useState({});
	const [ error, setError ] = useState(false);
	const { register, handleSubmit, errors, setValue } = useForm();

	useEffect(
		() => {
			let didCancel = false;
			const fetchEvent = async () => {
				let eventApi = {};

				try {
					const event = await API.graphql(graphqlOperation(getEvent, { id }));
					const categories = await API.graphql(graphqlOperation(listCategorys));
					const locations = await API.graphql(graphqlOperation(listLocations));
					const contacts = await API.graphql(graphqlOperation(listContacts));
					eventApi = {
						event: event.data.getEvent,
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
		},
		[ id ]
	);

	const onSubmit = async (input) => {
		//input.id = id;
		const inputEvent = {
			id: id,
			name: input.name,
			eventCategoryId: input.eventCategoryId,
			description: input.description,
			eventLocationId: input.eventLocationId
		}

		if(input.date !== ""){
			inputEvent.date = input.date
		}

		const event = await API.graphql(graphqlOperation(getEvent, { id }));
		const contactid = (event.data.getEvent.contacts.items[0] === undefined)?("0"):(event.data.getEvent.contacts.items[0].contact.id);

		const inputEventContact = {
			eventContactsEventId: id,
    		eventContactsContactId: input.eventContactId
		}

		try {
			await API.graphql(graphqlOperation(updateEvent, {input: inputEvent} ));
			if((inputEventContact.eventContactsContactId !== contactid) && (inputEventContact.eventContactsContactId !== "0")) {
				await API.graphql(graphqlOperation(createEventContacts, {input: inputEventContact} ));
			}
			
			await Swal.fire('Correcto', 'El evento se ha actualizado correctamente', 'success');
			history.push('/events');
		} catch (e) {
			console.log(e);
			
			Swal.fire('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
		}
	};

	return { onSubmit, event, register, handleSubmit, setValue, errors, error };
};

export default useEditEvent;
