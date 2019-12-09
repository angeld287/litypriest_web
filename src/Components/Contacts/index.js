import React from 'react';
import useContacts from './useContacts';
import { MDBContainer, MDBBox, MDBDataTable } from 'mdbreact';
import Spinner from '../Spinner/Spinner';

import './index.css';

const Contacts = () => {
	const { loading, error, contacts } = useContacts();

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
