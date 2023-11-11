import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NeedHelp from "./NeedHelp";
import Page3 from "./page3";
import Events from "./Events";
import {Container, Nav, Navbar} from "react-bootstrap";
import logo from './logo.png'

class Header extends Component {
    render() {
        return (
            <Router>
                <Navbar collapseOnSelect expand='md' bg='dark' variant='dark'>
                    <Container>
                        <Navbar.Brand href='/'>
                            <img
                                src={logo}
                                height='30'
                                width='30'
                                className='d-inline-block align-top'
                                alt='Logo'
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls='response-navbar-nav'/>
                        <Navbar.Collapse id='response-navbar-nav'>
                            <Nav className='mr-auto'>
                                <Nav.Link href='/'> Главная </Nav.Link>
                                <Nav.Link href='/need_help'> Нужна помощь? </Nav.Link>
                                <Nav.Link href='/events'> Карта событий </Nav.Link>
                                <Nav.Link href='/page3'> page3 </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Routes>
                    <Route exact path="/" element={<h1>Home Page</h1>}/>
                    <Route exact path="need_help" element={<NeedHelp/>}/>
                    <Route exact path="events" element={<Events/>}/>
                    <Route exact path="page3" element={<Page3/>}/>
                </Routes>
            </Router>
        );
    }
}

export default Header;