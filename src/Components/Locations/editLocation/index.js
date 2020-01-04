import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import Spinner from '../../Spinner/Spinner';
import useEditLocation from './useEditLocation';

import PlacesAutocomplete from 'react-places-autocomplete';

import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const EditLocation = () => {
	const { onSubmit, location, register, handleSubmit, errors, error, setLocationName, locationName, setCategory, category, setContact, contact } = useEditLocation();

	if (Object.entries(location).length === 0 && location.constructor === Object) return <Spinner />;

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

	let categories = location.categories.map((category, i) => {
      return (<option key={i} value={category.id}>{category.name}</option>)
    });

	const contacts = location.contacts;

	const contactIndex = contacts != null ? contacts.findIndex(x => x.id === contacts.id) : -1;
	



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
								<PlacesAutocomplete
									value={locationName}
									required
									name="name" 
									onChange={ location => setLocationName(location)}
									onSelect={ location => setLocationName(location)}
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

								<br />
								<label htmlFor="name" className="grey-text font-weight-light">
									Tipo de Ubicacion:
								</label>
								<div>
									<select id="category" value={category} required className="browser-default custom-select"
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
									options={contacts}
									getOptionLabel={option => option.name}
									onChange={(event, newValue) => {setContact(newValue)}}
									renderInput={params => (
										<TextField {...params} label="Contacto" variant="standard" fullWidth/>
									)}
									defaultValue={contacts[contactIndex]}
								/>

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
