import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Logo from '../assets/Vector.png';
import { Circle, X } from 'lucide-react';

function Navbar()
{
    const [hidden, setHidden] = useState(true);
    const location = useLocation();

    return (
        hidden && (
            <div className = "nav-container">
                <div>
                    <img src = {Logo} alt = ""/>
                    <p>COMPANY NAME</p>
                </div>

                <div>
                    <Circle className = "circle active"/>
                    <div className = {location.pathname === "/confirm" || location.pathname === "/email" || location.pathname === "/personal" ? "divider active" : "divider"}></div>
                    <Circle className = {location.pathname === "/confirm" || location.pathname === "/email" || location.pathname === "/personal" ? "circle active" : "circle"}/>
                    <div className = {location.pathname === "/email" || location.pathname === "/personal" ? "divider active" : "divider"}></div>
                    <Circle className = {location.pathname === "/email" || location.pathname === "/personal" ? "circle active" : "circle"}/>
                    <div className = {location.pathname === "/personal" ? "divider active" : "divider"}></div>
                    <Circle className = {location.pathname === "/personal" ? "circle active" : "circle"}/>
                </div>

                <div>
                    <X className = "cancel" onClick = {() => setHidden(false)}/>
                </div>
            </div>
        )
    )
}

export default Navbar;