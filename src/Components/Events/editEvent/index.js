import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import Spinner from '../../Spinner/Spinner';
import useEditEvent from './useEditEvent';


const EditEvent = () => {
	const { onSubmit, event, register, handleSubmit, errors, error, setValue } = useEditEvent();
	
	if (Object.entries(event).length === 0 && event.constructor === Object) return <Spinner />;

	if (error) {
		return (
			<MDBContainer>
				<h3>Ha ocurrido un error</h3>
			</MDBContainer>
		);
	}

	const categoryname = (event.event.category === null)?("Seleccione una opcion"):(event.event.category.name);
	const categoryid = (event.event.category === null)?("0"):(event.event.category.id);

	const contactname = (event.event.contacts.items[0] === undefined)?("Seleccione una opcion"):(event.event.contacts.items[0].contact.name);
	const contactid = (event.event.contacts.items[0] === undefined)?("0"):(event.event.contacts.items[0].contact.id);

	const locationname = (event.event.location === null)?("Seleccione una opcion"):(event.event.location.name);
	const locationid = (event.event.location === null)?("0"):(event.event.location.id);

	let categories = event.categories.filter(c => c.id !== categoryid).map((category, i) => {
      return (<option key={i} value={category.id}>{category.name}</option>)
    });

	let locations = event.locations.filter(l => l.id !== locationid).map((location, i) => {
      return (<option key={i} value={location.id}>{location.name}</option>)
    });

	let contacts = event.contacts.filter(c => c.id !== contactid).map((contact, i) => {
      return (<option key={i} value={contact.id}>{contact.name}</option>)
    });

	return (
		<MDBContainer>
			<form onSubmit={handleSubmit(onSubmit)}>
				<MDBRow center={true}>
					<MDBCol className="mt-5" md="10">
						<MDBCard>
							<MDBCardBody>
								<p className="h4 text-center py-4">Datos de Evento</p>

								<label htmlFor="name" className="grey-text font-weight-light">
									Nombre del Evento:
								</label>
								<input
									name="name"
									autoComplete="off"
									defaultValue={event.event.name}
									className="form-control"
									ref={register({ required: { message: 'Este campo es requerido', value: true } })}
								/>
								{errors.name && <span className="text-danger mb-2">{errors.name.message}</span>}

								<br />
								<label htmlFor="eventCategoryId" className="grey-text font-weight-light">
									Tipo de Evento:
								</label>
								<select name="eventCategoryId" className="browser-default custom-select"
									ref={register({
										required: { message: 'Este campo es requerido', value: true }
									})}>
									<option value={categoryid}>{categoryname}</option>
									{categories}
								</select>
								{errors.categoryid && <span className="text-danger mb-2">{errors.categoryid.message}</span>}

								<br />
								<label htmlFor="date" className="grey-text font-weight-light">
									Fecha del Evento:
								</label>
								<input type="date" name="date" className="form-control" min="2018-01-01" max="3000-12-31" ref={register}/>
								{errors.date && <span className="text-danger mb-2">{errors.date.message}</span>}


								<br />

								<label htmlFor="description" className="grey-text font-weight-light">
									Descripcion del Evento:
								</label>
								<textarea
									className="form-control"
									rows="10"
									name="description"
									autoComplete="off"
									defaultValue={event.event.description}
									ref={register({
										required: { message: 'Este campo es requerido', value: true }
									})}
								/>
								{errors.description && <span className="text-danger mb-2">{errors.description.message}</span>}
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
					<MDBCol className="mt-5" md="10">
						<MDBCard>
							<MDBCardBody>
								<p className="h4 text-center py-4">Contacto y Lugar del Evento</p>

								<br />
								<label htmlFor="eventContactId" className="grey-text font-weight-light">
									Contacto:
								</label>
								<select name="eventContactId" className="browser-default custom-select"
									ref={register({
										required: { message: 'Este campo es requerido', value: true }
									})}>
									<option value={contactid}>{contactname}</option>
									{contacts}
								</select>
								{errors.eventContactId && <span className="text-danger mb-2">{errors.eventContactId.message}</span>}

								<br />
								<label htmlFor="eventLocationId" className="grey-text font-weight-light">
									Lugar de Evento:
								</label>
								<select name="eventLocationId" className="browser-default custom-select"
									ref={register({
										required: { message: 'Este campo es requerido', value: true }
									})}>
									<option value={locationid}>{locationname}</option>
									{locations}
								</select>
								{errors.eventLocationId && <span className="text-danger mb-2">{errors.eventLocationId.message}</span>}
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
				<div className="text-center py-4 mt-3">
					<MDBBtn className="btn btn-outline-blue" type="submit">
						Guardar
					</MDBBtn>
				</div>
			</form>
		</MDBContainer>
	);
};

export default EditEvent;
