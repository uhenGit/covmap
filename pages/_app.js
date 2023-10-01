import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import covid from '../store/covStore.js';
import country from '../store/countryStore.js';

import '../styles/global.css';

function App({ Component, pageProps }) {
	useEffect(() => {
		if ((covid.covidData.length === 0) || !('geonameId' in { ...country.countryGeoData })) {
			covid.getCovidData()
				.then(() => country.getCurrentCoords())
				.catch();
		}
	},[]);

	return (<Component { ...pageProps } />)
}

App.propTypes = {
	Component: PropTypes.func,
	pageProps: PropTypes.object,
}

export default App;