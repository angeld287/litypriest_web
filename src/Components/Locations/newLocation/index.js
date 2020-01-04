import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import useNewLocation from './useNewLocation';
import Spinner from '../../Spinner/Spinner';

import PlacesAutocomplete from 'react-places-autocomplete';

import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const NewLocation = () => {
	const { onSubmit, register, handleSubmit, errors, formState, location, setLocation, setCategory, locationData, error, setNewContacts } = useNewLocation();
	
	if (Object.entries(locationData).length === 0 && locationData.constructor === Object) return <Spinner />;

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
 
	let categories = locationData.categories.map((category, i) => {
      return (<option key={i} value={category.id}>{category.name}</option>)
    });

	let contacts = locationData.contacts.map((contact, i) => {
      return (<option key={i} value={contact.id}>{contact.name}</option>)
    });
	

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
									required
									name="name" 
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
								<label htmlFor="name" className="grey-text font-weight-light">
									Tipo de Ubicacion:
								</label>
								<div>
									<select id="category" required className="browser-default custom-select"
									onChange={ c => setCategory(c.target.value)}>
									<option value="0">Seleccione una opcion</option>
									{categories}
									</select>
								</div>
								<br />

								<label htmlFor="contact" className="grey-text font-weight-light">
									Contacto:
								</label>

								<Autocomplete
									id="eventLocationId"
									required
									options={locationData.contacts}
									getOptionLabel={option => option.name}
									onChange={(event, newValue) => {setNewContacts(newValue)}}
									renderInput={params => (
										<TextField {...params} label="Contacto" variant="standard" fullWidth/>
									)}
									//defaultValue={[locationData.contacts[1],locationData.contacts[2]]}
								/>

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
