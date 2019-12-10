import React from 'react';
import useCategories from './useCategories';
import { MDBContainer, MDBBox, MDBDataTable } from 'mdbreact';
import Spinner from '../Spinner/Spinner';

import './index.css';

const Categories = () => {
	const { loading, error, categories } = useCategories();

	const data = {
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
				label: 'Opciones',
				field: 'options',
				sort: 'disabled'
			}
		],
		rows: categories
	};

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
			<MDBDataTable
				striped
				bordered
				searchLabel="Buscar"
				responsiveSm={true}
				small
				hover
				entries={5}
				btn={true}
				data={data}
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
