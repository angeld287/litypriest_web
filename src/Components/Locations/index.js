import React, { Fragment } from 'react';
import useLocations from './useLocations';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBBox, MDBDataTable, MDBBtn } from 'mdbreact';
import Spinner from '../Spinner/Spinner';

import './index.css';

const Locations = () => {
	const { loading, error, locations, handleDeleteLocation } = useLocations();

	const data = () => {
		var formatedLocations = [];
			locations.forEach((location) => {
				formatedLocations.push({
					name: location.name,
					options: (
						<Fragment>
							<Link to={`locations/${location.id}/edit`} className="btn btn-success btn-sm">
								Editar
							</Link>
							<MDBBtn color="red" size="sm" onClick={() => handleDeleteLocation(location.id)}>
								Borrar
							</MDBBtn>
						</Fragment>
					)
				});
			});

		return{
			columns: [
				{
					label: 'Nombre',
					field: 'name',
					sort: 'asc'
				},
				{
					label: 'Opciones',
					field: 'options',
					sort: 'disabled'
				}
			],
			rows: formatedLocations
		};

	};

	if (loading) {
		return (
			<MDBContainer>
				<MDBBox display="flex" justifyContent="center" className="mt-5">
					<Spinner />
				</MDBBox>
			</MDBContainer>
		);
	}

	if (error) return <h2>Ha ocurrido un error</h2>;

	return (
		<MDBContainer>
			<h3 className="mt-5">Ubicaciones</h3>
			<Link to={`locations/new`} className="btn btn-primary btn-sm">
				Nueva Ubicacion
			</Link>
			<MDBDataTable
				striped
				bordered
				searchLabel="Buscar"
				responsiveSm={true}
				small
				hover
				entries={5}
				btn={true}
				data={data()}
				noRecordsFoundLabel="No se han encontrado ubicaciones"
				entriesLabel="Numero de datos"
				entriesOptions={[ 5, 10 ]}
				infoLabel={[ 'Mostrando del', 'al', 'de', 'registros' ]}
				paginationLabel={[ 'Anterior', 'Siguiente' ]}
				noBottomColumns={true}
			/>
		</MDBContainer>
	);
};

export default Locations;
