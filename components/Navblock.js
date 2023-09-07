import React from "react";
import PropTypes from "prop-types";
import Link from 'next/link';

function Navblock({ isMobile }) {
	const navStyle = isMobile ? 'flex f-column' : 'flex';
	return (
		<ul className={navStyle}>
			<li>
				<Link href={ '/' }>Home Page</Link>
			</li>
			<li>
				<Link href={ '/data' }>Data Page</Link>
			</li>
			<li>
				<Link href={ '/contacts' }>Contact Page</Link>
			</li>
		</ul>
	)
}

Navblock.propTypes = {
	isMobile: PropTypes.bool,
}

export default Navblock;
