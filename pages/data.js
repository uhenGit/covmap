import React from "react";
import Header from '../components/Header.js';
import Headblock from '../components/Headblock.js';
import Content from '../components/Content.js';

const Data = () => {
	return (
		<div className="mainWrap">
			<Headblock title={ 'Data' } />
			<Header />
			<h2>Data Page</h2>
			<Content />
		</div>)
}

export default Data;
