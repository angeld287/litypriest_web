import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listContacts } from './../../graphql/queries';
import Swal from 'sweetalert2';
import { deleteContact } from '../../graphql/mutations';

const useContacts = () => {
	const [ contacts, setContacts ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);

	useEffect(() => {
		let didCancel = false;

		const fetchContacts = async () => {
			var contactsApi = [];

			try {
				contactsApi = await API.graphql(graphqlOperation(listContacts, {limit: 400}));
			} catch (error) {
				setLoading(false);
				setError(true);
			}

			if (!didCancel) {
				setContacts(contactsApi.data.listContacts.items);
				setLoading(false);
			}
		};

		fetchContacts();

		return () => {
			didCancel = true;
		};
	}, []);

	const handleDeleteContact = async (id) => {
		const result = await Swal.fire({
			title: '¿Desea eliminar el contacto?',
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
				await API.graphql(graphqlOperation(deleteContact, { input }));
				Swal.fire('Eliminado correctamente!', '', 'success');
				setContacts(contacts.filter((contact) => contact.id !== id));
			} catch (error) {
				Swal.fire('Error', 'Intentelo nuevamente', 'error');
			}
		}
	};

	return { contacts, error, loading, handleDeleteContact };
};

export default useContacts;
