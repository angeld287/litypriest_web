import useForm from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { createContact } from '../../../graphql/mutations';
import Swal from 'sweetalert2';

const useNewContact = () => {
	const { register, handleSubmit, errors, formState } = useForm();
	let history = useHistory();

	const onSubmit = async (input) => {
		try {
			await API.graphql(graphqlOperation(createContact, { input }));
			await Swal.fire('Correcto', 'El usuario se ha creado correctamente', 'success');
			history.push('/contacts');
		} catch (error) {
			Swal.fire('Ha ocurrido un error', 'Intentelo de nuevo mas tarde', 'error');
		}
	};

	return { onSubmit, register, handleSubmit, errors, formState };
};

export default useNewContact;
