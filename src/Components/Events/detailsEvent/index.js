import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBJumbotron, MDBCardImage, MDBCardTitle, MDBCardText, MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import Spinner from '../../Spinner/Spinner';
import useDetailsEvent from './useDetailsEvent';

import Geocode from "react-geocode";
import { GoogleMap, Marker } from "react-google-maps"


const DetailsEvent = () => {
	const { event, register, handleSubmit, errors, error, setValue } = useDetailsEvent();
	
	if (Object.entries(event).length === 0 && event.constructor === Object) return <Spinner />;

	if (error) {
		return (
			<MDBContainer>
				<h3>Ha ocurrido un error</h3>
			</MDBContainer>
		);
	}

	Geocode.setApiKey("AIzaSyCyw0xtlbcJiaRUDB3bNWbkcW2IJWprrbc");
	Geocode.setLanguage("en");
	Geocode.setRegion("es");
	Geocode.enableDebug();

	const categoryname = (event.category === null)?("No hay categoria seleccionada"):(event.category.name);
	const contactname = (event.contacts.items[0] === undefined)?("No hay contacto seleccionado"):(event.contacts.items[0].contact.name);
	const contactphone = (event.contacts.items[0] === undefined)?("No hay contacto seleccionado"):(event.contacts.items[0].contact.phone);
	const locationname = (event.location.items[0] === undefined)?("No hay mapa seleccionado"):(event.location.items[0].location.name);

	const data = String(locationname);
    const locationUrl = data.split(' ').join('%20');
    const mapUrl = "https://maps.google.com/maps?q="+locationUrl+"&t=&z=18&ie=UTF8&iwloc=&output=embed";

	return (
		<MDBContainer>
			<br/>
			<br/>
			<MDBRow>
				<MDBCol>
				<MDBJumbotron className="p-0">
					<div
						id="map-container"
						className="rounded z-depth-1-half map-container"
						style={{ height: "600px" }}
						>
						{/* <FancyComponent childProps={this.props.childProps}/> */}
						<iframe
							src={mapUrl}
							title="This is a unique title"
							width="100%"
							height="100%"
							frameBorder="0"
							style={{ border: 2 }}
						/>
					</div>
					<MDBCardBody>
						<MDBCardTitle className="h3">{event.date} | {event.name}</MDBCardTitle>
						<MDBCardText>
							{event.description}
						</MDBCardText>
						<br/>
						<p className="h4 text-center py-4">Contacto</p>
						<MDBTable>
							<MDBTableHead>
								<tr>
									<th>Nombre</th>
									<th>Telefono</th>
								</tr>
							</MDBTableHead>
							<MDBTableBody>
								<tr>
									<td>{contactname}</td>
									<td>{contactphone}</td>
								</tr>
							</MDBTableBody>
							</MDBTable>
					</MDBCardBody>
				</MDBJumbotron>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default DetailsEvent;
