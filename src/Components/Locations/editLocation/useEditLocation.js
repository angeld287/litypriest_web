import { useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { getLocation, listCategorys, listContacts } from '../../../graphql/queries';
import { updateLocation } from '../../../graphql/mutations';
import Swal from 'sweetalert2';

const useEditLocation = () => {
	let history = useHistory();
	let { id } = useParams();
	const [ location, setLocation ] = useState({});
	const [ locationName, setLocationName ] = useState("");
	const [ category, setCategory ] = useState("");
	const [ contact, setContact ] = useState({});
	const [ error, setError ] = useState(false);
	const { register, handleSubmit, errors } = useForm();

	useEffect(
		() => {
			let didCancel = false;
			const fetchLocation = async () => {
				let locationApi = {};

				try {
					const location = await API.graphql(graphqlOperation(getLocation, { id }));
					const categories = await API.graphql(graphqlOperation(listCategorys, {limit: 400}));
					const contacts = await API.graphql(graphqlOperation(listContacts, {limit: 400}));

					locationApi = {
						location: location.data.getLocation,
						categories: categories.data.listCategorys.items.filter(x => x.module === "location"),
						contacts: contacts.data.listContacts.items
					}
				} catch (e) {
					setError(true);
				}

				if (!didCancel) {
					setLocation(locationApi);
					setCategory(locationApi.location.category === null ? "0" : locationApi.location.category.id)
					setContact(locationApi.location.contact === null ? null : locationApi.location.contact)
					setLocationName(locationApi.location.name);
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
		try {

			if(locationName == ""){
				Swal.fire('Campo Obligatorio', 'Favor completar el campo Ubicacion', 'error');
				return;
			}

			if(category == ""){
				Swal.fire('Campo Obligatorio', 'Favor completar el campo Tipo de Ubicacion', 'error');
				return;
			}

			if(contact.id == undefined){
				Swal.fire('Campo Obligatorio', 'Favor completar el campo Contacto', 'error');
				return;
			}


			const input = { id: id, name: locationName, locationCategoryId: category, locationContactId: contact.id};

			await API.graphql(graphqlOperation(updateLocation, { input }));
			await Swal.fire('Correcto', 'La ubicacion se ha actualizado correctamente', 'success');
			history.push('/locations');
		} catch (e) {
			Swal.fire('Ha ocurrido un error', 'Intentelo nuevamente', 'error');
		}
	};

	return { onSubmit, location, register, handleSubmit, errors, error, setLocationName, locationName, setCategory, category, setContact, contact };
};

export default useEditLocation;