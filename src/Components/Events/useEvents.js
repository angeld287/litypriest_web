import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listEvents } from './../../graphql/custom-queries';
import Swal from 'sweetalert2';
import { deleteEvent } from '../../graphql/mutations';

const useEvents = () => {
	const [ events, setEvents ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);

	useEffect(() => {
		let didCancel = false;

		const fetchEvents = async () => {
			var eventsApi = [];

			try {
				eventsApi = await API.graphql(graphqlOperation(listEvents));
			} catch (error) {
				setLoading(false);
				setError(true);
			}

			if (!didCancel) {
				setEvents(eventsApi.data.listEvents.items);
				setLoading(false);
			}
		};

		fetchEvents();

		return () => {
			didCancel = true;
		};
	}, []);


	const handleDeleteEvent = async (id) => {
		const result = await Swal.fire({
			title: '¿Desea eliminar el evento?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Eliminar',
			cancelButtonText: 'Cancelar'
		});

		var input = {
			id
		};

		if (result.value) {
			try {
				await API.graphql(graphqlOperation(deleteEvent, { input }));
				Swal.fire('Eliminado correctamente!', '', 'success');
				setEvents(events.filter((event) => event.id !== id));
			} catch (error) {
				Swal.fire('Error', 'Intentelo nuevamente', 'error');
			}
		}
	};

	return { events, error, loading, handleDeleteEvent };
};

export default useEvents;
