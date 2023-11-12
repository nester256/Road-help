import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import blue_c from './icons/blue_c.png';
import green_c from './icons/green_c.png';
import red_c from './icons/red_c.png';
import L from "leaflet";

export default function Events() {
    const events = JSON.parse(localStorage.getItem('events')) || {};
    const clearEvents = () => {
        localStorage.removeItem('events');
        window.location.reload();
    };

    const getMarkerIcon = (severity) => {
        switch (severity) {
            case 'color-red':
                return new L.Icon({
                    iconUrl: red_c,
                    iconSize: [50, 50],
                    iconAnchor: [25, 50],
                    popupAnchor: [0, -50],
                });
            case 'color-green':
                return new L.Icon({
                    iconUrl: green_c,
                    iconSize: [50, 50],
                    iconAnchor: [25, 50],
                    popupAnchor: [0, -50],
                });
            case 'color-blue':
                return new L.Icon({
                    iconUrl: blue_c,
                    iconSize: [50, 50],
                    iconAnchor: [25, 50],
                    popupAnchor: [0, -50],
                });
            default:
                return null;
        }
    };

    return (
        <div>
            <div>
                <MapContainer center={[43.4040000, 39.9540000]} zoom={13} style={{ width: '100%', height: '400px' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />

                    {Object.keys(events).map((eventId) => {
                        const event = events[eventId];

                        if (event) {
                            const eventMarkers = Object.keys(event).map((markerId) => {
                                const eventData = event[markerId];

                                if (eventData && eventData.markerPosition && eventData.formData && eventData.formData.severity) {
                                    const { markerPosition, formData } = eventData;
                                    const { severity } = formData;

                                    const markerIcon = getMarkerIcon(severity);

                                    return (
                                        <Marker key={`${eventId}-${markerId}`} position={[markerPosition.lat, markerPosition.lng]} icon={markerIcon}>
                                            <Popup>
                                                Событие {eventId}, Маркер {markerId}
                                                <br />
                                                Серьезность: {severity}
                                            </Popup>
                                        </Marker>
                                    );
                                } else {
                                    console.log('Ошибка вывода маркера');
                                    return null;
                                }
                            });

                            return eventMarkers;
                        } else {
                            console.log('Ошибка вывода события');
                            return null;
                        }
                    })}
                </MapContainer>
            </div>
            <h2>Список всех событий</h2>
            <button onClick={clearEvents}>Очистить события</button>
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