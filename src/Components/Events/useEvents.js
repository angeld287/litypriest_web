import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { listEvents } from './../../graphql/queries';
import { MDBBtn } from 'mdbreact';

const useEvents = () => {
	const [ events, setEvents ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);

	useEffect(() => {
		const fetchEvents = async () => {
			var eventsApi = [];

			try {
				eventsApi = await API.graphql(graphqlOperation(listEvents));
			} catch (error) {
				setLoading(false);
				setError(true);
			}

			var formatedEvents = [];
			eventsApi.data.listEvents.items.forEach((event) => {
				formatedEvents.push({
					name: event.name,
					category: event.category.name,
					date: event.date,
					contact: event.contact.name,
					contactPhone: event.contact.phone,
					options: (
						<Fragment>
							<Link to={`events/${event.id}/edit`} className="btn btn-success btn-sm">
								Editar
							</Link>
							<MDBBtn color="red" size="sm">
								Borrar
							</MDBBtn>
						</Fragment>
					)
				});
			});
			setEvents(formatedEvents);
			setLoading(false);
		};

		fetchEvents();
	}, []);

	return { events, error, loading };
};

export default useEvents;
