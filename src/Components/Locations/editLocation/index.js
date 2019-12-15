import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import Spinner from '../../Spinner/Spinner';
import useEditLocation from './useEditLocation';

const EditLocation = () => {
	const { onSubmit, location, register, handleSubmit, errors, error } = useEditLocation();

	if (Object.entries(location).length === 0 && location.constructor === Object) return <Spinner />;

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
								<p className="h4 text-center py-4">Editar Ubicacion</p>

								<label htmlFor="name" className="grey-text font-weight-light">
									Nombre de la Ubicacion:
								</label>
								<input
									name="name"
									autoComplete="off"
									defaultValue={location.name}
									className="form-control"
									ref={register({ required: { message: 'Este campo es requerido', value: true } })}
								/>
								{errors.name && <span className="text-danger mb-2">{errors.name.message}</span>}

								<br />

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

export default EditLocation;
