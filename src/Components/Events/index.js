import React from 'react';
import useEvents from './useEvents';
import { MDBContainer, MDBBox, MDBDataTable } from 'mdbreact';
import Spinner from '../Spinner/Spinner';

import './index.css';

const Events = () => {
	const { loading, error, events } = useEvents();

	const data = {
		columns: [
			{
				label: 'Nombre',
				field: 'name',
				sort: 'asc'
			},
			{
				label: 'Categoria',
				field: 'category',
				sort: 'asc'
			},
			{
				label: 'Fecha',
				field: 'date',
				sort: 'disabled'
			},
			{
				label: 'Contacto',
				field: 'contact',
				sort: 'disabled'
			},
			{
				label: 'Telefono de Contacto',
				field: 'contactPhone',
				sort: 'disabled'
			},
			{
				label: 'Opciones',
				field: 'options',
				sort: 'disabled'
			}
		],
		rows: events
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
			<h3 className="mt-5">Eventos</h3>
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
				noRecordsFoundLabel="No se han encontrado eventos"
				entriesLabel="Numero de datos"
				entriesOptions={[ 5, 10 ]}
				infoLabel={[ 'Mostrando del', 'al', 'de', 'registros' ]}
				paginationLabel={[ 'Anterior', 'Siguiente' ]}
				noBottomColumns={true}
			/>
		</MDBContainer>
	);
};

export default Events;