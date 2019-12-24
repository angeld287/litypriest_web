import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import useNewLocation from './useNewLocation';

import PlacesAutocomplete from 'react-places-autocomplete';

const NewLocation = () => {
	const { onSubmit, register, handleSubmit, errors, formState, location, setLocation } = useNewLocation();
	

	return (
		<MDBContainer>
			<MDBRow className="mt-5" center={true}>
				<MDBCol md="6">
					<MDBCard>
						<MDBCardBody>
							<form onSubmit={handleSubmit(onSubmit)}>
								<p className="h4 text-center py-4">Nueva Ubicacion</p>

								<label htmlFor="name" className="grey-text font-weight-light">
									Nombre de la Ubicacion:
								</label>

								<PlacesAutocomplete
									value={location}
									name="name" 
									ref={register({ required: { message: 'Este campo es requerido', value: true } })}
									onChange={ location => setLocation(location)}
									onSelect={ location => setLocation(location)}
								>
									{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
									<div>
										<MDBInput
										{...getInputProps({
											label: 'Digite el Nombre de la Ubicacion...',
											className: "mt-4",
										})}
										/>
										<div className="autocomplete-dropdown-container">
										{loading && <div>Loading...</div>}
										{suggestions.map(suggestion => {
											const className = suggestion.active
											? 'suggestion-item--active'
											: 'suggestion-item';
											// inline style for demonstration purpose
											const style = suggestion.active
											? { backgroundColor: '#fafafa', cursor: 'pointer' }
											: { backgroundColor: '#ffffff', cursor: 'pointer' };
											return (
											<div {...getSuggestionItemProps(suggestion, {
													className,
													style,
												})}>
												<span>{suggestion.description}</span>
											</div>
											);
										})}
										</div>
									</div>
									)}
								</PlacesAutocomplete>
								{errors.name && <span className="text-danger mb-2">{errors.name.message}</span>}

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

export default NewLocation;
