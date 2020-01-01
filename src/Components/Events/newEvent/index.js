import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import Spinner from '../../Spinner/Spinner';
import useNewEvent from './useNewEvent';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const NewEvent = () => {
	const { onSubmit, register, event, handleSubmit, errors, error, formState, setValue, setEventLocationId, setDate } = useNewEvent();

	if (Object.entries(event).length === 0 && event.constructor === Object) return <Spinner />;

	if (error) {
		return (
			<MDBContainer>
				<br/>
				<br/>
				<br/>
				<h3>Ha ocurrido un error</h3>
			</MDBContainer>
		);
	}

	let categories = event.categories.map((category, i) => {
      return (<option key={i} value={category.id}>{category.name}</option>)
    });

	let locations = event.locations.map((location, i) => {
      return (<option key={i} value={location.id}>{location.name}</option>)
    });

	let contacts = event.contacts.map((contact, i) => {
      return (<option key={i} value={contact.id}>{contact.name}</option>)
    });

	return (
		<MDBContainer>
			<MDBRow className="mt-5" center={true}>
				<MDBCol md="10">
					<MDBCard>
						<MDBCardBody>
							<form onSubmit={handleSubmit(onSubmit)}>
								<p className="h4 text-center py-4">Nuevo Evento</p>
{/* name */}
								<label htmlFor="name" className="grey-text font-weight-light">
									Nombre del Evento:
								</label>
								<input
									name="name"
									autoComplete="off"
									className="form-control"
									ref={register({ required: { message: 'Este campo es requerido', value: true } })}
								/>
								{errors.name && <span className="text-danger mb-2">{errors.name.message}</span>}

								<br />
{/* description */}
								<label htmlFor="description" className="grey-text font-weight-light">
									Descripcion del Evento:
								</label>
								<textarea
									className="form-control"
									rows="10"
									name="description"
									autoComplete="off"
									ref={register({
										required: { message: 'Este campo es requerido', value: false }
									})}
								/>
								{errors.description && <span className="text-danger mb-2">{errors.description.message}</span>}

								<br />
								<MDBRow center={true}>
									<MDBCol md="5">
{/* date */}
										<label htmlFor="date" className="grey-text font-weight-light">
											Fecha del Evento:
										</label>
										<br/>
										<TextField
											id="date"
											type="datetime-local"
											defaultValue="2020-01-01T01:00"
											className="form-control"
											onChange={(e) => {setDate(e.target.value)}}
											InputLabelProps={{
												shrink: true,
											}}
										/>
									
										{errors.date && <span className="text-danger mb-2">{errors.date.message}</span>}
									</MDBCol>
									<MDBCol md="5">

{/* duration */}
										<label htmlFor="duration" className="grey-text font-weight-light">
											Duracion del Evento en horas:
										</label>
										<input
											name="duration"
											autoComplete="off"
											className="form-control"
											ref={register({ 
												required: { message: 'Este campo es requerido', value: true },
												pattern: { value: /^[0-9]+$/i, message: 'Este campo solo acepta números' }
											 })}
										/>
										{errors.duration && <span className="text-danger mb-2">{errors.duration.message}</span>}
										
									</MDBCol>
								</MDBRow>
								<br/>
{/* category */}
								<label htmlFor="eventCategoryId" className="grey-text font-weight-light">
									Tipo de Evento:
								</label>
								<select name="eventCategoryId" className="browser-default custom-select"
									ref={register({
										required: { message: 'Este campo es requerido', value: true }
									})}>
									<option value="0">Seleccione una opcion</option>
									{categories}
								</select>
								{errors.categoryid && <span className="text-danger mb-2">{errors.categoryid.message}</span>}

								<br />
								<p className="h4 text-center py-4">Contacto y Lugar del Evento</p>

								<label htmlFor="eventContactId" className="grey-text font-weight-light">
									Contacto:
								</label>
								<select name="eventContactId" className="browser-default custom-select"
									ref={register({
										required: { message: 'Este campo es requerido', value: true }
									})}>
									<option value="0">Seleccione una opcion</option>
									{contacts}
								</select>
								{errors.eventContactId && <span className="text-danger mb-2">{errors.eventContactId.message}</span>}

								<br />
								<label htmlFor="eventLocationId" className="grey-text font-weight-light">
									Lugar de Evento:
								</label>
								<Autocomplete
									id="eventLocationId"
									options={event.locations}
									getOptionLabel={option => option.name}
									onChange={(event, newValue) => {setEventLocationId(newValue != null ? newValue.id : "")}}
									renderInput={params => (
										<TextField {...params} label="Lugar de Evento" variant="outlined" required fullWidth/>
									)}
								/>
								{errors.eventLocationId && <span className="text-danger mb-2">{errors.eventLocationId.message}</span>}

								<div className="text-center py-4 mt-3">
									<MDBBtn
										className="btn btn-outline-blue"
										type="submit"
										disabled={formState.isSubmitting}
									>
										Agregar
									</MDBBtn>
								</div>
							</form>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default NewEvent;