import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import covid from '../store/covStore';
import '../styles/global.css';

function App({ Component, pageProps }) {
	useEffect(() => {
		if (covid.covidData.length === 0) {
			covid.getCovidData();
		}
	},[]);

	return (<Component { ...pageProps } />)
}

App.propTypes = {
	Component: PropTypes.func,
	pageProps: PropTypes.object,
}

export default App;