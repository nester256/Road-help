import React, {Component} from 'react';
import { Link } from "react-router-dom";
import logo from '../../assets/icons/logo.png'
import './header-styles.css';

class Header extends Component {
    render() {
        return (
            <div className="header-container">
                <nav className="header-nav">
                    <ul className="header-nav-list">
                        <li className="header-list-item">
                            <Link to={"/"}>
                                <img src={logo} alt="logo" className="header-logo" />
                            </Link>
                        </li>
                        <li className="header-list-item">
                            <Link to={"/"} className="header-list-item-link"> Главная </Link>
                        </li>
                        <li className="header-list-item">
                            <Link to={"/need_help"} className="header-list-item-link"> Нужна помощь? </Link>
                        </li>
                        <li className="header-list-item">
                            <Link to={"/events"} className="header-list-item-link"> Карта событий </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Header;