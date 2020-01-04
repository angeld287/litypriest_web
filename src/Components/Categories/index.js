import React, { Fragment } from 'react';
import useCategories from './useCategories';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBBox, MDBDataTable, MDBBtn } from 'mdbreact';
import Spinner from '../Spinner/Spinner';

import './index.css';

const Categories = () => {
	const { loading, error, categories, handleDeleteCategory } = useCategories();

	const data = () => {
		var formatedCategories = [];
		categories.forEach((category) => {
			formatedCategories.push({
				name: category.name,
				description: category.description,
				module: category.module === null ? "N/A" : category.module,
				options: (
					<Fragment>
						<Link to={`categories/${category.id}/edit`} className="btn btn-success btn-sm">
							Editar
						</Link>
						<MDBBtn color="red" size="sm" onClick={() => handleDeleteCategory(category.id)}>
							Borrar
						</MDBBtn>
					</Fragment>
				)
			});
		});

		return {
			columns: [
				{
					label: 'Nombre',
					field: 'name',
					sort: 'asc'
				},
				{
					label: 'Descripcion',
					field: 'description',
					sort: 'asc'
				},
				{
					label: 'Modulo',
					field: 'module',
					sort: 'asc'
				},
				{
					label: 'Opciones',
					field: 'options',
					sort: 'disabled'
				}
			],
			rows: formatedCategories
		};
	}

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
			<h3 className="mt-5">categorias</h3>
			<Link to={`categories/new`} className="btn btn-primary btn-sm">
				Nueva Categoria
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
				noRecordsFoundLabel="No se han encontrado categorias"
				entriesLabel="Numero de datos"
				entriesOptions={[ 5, 10 ]}
				infoLabel={[ 'Mostrando del', 'al', 'de', 'registros' ]}
				paginationLabel={[ 'Anterior', 'Siguiente' ]}
				noBottomColumns={true}
			/>
		</MDBContainer>
	);
};

export default Categories;
