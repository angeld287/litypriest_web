import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { listCategorys } from './../../graphql/queries';
import { MDBBtn } from 'mdbreact';

const useCategories = () => {
	const [ categories, setCategories ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);

	useEffect(() => {
		const fetchCategories = async () => {
			var categoriesApi = [];

			try {
				categoriesApi = await API.graphql(graphqlOperation(listCategorys));
			} catch (error) {
				setLoading(false);
				setError(true);
			}

			var formatedCategories = [];
			categoriesApi.data.listCategorys.items.forEach((category) => {
				formatedCategories.push({
					name: category.name,
					description: category.description,
					options: (
						<Fragment>
							<Link to={`categories/${category.id}/edit`} className="btn btn-success btn-sm">
								Editar
							</Link>
							<MDBBtn color="red" size="sm">
								Borrar
							</MDBBtn>
						</Fragment>
					)
				});
			});
			setCategories(formatedCategories);
			setLoading(false);
		};

		fetchCategories();
	}, []);

	return { categories, error, loading };
};

export default useCategories;
