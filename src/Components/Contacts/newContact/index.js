import React from 'react';
import useForm from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { createContact } from '../../../graphql/mutations';
import Swal from 'sweetalert2';

import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';

const NewContact = () => {
	const { register, handleSubmit, watch, errors } = useForm();
	let history = useHistory();

	const onSubmit = async (input) => {
		try {
			await API.graphql(graphqlOperation(createContact, { input }));
			await Swal.fire('Correcto', 'El usuario se ha creado correctamente', 'success');
			history.push('/contacts');
		} catch (error) {
			Swal.fire('Ha ocurrido un error', 'Intentelo de nuevo mas tarde', 'error');
		}
	};

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
									className="form-control"
									ref={register({ required: true })}
								/>
								{errors.name && <span className="text-danger mb-2">Este campo es requerido</span>}

								<br />

								<label htmlFor="phone" className="grey-text font-weight-light">
									Teléfono del contacto:
								</label>
								<input
									name="phone"
									autoComplete="off"
									className="form-control"
									ref={register({ required: true })}
								/>
								{errors.phone && <span className="text-danger mb-2">Este campo es requerido</span>}

								<div className="text-center py-4 mt-3">
									<MDBBtn className="btn btn-outline-blue" type="submit">
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

export default NewContact;
