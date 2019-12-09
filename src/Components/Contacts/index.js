import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { listContacts } from './../../graphql/queries';
import { MDBContainer, MDBBox, MDBDataTable, MDBBtn } from 'mdbreact';
import Spinner from '../Spinner/Spinner';

import './index.css';

const Contacts = () => {
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

	const data = {
		columns: [
			{
				label: 'Nombre',
				field: 'name',
				sort: 'asc'
			},
			{
				label: 'Telefono',
				field: 'phone',
				sort: 'asc'
			},
			{
				label: 'Opciones',
				field: 'options',
				sort: 'disabled'
			}
		],
		rows: contacts
	};

	if (loading) {
		return (
			<MDBContainer>
				<MDBBox display="flex" justifyContent="center" className="mt-5">
					<Spinner />
				</MDBBox>
			</MDBContainer>
		);
	}

	if (error) return <h2>Ha ocurrido un error</h2>;

	return (
		<MDBContainer>
			<h3 className="mt-5">Contactos</h3>
			<MDBDataTable
				striped
				bordered
				searchLabel="Buscar"
				responsiveSm={true}
				small
				hover
				entries={5}
				btn={true}
				data={data}
				noRecordsFoundLabel="No se han encontrado contactos"
				entriesLabel="Numero de datos"
				entriesOptions={[ 5, 10 ]}
				infoLabel={[ 'Mostrando del', 'al', 'de', 'registros' ]}
				paginationLabel={[ 'Anterior', 'Siguiente' ]}
				noBottomColumns={true}
			/>
		</MDBContainer>
	);
};

export default Contacts;
