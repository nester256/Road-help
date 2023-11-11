import React from 'react';

export default function Events() {
    // Retrieve events from local storage or initialize an empty object
    const events = JSON.parse(localStorage.getItem('events')) || {};

    return (
        <div>
            <h2>Список всех событий</h2>
            <ul>
                {Object.keys(events).map((eventId) => (
                    <li key={eventId}>
                        <strong>Событие {eventId}</strong>
                        <br />
                        <pre>{JSON.stringify(events[eventId], null, 2)}</pre>
                    </li>
                ))}
            </ul>
        </div>
    );
}
