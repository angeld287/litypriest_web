import { useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { getContact } from '../../../graphql/queries';
import { updateContact } from '../../../graphql/mutations';
import Swal from 'sweetalert2';

const useEditContact = () => {
	let history = useHistory();
	let { id } = useParams();
	const [ contact, setContact ] = useState({});
	const [ error, setError ] = useState(false);
	const { register, handleSubmit, errors } = useForm();

	useEffect(
		() => {
			let didCancel = false;
			const fetchContact = async () => {
				let contactApi = {};

				try {
					contactApi = await API.graphql(graphqlOperation(getContact, { id }));
				} catch (e) {
					setError(true);
				}

				if (!didCancel) {
					setContact(contactApi.data.getContact);
				}

				return () => {
					didCancel = true;
				};
			};

			fetchContact();
		},
		[ id ]
	);

	const onSubmit = async (input) => {
		input.id = id;
		try {
			await API.graphql(graphqlOperation(updateContact, { input }));
			await Swal.fire('Correcto', 'El usuario se ha actualizado correctamente', 'success');
			history.push('/contacts');
		} catch (e) {
			Swal.fire('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
		}
	};

	return { onSubmit, contact, register, handleSubmit, errors, error };
};

export default useEditContact;
