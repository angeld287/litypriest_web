import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listEvents } from './../../graphql/custom-queries';
import Swal from 'sweetalert2';
import { deleteEvent } from '../../graphql/mutations';

import {Excel} from '../Functions/ExportExcel';

const moment = require('moment');

const useEvents = () => {
    const [ events, setEvents ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ dateFrom, setDateFrom ] = useState(new Date());
    const [ dateTo, setDateTo ] = useState(new Date());

    useEffect(() => {
        let didCancel = false;

        const fetchEvents = async () => {
            var eventsApi = [];

            try {
                eventsApi = await API.graphql(graphqlOperation(listEvents));
            } catch (error) {
                setLoading(false);
                setError(true);
            }

            if (!didCancel) {
                setEvents(eventsApi.data.listEvents.items);
                setLoading(false);
            }
        };

        fetchEvents();

        return () => {
            didCancel = true;
        };
    }, []);


    const handleDeleteEvent = async (id) => {
        const result = await Swal.fire({
            title: '¿Desea eliminar el evento?',
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
                await API.graphql(graphqlOperation(deleteEvent, { input }));
                Swal.fire('Eliminado correctamente!', '', 'success');
                setEvents(events.filter((event) => event.id !== id));
            } catch (error) {
                Swal.fire('Error', 'Intentelo nuevamente', 'error');
            }
        }
    };


    const handleExportExcel = async () => {
            setLoading(true);
            const name = 'Eventos_'+String(moment(dateFrom).format('YYYY-MM-DD'))+'_'+String(moment(dateTo).format('YYYY-MM-DD'));
			const _dateFrom = String(moment(dateFrom).format('YYYY-MM-DDTHH:mm:ss.SSS'));
			const _dateTo = String(moment(dateTo).format('YYYY-MM-DDTHH:mm:ss.SSS'));
            var eventsApi = [];
            var eventsFormat = [];

            try {
                eventsApi = await API.graphql(graphqlOperation(listEvents,{
                    filter:{
                        and:[
                        	{or: [{date: {gt: _dateFrom}}, {date: {eq: _dateFrom}},]},
                            {or: [{date: {lt: _dateTo}}, {date: {eq: _dateTo}},]}
							]
                        }
                    })
                );
				
                eventsApi.data.listEvents.items.forEach(e => {
                    const eventRow = {
                        título: e.name,
                        fecha: String(moment(e.date).format('YYYY-MM-DD')),
                        hora: String(moment(e.date).format('THH:mm:ss.SSS')),
                        tipo: e.category.name,
                        parroquia: e.location.name,
                        contacto: e.contacts.items[0].contact.name,
                        telefono: e.contacts.items[0].contact.phone,
                    }
					eventsFormat.push(eventRow)
                });

				Excel(name, eventsFormat);

                setLoading(false);

            } catch (error) {
                setLoading(false);
                setError(true);
            }
    };

    return { events, error, loading, handleDeleteEvent, setDateFrom, setDateTo, handleExportExcel };
};

export default useEvents;

