import React, { useState, useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { listContacts } from './../../graphql/queries';
import { MDBBtn } from 'mdbreact';
import Swal from 'sweetalert2';
import { deleteContact } from '../../graphql/mutations';

const useContacts = () => {
	const [ contacts, setContacts ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);

	useEffect(
		() => {
			const fetchContacts = async () => {
				var contactsApi = [];

				try {
					contactsApi = await API.graphql(graphqlOperation(listContacts));
				} catch (error) {
					setLoading(false);
					setError(true);
				}

				var formatedContacts = [];
				contactsApi.data.listContacts.items.forEach((contact) => {
					formatedContacts.push({
						name: contact.name,
						phone: contact.phone,
						options: (
							<Fragment>
								<Link to={`contacts/${contact.id}/edit`} className="btn btn-success btn-sm">
									Editar
								</Link>
								<MDBBtn color="red" size="sm" onClick={() => handleDeleteContact(contact.id)}>
									Borrar
								</MDBBtn>
							</Fragment>
						)
					});
				});
				setContacts(formatedContacts);
				setLoading(false);
			};

			fetchContacts();
		},
		[ contacts ]
	);

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
			} catch (error) {
				Swal.fire('Error', 'Intentelo nuevamente', 'error');
			}
		}
	};

	return { contacts, error, loading };
};

export default useContacts;
