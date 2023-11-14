import React from 'react';
import {Link} from "react-router-dom";
import './main-styles.css';

export default function MainPage() {
    return (
        <div className="main-container">
            <section className="welcome-text">
                <p className="first-text">Безопасность на дорогах - наш приоритет!</p>
                <p>Надежный сервис помощи на дорогах. Получите помощь прямо сейчас!</p>

                <div className="welcome-buttons">
                    <Link to={'/events'}>
                        <button type="submit" className="button button-helper"> Оказать помощь </button>
                    </Link>
                    <Link to={'/need_help'}>
                        <button type="submit" className="button button-help"> Получить помощь </button>
                    </Link>
                </div>
            </section>

            <section className="welcome-text-options">
                <div className="welcome-text-items-first">
                    <h3>Эвакуация</h3>
                    <p>Быстрая и надежная эвакуация вашего автомобиля в случае поломки или ДТП. Мы заботимся о безопасной доставке вашего автомобиля в ближайший автосервис.</p>
                </div>
                <div className="welcome-text-items-first">
                    <h3>Техническая помощь</h3>
                    <p>Наша команда квалифицированных ​специалистов всегда готова оказать техническую помощь на дороге. Мы поможем вам с заменой колеса, зарядкой аккумулятора и другими проблемами.</p>
                </div>
                <div className="welcome-text-items-first">
                    <h3>Юридическая поддержка</h3>
                    <p>В случае ДТП мы поможем вам с оформлением документов и консультацией по юридическим вопросам. Наша команда опытных юристов всегда готова помочь вам защитить свои интересы.</p>
                </div>
                <div className="welcome-text-items-first">
                    <h3>Помощь</h3>
                    <p>Другие участники могут:</p>
                    <ul>
                        <li>Предоставить информацию о дорожных событиях.</li>
                        <li>Поделиться опытом и советами по решению проблем на дороге.</li>
                        <li>Содействовать взаимной поддержке и координации в случае ЧС.</li>
                    </ul>
                </div>
            </section>

            <section className="welcome-text-advantages">
                <h3>Наши преимущества</h3>
                <div className="welcome-text-items">
                    <h3>Быстрый отклик</h3>
                    <p>Мы гарантируем быстрый отклик на ваш вызов, чтобы вы не остались на дороге без помощи надолго.</p>
                </div>

                <div className="welcome-text-items">
                    <h3>Профессиональная команда</h3>
                    <p>Наши специалисты имеют большой опыт работы и всегда готовы помочь вам в любой ситуации.</p>
                </div>

                <div className="welcome-text-items">
                    <h3>Доступные цены</h3>
                    <p>Мы предлагаем конкурентные цены, чтобы каждый мог получить необходимую помощь на дороге без проблем.</p>
                </div>

                <div className="welcome-text-items">
                    <h3>Высокая надежность</h3>
                    <p>Мы обеспечиваем высокую надежность наших услуг, чтобы вы чувствовали себя уверенно и защищенно на дороге.</p>
                </div>
            </section>

            <section className="welcome-text-advantages">
                <h3>Наша техника</h3>
                <div className="welcome-text-items">
                    <h3>Эвакуаторы</h3>
                    <p>Быстрая и надежная доставка вашего автомобиля до места ремонта.</p>
                </div>

                <div className="welcome-text-items">
                    <h3>Аварийные комбайны</h3>
                    <p>Устранение последствий ДТП и легкое удаление обломков автомобилей с дороги.</p>
                </div>

                <div className="welcome-text-items">
                    <h3>Технические авто</h3>
                    <p>Снабжение необходимыми вещами и техническое обслуживание вашего автомобиля на дороге.</p>
                </div>

                <div className="welcome-text-items">
                    <h3>Сотрудничество с аварийными службами</h3>
                    <p>Быстро организуем все специализированные службы, окажем содействие.</p>
                </div>
            </section>
        </div>
    )
}