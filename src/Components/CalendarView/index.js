import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import { API, graphqlOperation } from 'aws-amplify';
import { listEvents } from '../../graphql/queries';
import moment from "moment";
import { Link } from 'react-router-dom';

import { MDBContainer } from "mdbreact"

import './main.scss' // webpack must be configured to do this

const header = {
      left: 'dayGridMonth,timeGridWeek,timeGridDay today',
      center: 'title',
      right: 'custom2 prevYear,prev,next,nextYear'
    };

export default class DemoApp extends React.Component {

  state = {
    events: []
  };

  fetchEvents = async () => {
		try {
			const eventsJson = await API.graphql(graphqlOperation(listEvents, {limit: 400}));
      const eventsData = eventsJson.data.listEvents.items
      const events = [];

      eventsData.forEach(e => {
        const date = new Date(e.date)
        const endDate = new Date(e.date)
        const duration = parseInt(e.duration); 
        endDate.setHours(endDate.getHours() + duration)

        const event = {
          start: moment(date).format("YYYY-MM-DDTHH:mm:SS"),
          end: moment(endDate).format("YYYY-MM-DDTHH:mm:SS"),
          title: e.name,
          url: `events/${e.id}/details`
        }
        events.push(event);
      });

			this.setState({
				events
			});
      
		} catch (error) {
			console.log(error);
		}
	};

  componentDidMount = async () => {
		this.fetchEvents();
	};

  render() {
    return (
      <MDBContainer style={{marginTop: 100}}>
        <FullCalendar 
          defaultView="dayGridMonth" 
          plugins={[ dayGridPlugin, timeGridPlugin, listPlugin ]} 
          events={this.state.events}
          header={header}
          navLinks={true}
          />
      </MDBContainer>
    )
  }

}