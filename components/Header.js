import React from "react";
import Link from 'next/link';
import Nav from './Nav.js';
// import Reglog from './Reglog.js';
import HeaderStyle from '../styles/header.module.css';

const Header = () => {
	return (
		<header>
			<div className={ HeaderStyle.topBlock }>
				<div>
					<Link href={ '/' }>
						<img src="#" alt="logo" />
						<span>LOGO</span>
					</Link>
				</div>
				{/* <Reglog /> */}
			</div>
			<Nav />
		</header>
	);
}

export default Header;
