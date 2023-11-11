import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Form, FormControl } from 'react-bootstrap';
import 'leaflet/dist/leaflet.css';
import { Button } from "react-bootstrap";

function EventMapListner({ onLocationFound }) {
    const map = useMapEvents({
        click: (location) => {
            document.getElementById('test').innerHTML = "Координаты: " + location.latlng.lat + ", " + location.latlng.lng;
        },
    });
    return null;
}

export default function NeedHelp() {
    const [setMarkerPosition] = useState(null);

    const handleLocationFound = (latlng) => {
        setMarkerPosition(latlng);
    };

    return (
        <div>
            <div>
                <MapContainer center={[43.4040000, 39.9540000]} zoom={13} style={{ width: '100%', height: '400px' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                    <Marker position={[43.4040000, 39.9540000]}>
                        <Popup>
                            Координаты: 43.4040000, 39.9540000
                        </Popup>
                    </Marker>
                    <EventMapListner onLocationFound={handleLocationFound} />
                </MapContainer>
            </div>
            <div>
                <h1 id='test'>Координаты: </h1>
            </div>
            <div>
                <Button type='primary' className='align-content-center'> Я тут </Button>
            </div>
            <Form className="mx-auto col-md-6">
                <Form.Group controlId="exampleForm.ControlName">
                    <Form.Label>Ваше имя</Form.Label>
                    <FormControl type="text" placeholder="Введите ваше имя" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlPhone">
                    <Form.Label>Номер телефона</Form.Label>
                    <FormControl type="tel" placeholder="Введите номер телефона" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Выберите тип транспорта</Form.Label>
                    <FormControl as="select" className="custom-select">
                        <option>Грузовой транспорт</option>
                        <option>Легковой транспорт</option>
                        <option>Мото транспорт</option>
                    </FormControl>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Отправить
                </Button>
            </Form>
        </div>
    );
}
