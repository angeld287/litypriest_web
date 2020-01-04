import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import Spinner from '../../Spinner/Spinner';
import useEditCategory from './useEditCategory';

const EditCategory = () => {
	const { onSubmit, category, register, handleSubmit, errors, error, setModule, _module } = useEditCategory();

	if (Object.entries(category).length === 0 && category.constructor === Object) return <Spinner />;

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
								<p className="h4 text-center py-4">Editar Categoria</p>

								<label htmlFor="name" className="grey-text font-weight-light">
									Nombre de la Categoria:
								</label>
								<input
									name="name"
									autoComplete="off"
									defaultValue={category.name}
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
									defaultValue={category.description}
									ref={register({ required: { message: 'Este campo es requerido', value: true } })}
								/>
								{errors.description && <span className="text-danger mb-2">{errors.description.message}</span>}

								<br />
								<label htmlFor="name" className="grey-text font-weight-light">
									Modulo:
								</label>
								<div>
									<select id="module" value={_module} required className="browser-default custom-select" onChange={ c => setModule(c.target.value)}>
										<option value="0">Seleccione una opcion</option>
										<option value="location">Ubicacion</option>
										<option value="event">Evento</option>
									</select>
								</div>
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

export default EditCategory;
