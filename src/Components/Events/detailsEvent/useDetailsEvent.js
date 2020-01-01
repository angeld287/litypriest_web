import { useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { getEvent } from '../../../graphql/custom-queries';
import { updateEvent, createEventLocations, createEventContacts } from '../../../graphql/mutations';
import Swal from 'sweetalert2';

const useDetailsEvent = () => {
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
					eventApi = event.data.getEvent;
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

	return { event, register, handleSubmit, setValue, errors, error };
};

export default useDetailsEvent;