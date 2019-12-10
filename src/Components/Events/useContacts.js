import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { listContacts } from './../../graphql/queries';
import { MDBBtn } from 'mdbreact';

const useContacts = () => {
	const [ contacts, setContacts ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);

	useEffect(() => {
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
							<MDBBtn color="red" size="sm">
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
	}, []);

	return { contacts, error, loading };
};

export default useContacts;
