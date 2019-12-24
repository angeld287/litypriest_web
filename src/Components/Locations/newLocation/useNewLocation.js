import { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { createLocation } from '../../../graphql/mutations';
import Swal from 'sweetalert2';

const useNewLocation = () => {
	const { register, handleSubmit, errors, formState } = useForm();
	const [ location, setLocation ] = useState("");
	let history = useHistory();

	const onSubmit = async (input) => {
		try {
			await API.graphql(graphqlOperation(createLocation, { input : { name: location} }));
			await Swal.fire('Correcto', 'La ubicacion se ha creado correctamente', 'success');
			history.push('/locations');
		} catch (error) {
			Swal.fire('Ha ocurrido un error', 'Intentelo de nuevo mas tarde', 'error');
		}
	};

	return { onSubmit, register, handleSubmit, errors, formState, setLocation, location };
};

export default useNewLocation;
