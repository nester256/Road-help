import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Form, FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import './needhelp_styles.css';
import u_here from './icons/u_here.png';
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
            <div>
                <Button type="primary" className="align-content-center" onClick={handleGetLocation}>
                    Найти меня!
                </Button>
            </div>

            <Form className="mx-auto col-md-6" onSubmit={handleSubmit}>
                {/* Ввод имени */}
                <Form.Group controlId="exampleForm.ControlName">
                    <Form.Label>Ваше имя</Form.Label>
                    <FormControl type="text" placeholder="Введите ваше имя" name="name" value={formData.name} onChange={handleInputChange} />
                </Form.Group>

                {/* Ввод Номера телефона */}
                <Form.Group controlId="exampleForm.ControlPhone">
                    <Form.Label>Номер телефона</Form.Label>
                    <FormControl type="tel" placeholder="Введите номер телефона" name="phone" value={formData.phone} onChange={handleInputChange} />
                </Form.Group>

                {/* Ввод Транспортного средства */}
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Выберите тип транспорта</Form.Label>
                    <FormControl as="select" className="custom-select" name="transportType" value={formData.transportType} onChange={handleInputChange}>
                        <option>Грузовой транспорт</option>
                        <option>Легковой транспорт</option>
                        <option>Мото транспорт</option>
                    </FormControl>
                </Form.Group>

                {/* Ввод серьёзности ситуации */}
                <Form.Group controlId="exampleForm.ControlRadio">
                    <Form.Label>Выберите серьёзность ситуации</Form.Label>
                    <div>
                        {/* Ваши стили для radio-circle */}
                        <Form.Check
                            type="radio"
                            inline
                            label={<div className="radio-circle radio-blue"></div>}
                            name="severity"
                            id="color-blue"
                            value="color-blue"
                            checked={formData.severity === 'color-blue'}
                            onChange={handleInputChange}
                        />
                        <Form.Check
                            type="radio"
                            inline
                            label={<div className="radio-circle radio-green"></div>}
                            name="severity"
                            id="color-green"
                            value="color-green"
                            checked={formData.severity === 'color-green'}
                            onChange={handleInputChange}
                        />
                        <Form.Check
                            type="radio"
                            inline
                            label={<div className="radio-circle radio-red"></div>}
                            name="severity"
                            id="color-red"
                            value="color-red"
                            checked={formData.severity === 'color-red'}
                            onChange={handleInputChange}
                        />
                    </div>
                </Form.Group>

                {/* Ввод Описания */}
                <Form.Group controlId="exampleForm.ControlDescription">
                    <Form.Label>Описание</Form.Label>
                    <FormControl
                        as="textarea"
                        rows={3}
                        placeholder="Введите описание к заявке, уточните конкретне местоположение, укажите цвет и номер тс, напишите какая помощь вам необходима"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Отправить
                </Button>
            </Form>
        </>
    );
}
