import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import Spinner from '../../Spinner/Spinner';
import useEditContact from './useEditContact';

const EditContact = () => {
	const { onSubmit, contact, register, handleSubmit, errors, error } = useEditContact();

	if (Object.entries(contact).length === 0 && contact.constructor === Object) return <Spinner />;

	if (error) {
		return (
			<MDBContainer>
				<h3>Ha ocurrido un error</h3>
			</MDBContainer>
		);
	}

	return (
		<MDBContainer>
			<MDBRow className="mt-5" center={true}>
				<MDBCol md="6">
					<MDBCard>
						<MDBCardBody>
							<form onSubmit={handleSubmit(onSubmit)}>
								<p className="h4 text-center py-4">Nuevo Contacto</p>

								<label htmlFor="name" className="grey-text font-weight-light">
									Nombre del contacto:
								</label>
								<input
									name="name"
									autoComplete="off"
									defaultValue={contact.name}
									className="form-control"
									ref={register({ required: { message: 'Este campo es requerido', value: true } })}
								/>
								{errors.name && <span className="text-danger mb-2">{errors.name.message}</span>}

								<br />

								<label htmlFor="phone" className="grey-text font-weight-light">
									Teléfono del contacto:
								</label>
								<input
									name="phone"
									autoComplete="off"
									className="form-control"
									defaultValue={contact.phone}
									ref={register({
										required: { message: 'Este campo es requerido', value: true },
										pattern: { value: /^[0-9]+$/i, message: 'Este campo solo acepta números' }
									})}
								/>

								{errors.phone && <span className="text-danger mb-2">{errors.phone.message}</span>}

								<div className="text-center py-4 mt-3">
									<MDBBtn className="btn btn-outline-blue" type="submit">
										Guardar
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

export default EditContact;
