import React from "react";
import PropTypes from "prop-types";

import loaderStyle from '../styles/loader.module.css';

function Loader({ spinDiameter }) {
	return (
		<div
			style={{ height: `${spinDiameter}px` }}
			className={loaderStyle.loaderWrapper}>
			<div
				style={{width: `${spinDiameter}px`, height: `${spinDiameter}px`}}
				className={loaderStyle.spin1}
			></div>
			<div
				style={{ width: `${spinDiameter}px`, height:`${spinDiameter}px` }}
				className={loaderStyle.spin2}
			></div>
		</div>
	)
}

Loader.propTypes = {
	spinDiameter: PropTypes.number,
}

export default Loader;