import { useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { getLocation } from '../../../graphql/queries';
import { updateLocation } from '../../../graphql/mutations';
import Swal from 'sweetalert2';

const useEditLocation = () => {
	let history = useHistory();
	let { id } = useParams();
	const [ location, setLocation ] = useState({});
	const [ error, setError ] = useState(false);
	const { register, handleSubmit, errors } = useForm();

	useEffect(
		() => {
			let didCancel = false;
			const fetchLocation = async () => {
				let locationApi = {};

				try {
					locationApi = await API.graphql(graphqlOperation(getLocation, { id }));
				} catch (e) {
					setError(true);
				}

				if (!didCancel) {
					setLocation(locationApi.data.getLocation);
				}

				return () => {
					didCancel = true;
				};
			};

			fetchLocation();
		},
		[ id ]
	);

	const onSubmit = async (input) => {
		input.id = id;
		try {
			await API.graphql(graphqlOperation(updateLocation, { input }));
			await Swal.fire('Correcto', 'La ubicacion se ha actualizado correctamente', 'success');
			history.push('/locations');
		} catch (e) {
			Swal.fire('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
		}
	};

	return { onSubmit, location, register, handleSubmit, errors, error };
};

export default useEditLocation;
