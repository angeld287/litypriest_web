import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listLocations } from './../../graphql/queries';
import Swal from 'sweetalert2';
import { deleteLocation } from '../../graphql/mutations';

const useLocations = () => {
	const [ locations, setLocations ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);

	useEffect(() => {
		let didCancel = false;

		const fetchLocations = async () => {
			var locationsApi = [];

			try {
				locationsApi = await API.graphql(graphqlOperation(listLocations));
			} catch (error) {
				setLoading(false);
				setError(true);
			}

			if (!didCancel) {
				setLocations(locationsApi.data.listLocations.items);
				setLoading(false);
			}
		};

		fetchLocations();

		return () => {
			didCancel = true;
		};
	}, []);

	const handleDeleteLocation = async (id) => {
		const result = await Swal.fire({
			title: '¿Desea eliminar la ubicacion?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Eliminar',
			cancelButtonText: 'Cancelar'
		});

		var input = {
			id
		};

		if (result.value) {
			try {
				await API.graphql(graphqlOperation(deleteLocation, { input }));
				Swal.fire('Eliminado correctamente!', '', 'success');
				setLocations(locations.filter((location) => location.id !== id));
			} catch (error) {
				Swal.fire('Error', 'Intentelo nuevamente', 'error');
			}
		}
	};

	return { locations, error, loading, handleDeleteLocation };
};

export default useLocations;
