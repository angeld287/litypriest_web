import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import useNewCategory from './useNewCategory';

const NewCategory = () => {
	const { onSubmit, register, handleSubmit, errors, formState, setModule } = useNewCategory();

	return (
		<MDBContainer>
			<MDBRow className="mt-5" center={true}>
				<MDBCol md="6">
					<MDBCard>
						<MDBCardBody>
							<form onSubmit={handleSubmit(onSubmit)}>
								<p className="h4 text-center py-4">Nueva Categoria</p>

								<label htmlFor="name" className="grey-text font-weight-light">
									Nombre de la Categoria:
								</label>
								<input
									name="name"
									autoComplete="off"
									className="form-control"
									ref={register({ required: { message: 'Este campo es requerido', value: true } })}
								/>
								{errors.name && <span className="text-danger mb-2">{errors.name.message}</span>}

								<br />

								<label htmlFor="description" className="grey-text font-weight-light">
									Descripcion de la Categoria:
								</label>
								<input
									name="description"
									autoComplete="off"
									className="form-control"
									ref={register({ required: { message: 'Este campo es requerido', value: true } })}
								/>
								{errors.description && <span className="text-danger mb-2">{errors.description.message}</span>}

								<br />
								<label htmlFor="name" className="grey-text font-weight-light">
									Modulo:
								</label>
								<div>
									<select id="module" required className="browser-default custom-select" onChange={ c => setModule(c.target.value)}>
										<option value="">Seleccione una opcion</option>
										<option value="location">Ubicacion</option>
										<option value="event">Evento</option>
									</select>
								</div>
								<br />

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

export default NewCategory;
