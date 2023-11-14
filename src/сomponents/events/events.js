import React, { useState } from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import blue_c from '../../assets/icons/blue_c.png';
import green_c from '../../assets/icons/green_c.png';
import red_c from '../../assets/icons/red_c.png';
import L from "leaflet";
import './events-styles.css';
import '../need-help/needhelp-styles.css';

export default function Events() {
    const events = JSON.parse(localStorage.getItem('events')) || {};
    const [selectedEvent, setSelectedEvent] = useState(null);
    const clearEvents = () => {
        localStorage.removeItem('events');
        window.location.reload();
    };

    const getMarkerIcon = (severity) => {
        switch (severity) {
            case 'color-red':
                return new L.Icon({
                    iconUrl: red_c,
                    iconSize: [40, 40],
                    iconAnchor: [25, 50],
                    popupAnchor: [0, -50],
                });
            case 'color-green':
                return new L.Icon({
                    iconUrl: green_c,
                    iconSize: [40, 40],
                    iconAnchor: [25, 50],
                    popupAnchor: [0, -50],
                });
            case 'color-blue':
                return new L.Icon({
                    iconUrl: blue_c,
                    iconSize: [40, 40],
                    iconAnchor: [25, 50],
                    popupAnchor: [0, -50],
                });
            default:
                return null;
        }
    };

    const getMarkerText = (severity) => {
        switch (severity) {
            case 'color-red':
                return 'Высокая'
            case 'color-green':
                return 'Умеренная'
            case 'color-blue':
                return 'Низкая'
            default:
                return null;
        }
    };

    const handleEventClick = (eventId) => {
        setSelectedEvent(eventId);
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
                                    const makerSeverityText = getMarkerText(severity);

                                    return (
                                        <Marker key={`${eventId}-${markerId}`} position={[markerPosition.lat, markerPosition.lng]} icon={markerIcon}>
                                            <Popup>
                                                Маркер <a href={`#${markerId}`} onClick={() => handleEventClick(markerId)}>{markerId}</a>
                                                <br />
                                                Серьезность: { makerSeverityText }
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
            <div className="events-list-container">
                <div className="events-list">
                    <h2>Список всех событий</h2>
                    <p>Нажмите на точку на карте и перейдите к событию</p>

                    {Object.keys(events).map((eventId) => {
                        const event = events[eventId];

                        if (event) {
                            return Object.keys(event).map((markerId) => {
                                const eventData = event[markerId];
                                if (eventData && eventData.markerPosition && eventData.formData && eventData.formData.severity) {
                                    const { markerPosition, formData } = eventData;
                                    const { severity, name, phone, transportType, description } = formData;
                                    const makerSeverityText = getMarkerText(severity);

                                    return (
                                        <div key={`${eventId}-${markerId}`} className={selectedEvent === markerId ? 'event selected-event' : 'event'}>
                                            <p className="event-text">Серьезность: {makerSeverityText}</p>
                                            <p className="event-text">Имя: {name}, тел.: {phone}</p>
                                            <p className="event-text">{transportType}</p>
                                            <p className="event-text">Описание: {description}</p>
                                            <p className="event-text">Координаты: {markerPosition.lat}, {markerPosition.lng}</p>
                                        </div>
                                    );
                                } else {
                                    console.log('Ошибка вывода текста события');
                                    return null;
                                }
                            });
                        } else {
                            console.log('Ошибка вывода события');
                            return null;
                        }
                    })}
                    <button type="submit" className="button" onClick={clearEvents}>Очистить события</button>
                </div>
            </div>
        </div>
    );
}