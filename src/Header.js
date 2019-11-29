import React from 'react';
import logo from "./img/Logo.svg"

const Header = ({ className }) => {
    return (
        <header className="header">
			<div className="logo">
				<img src={logo} alt=""/>
			</div>
		</header>
    );
};



export default Header;
