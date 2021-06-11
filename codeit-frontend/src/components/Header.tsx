import React from 'react'
// fontawesome imports
import { faLaptopCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//importing style sheet
import "./Header.css";


function Header() {
    return (
        <div className="navbar">
            <FontAwesomeIcon className="fa-icon" icon={faLaptopCode} />
            CodeIt
        </div>
    )
}

export default Header
