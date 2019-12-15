import React, { useState, useEffect, Fragment } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listCategorys } from './../../graphql/queries';
import Swal from 'sweetalert2';
import { deleteCategory } from '../../graphql/mutations';

const useCategories = () => {
	const [ categories, setCategories ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);

	useEffect(() => {
		let didCancel = false;

		const fetchCategories = async () => {
			var categoriesApi = [];

			try {
				categoriesApi = await API.graphql(graphqlOperation(listCategorys));
			} catch (error) {
				setLoading(false);
				setError(true);
			}

			if (!didCancel) {
				setCategories(categoriesApi.data.listCategorys.items);
				setLoading(false);
			}
		};

		fetchCategories();

		return () => {
			didCancel = true;
		};
	}, []);

	const handleDeleteCategory = async (id) => {
		const result = await Swal.fire({
			title: '¿Desea eliminar la categoria?',
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
				await API.graphql(graphqlOperation(deleteCategory, { input }));
				Swal.fire('Eliminado correctamente!', '', 'success');
				setCategories(categories.filter((category) => category.id !== id));
			} catch (error) {
				Swal.fire('Error', 'Intentelo nuevamente', 'error');
			}
		}
	};

	return { categories, error, loading, handleDeleteCategory };
};

export default useCategories;
