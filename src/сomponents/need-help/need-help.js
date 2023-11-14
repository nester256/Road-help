import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import './needhelp-styles.css';
import u_here from '../../assets/icons/u_here.png';
import L from 'leaflet';

function EventMapListener({ onLocationFound }) {
    const map = useMapEvents({
        click: (location) => {
            onLocationFound(location.latlng);
        },
    });
    return null;
}

export default function NeedHelp() {
    const [markerPosition, setMarkerPosition] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [locationRequested, setLocationRequested] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        transportType: 'Грузовой транспорт',
        severity: 'color-blue',
        description: '',
    });

    const handleGetLocation = () => {
        if (!locationRequested) {
            try {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setUserLocation({ lat: latitude, lng: longitude });
                        setMarkerPosition({ lat: latitude, lng: longitude });
                        setLocationRequested(true);
                    },
                    (error) => {
                        alert('Error getting user location:' + error);
                        setLocationRequested(true);
                    }
                );
            } catch (error) {
                console.error('Geolocation error:', error);
                setLocationRequested(true);
                alert('Для определения местоположения разрешите доступ к геолокации в настройках браузера.');
            }
        }
    };

    const u_here_f = new L.Icon({
        iconUrl: u_here,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });

    const handleLocationFound = (latlng) => {
        setMarkerPosition(latlng);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name) {
            alert('Введите ваше имя!');
            return;
        }
        if (!formData.phone) {
            alert('Введите номер телефона!');
            return;
        }
        if (!markerPosition) {
            alert('Укажите ваше местоположение!');
            return;
        }
        const jsonData = {
            markerPosition,
            formData,
        };
        const existingEvents = JSON.parse(localStorage.getItem('events')) || {};
        const updatedEvents = {
            ...existingEvents,
            events: {
                ...existingEvents.events,
                [Date.now()]: jsonData,
            },
        };
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        setMarkerPosition(null);
        navigate('/events');
        console.log('Updated Events:', updatedEvents);
    };
    return (
        <>
            <div>
                <MapContainer center={userLocation || [43.4040000, 39.9540000]} zoom={13} style={{ width: '100%', height: '400px' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />

                    {markerPosition && (
                        <Marker position={markerPosition} icon={u_here_f}>
                            <Popup>
                                Координаты: {markerPosition.lat}, {markerPosition.lng}
                            </Popup>
                        </Marker>
                    )}

                    <EventMapListener onLocationFound={handleLocationFound} />
                </MapContainer>
            </div>
            <div className="button-container">
                <button type="submit" className="button" onClick={handleGetLocation}>Найти меня!</button>
            </div>

            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-item">
                        <label htmlFor="name">Ваше имя</label>
                        <input className="form-input" type="text" id="name" name="name" placeholder="Введите ваше имя" value={formData.name} onChange={handleInputChange} />
                    </div>

                    <div className="form-item">
                        <label htmlFor="tel">Номер телефона</label>
                        <input className="form-input" type="tel" id="phone" name="phone" placeholder="Введите номер телефона" value={formData.phone} onChange={handleInputChange} />
                    </div>

                    <div className="form-item">
                        <label htmlFor="transportType">Выберите тип транспорта</label>
                        <select className="form-input form-input-select" id="transportType" name="transportType" value={formData.transportType} onChange={handleInputChange}>
                            <option>Грузовой транспорт</option>
                            <option>Легковой транспорт</option>
                            <option>Мото транспорт</option>
                        </select>
                    </div>

                    <div className="form-item">
                        <label>Выберите серьёзность ситуации</label>
                        <div className="radio-item">
                            <input className="radio-circle radio-blue" type="radio" id="color-blue" name="severity" value="color-blue" checked={formData.severity === 'color-blue'} onChange={handleInputChange} />
                            <label>Низкая</label>
                        </div>
                        <div className="radio-item">
                            <input className="radio-circle radio-green" type="radio" id="color-green" name="severity" value="color-green" checked={formData.severity === 'color-green'} onChange={handleInputChange} />
                            <label>Умеренная</label>
                        </div>
                        <div className="radio-item">
                            <input className="radio-circle radio-red" type="radio" id="color-red" name="severity" value="color-red" checked={formData.severity === 'color-red'} onChange={handleInputChange} />
                            <label>Высокая</label>
                        </div>
                    </div>

                    <div className="form-item">
                        <label htmlFor="description">Описание</label>
                        <textarea className="form-input form-input-textarea" id="description" name="description" placeholder="Введите описание к заявке, уточните конкретне местоположение, укажите цвет и номер тс, напишите какая помощь вам необходима" value={formData.description} onChange={handleInputChange} />
                    </div>
                    <button type="submit" className="button">Опубликовать заявку</button>
                </form>
            </div>
        </>
    );
}
