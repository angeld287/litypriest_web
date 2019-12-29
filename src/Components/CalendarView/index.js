import React, { Component } from "react";
import { MDBContainer } from "mdbreact"
import { Link } from 'react-router-dom';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { API, graphqlOperation } from 'aws-amplify';
import { listEvents } from '../../graphql/queries';

import "./EventsCalendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

class EventsCalendar extends Component {
  
  state = {
    events: []
  };

	fetchEvents = async () => {
		try {
			const eventsJson = await API.graphql(graphqlOperation(listEvents));
      const eventsData = eventsJson.data.listEvents.items
      const events = [];

      eventsData.forEach(e => {
        const date = new Date(e.date);
        date.setDate(date.getDate() + 1)
        const event = {
          start: date,
          end: date,
          title: <Link to={`events/${e.id}/details`} className="btn-info btn-sm" style={{height: 30}}>{e.name}...</Link>
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

  /* onEventResize = (type, { event, start, end, allDay }) => {
    this.setState(state => {
      state.events[0].start = start;
      state.events[0].end = end;
      return { events: state.events };
    });
  };

  onEventDrop = ({ event, start, end, allDay }) => {
    console.log(start);
  }; */

  render() {
    return (
      <MDBContainer>
        <div className="App">
          <DnDCalendar
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.events}
            localizer={localizer}
            onEventDrop={this.onEventDrop}
            onEventResize={this.onEventResize}
            resizable
            style={{ height: "100vh" }}
          />
        </div>
      </MDBContainer>
    );
  }
}

export default EventsCalendar;