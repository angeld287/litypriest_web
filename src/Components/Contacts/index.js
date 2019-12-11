import React, { Fragment } from 'react';
import useContacts from './useContacts';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBBox, MDBDataTable, MDBBtn } from 'mdbreact';
import Spinner from '../Spinner/Spinner';

import './index.css';

const Contacts = () => {
	const { loading, error, contacts, handleDeleteContact } = useContacts();

	const data2 = () => {
		var formatedContacts = [];
		contacts.forEach((contact) => {
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

		return {
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
			rows: formatedContacts
		};
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
			<Link to={`contacts/new`} className="btn btn-primary btn-sm">
				Nuevo Contacto
			</Link>
			<MDBDataTable
				striped
				bordered
				searchLabel="Buscar"
				responsiveSm={true}
				small
				hover
				btn={true}
				data={data2()}
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
