import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { listLocations } from './../../graphql/queries';
import { MDBBtn } from 'mdbreact';

const useLocations = () => {
	const [ locations, setLocations ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);

	useEffect(() => {
		const fetchLocations = async () => {
			var locationsApi = [];

			try {
				locationsApi = await API.graphql(graphqlOperation(listLocations));
			} catch (error) {
				setLoading(false);
				setError(true);
			}

			var formatedLocations = [];
			locationsApi.data.listLocations.items.forEach((location) => {
				formatedLocations.push({
					name: location.name,
					options: (
						<Fragment>
							<Link to={`locations/${location.id}/edit`} className="btn btn-success btn-sm">
								Editar
							</Link>
							<MDBBtn color="red" size="sm">
								Borrar
							</MDBBtn>
						</Fragment>
					)
				});
			});
			setLocations(formatedLocations);
			setLoading(false);
		};

		fetchLocations();
	}, []);

	return { locations, error, loading };
};

export default useLocations;
