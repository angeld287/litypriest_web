import React, { Fragment } from 'react';
import useEvents from './useEvents';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBBox, MDBDataTable, MDBBtn } from 'mdbreact';
import Spinner from '../Spinner/Spinner';

import './index.css';

const Events = () => {
	const { loading, error, events, handleDeleteEvent } = useEvents();

	//(event.data.getEvent.contacts.items[0] === undefined)?("0"):(event.data.getEvent.contacts.items[0].contact.id);
	const data = () => {
		var formatedEvents = [];
			events.forEach((event) => {
				formatedEvents.push({
					name: event.name,
					category: (event.category === null) ? ("no category") : (event.category.name),
					date: (event.date === null) ? ("no date") : (event.date),
					contact: (event.contacts.items[0] === undefined) ? ("no contact") : (event.contacts.items[0].contact.name),
					contactPhone: (event.contacts.items[0] === undefined) ? ("no ubication") : (event.contacts.items[0].contact.phone),
					options: (
						<Fragment>
							<Link to={`events/${event.id}/details`} className="btn btn-info btn-sm" style={{marginRight:10}}>
								Detalle
							</Link>
							<Link to={`events/${event.id}/edit`} className="btn btn-success btn-sm">
								Editar
							</Link>
							<MDBBtn color="red" size="sm" onClick={() => handleDeleteEvent(event.id)}>
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
			rows: formatedEvents
		};
	}

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
			<Link to={`events/new`} className="btn btn-primary btn-sm">
				Nuevo Evento
			</Link>
			<MDBDataTable
				striped
				bordered
				searchLabel="Buscar"
				responsiveSm={true}
				small
				hover
				entries={5}
				btn={true}
				data={data()}
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
