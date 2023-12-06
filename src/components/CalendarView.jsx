import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import React, { useState, useEffect } from 'react';

export default function CalendarView() {

    const localizer = momentLocalizer(moment);

    const [data, setData] =useState([]);
    const [events, setEvents] = useState([]);

    let formats = {
        timeGutterFormat: 'HH:mm',
    }
    
    useEffect(() => {
        fetchData();
        //Muutetaan data kalenteriin sopivaan muotoon!
        let tempEvents = [];
        data.forEach((element) => {
            try {
                const data = {
                    title: element.customer.firstname + ', ' + element.customer.lastname + ': ' + element.activity,
                    start: moment(element.date).toDate(),
                    end: moment(element.date).add(element.duration, 'minutes').toDate(),
                };
                tempEvents.push(data);
                setEvents(tempEvents);
            } catch (err) {
                //Jos tietokantaan on luotu virheellinen treeni,
                //se ei kaada sovellusta kalenteria ladatessa,
                //vaan sovellus ohjaa käyttäjän etusivulle.
                window.location.reload();
                throw new Error("Improper data detected! " + err);
            }
        });
    }, [data]);

    const fetchData = () => {
        fetch(import.meta.env.VITE_API_URL + '/gettrainings')
        .then(response =>{
            if (response.ok)
                return response.json();
            else throw new Error("Error in fetching trainings: " + response.statusText);
        })
        .then(data => setData(data))
        .catch(err => console.error(err))
    }

    return(
    <>
    <div>
        <Calendar 
        formats={formats}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{marginTop: 40, height: 500 }}
        />
    </div>
    </>
    );
}