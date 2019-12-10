import React, { useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { createContact, updateContact } from '../../../graphql/mutations';
import Swal from 'sweetalert2';

import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import { getContact } from '../../../graphql/queries';
import Spinner from '../../Spinner/Spinner';

const EditContact = () => {
	let history = useHistory();
	let { id } = useParams();
	const [ contact, setContact ] = useState({});
	const { register, handleSubmit, watch, errors } = useForm();

	useEffect(() => {
		const fetchContact = async () => {
			const contactApi = await API.graphql(graphqlOperation(getContact, { id }));
			setContact(contactApi.data.getContact);
		};

		fetchContact();
	}, []);

	const onSubmit = async (input) => {
		input.id = id;
		try {
			await API.graphql(graphqlOperation(updateContact, { input }));
			await Swal.fire('Correcto', 'El usuario se ha actualizado correctamente', 'success');
			history.push('/contacts');
		} catch (error) {
			Swal.fire('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
		}
	};

	if (Object.entries(contact).length === 0 && contact.constructor === Object) return <Spinner />;

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
									defaultValue={contact.phone}
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

export default EditContact;
