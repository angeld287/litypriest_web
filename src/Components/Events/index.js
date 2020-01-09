import React, { Fragment } from 'react';
import useEvents from './useEvents';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBBox, MDBDataTable, MDBBtn, MDBCol, MDBRow, MDBIcon, MDBDatePicker } from 'mdbreact';
import Spinner from '../Spinner/Spinner';

import './index.css';

const Events = () => {
	const { loading, error, events, handleDeleteEvent, setDateFrom, setDateTo, handleExportExcel } = useEvents();

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
			<br/>
			<br/>
			<h3 className="mt-5">Reporte de Eventos (Excel)</h3>
			<br/>
			<MDBRow className="text-center" style={{width: '100%'}}>
					<MDBCol md="4">
						Fecha Desde: <MDBDatePicker getValue={ d => setDateFrom(d)} />
					</MDBCol>
					<MDBCol md="4">
						<div>
							Fecha Hasta: <MDBDatePicker getValue={ d => setDateTo(d)} />
						</div>
					</MDBCol>
					<MDBCol md="4">
						<MDBBtn tag="a" floating color="blue" className="accent-1">
							<MDBIcon icon="download" onClick={() => handleExportExcel()} />
						</MDBBtn>
					</MDBCol>
          	</MDBRow>
		</MDBContainer>
	);
};

export default Events;
