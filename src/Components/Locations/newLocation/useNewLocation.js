import { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { createLocation, createEventContacts } from '../../../graphql/mutations';
import Swal from 'sweetalert2';
import { listCategorys, listContacts } from '../../../graphql/queries';
import { uniq } from '../../Functions';

var _ = require('lodash');

const useNewLocation = () => {
	const { register, handleSubmit, errors, formState } = useForm();
	const [ error, setError ] = useState(false);
	const [ locationData, setLocationData ] = useState({});
	const [ category, setCategory ] = useState("");
	const [ location, setLocation ] = useState("");
	const [ newContacts, setNewContacts ] = useState({});
	
	let history = useHistory();

	useEffect(
		() => {
			let didCancel = false;
			const fetchEvent = async () => {
				let api = {};

				try {
					const categories = await API.graphql(graphqlOperation(listCategorys));
					const contacts = await API.graphql(graphqlOperation(listContacts));
					api = {
						categories: categories.data.listCategorys.items,
						contacts: contacts.data.listContacts.items,
					};
					
				} catch (e) {
					setError(true);
					
				}

				if (!didCancel) {
					setLocationData(api);
				}

				return () => {
					didCancel = true;
				};
			};
			fetchEvent();
		}
	);

	const onSubmit = async (input) => {
		try {

			if(location == ""){
				Swal.fire('Campo Obligatorio', 'Favor completar el campo Ubicacion', 'error');
				return;
			}

			if(category == ""){
				Swal.fire('Campo Obligatorio', 'Favor completar el campo Tipo de Ubicacion', 'error');
				return;
			}

			if(newContacts.id == undefined){
				Swal.fire('Campo Obligatorio', 'Favor completar el campo Contacto', 'error');
				return;
			}

			const input = { name: location, locationCategoryId: category, locationContactId: newContacts.id};
			
			await API.graphql(graphqlOperation(createLocation, { input : input }));
			
			await Swal.fire('Correcto', 'La ubicacion se ha creado correctamente', 'success');
			history.push('/locations');
		} catch (error) {
			Swal.fire('Ha ocurrido un error', 'Intentelo de nuevo mas tarde', 'error');
		}
	};

	return { onSubmit, register, handleSubmit, errors, error, formState, setLocation, location, setCategory, locationData, setNewContacts };
};

export default useNewLocation;
