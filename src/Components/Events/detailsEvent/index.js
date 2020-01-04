import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBJumbotron, MDBCardImage, MDBCardTitle, MDBCardText, 
		MDBTable, MDBTableHead, MDBTableBody, MDBDataTable, MDBIcon } from 'mdbreact';
import Spinner from '../../Spinner/Spinner';
import useDetailsEvent from './useDetailsEvent';

import Geocode from "react-geocode";
import { GoogleMap, Marker } from "react-google-maps"
var moment = require('moment');


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
	//const contactname = (event.contacts.items[0] === undefined)?("No hay contacto seleccionado"):(event.contacts.items[0].contact.name);
	//const contactphone = (event.contacts.items[0] === undefined)?("No hay contacto seleccionado"):(event.contacts.items[0].contact.phone);
	const locationname = (event.location === null)?("No hay mapa seleccionado"):(event.location.name);

	const contacts = event.contacts.items;


	const rows = [];

	contacts.forEach(e => {
		rows.push({
			name: e.contact.name,
			phone: e.contact.phone,
		})
	});

    const dataTable = {
      columns: [
        {label: 'Nombre',field: 'name',sort: 'asc',width: 270},
        {label: 'Telefono',field: 'phone',sort: 'asc',width: 150}
      ],
      rows: rows
    }

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
						<MDBCardTitle className="h3">{event.name}</MDBCardTitle>
						<MDBCardTitle className="h5">{ moment(event.date).format('DD/MM/-YYYY hh:mm') }</MDBCardTitle>
						<MDBCardText>
							{event.description}
						</MDBCardText>
						<br/>
						<MDBRow>
							<MDBCol>
								<p className="h4 text-center py-4">Contactos</p>
								<MDBDataTable
									striped
									bordered
									small
									data={dataTable}
								/>
							</MDBCol>
							<MDBCol>
								<p className="h4 text-center py-4">Datos de Ubicación</p>
								<br/>
								<MDBCard style={{ width: "22rem", width: '80%', margin: 'auto' }}>
									{/* <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves /> */}
									<MDBCardBody>
										<MDBCardTitle>{event.location.category.name}</MDBCardTitle>
										<MDBCardText>
											{event.location.name}
										</MDBCardText>

										<MDBCardText>
											<MDBIcon size="lg" icon="user-alt"/> {event.location.contact.name} 
											<br/>
											<MDBIcon size="lg" icon="phone"/> {event.location.contact.phone}
										</MDBCardText>
									</MDBCardBody>
								</MDBCard>
							</MDBCol>
						</MDBRow>
					</MDBCardBody>
				</MDBJumbotron>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};

export default DetailsEvent;
