import React, { useEffect } from 'react';
import L from 'leaflet';
import country from '../store/countryStore.js';
import covid from '../store/covStore.js';
import Error from './Error.js';
import { geoCountryNameToCovid, setCovidDataToSiblings } from '../utils/countryHandler.js';
import { MAP_TOKEN } from '../keys.js';

const mapContent = (country, layer, isRootElement = false) => {
	const { radius, color, content } = prepareMapParams(country, isRootElement);
	const { coords } = country;

	L
		.circle(coords, { radius, color })
		.bindTooltip('Click for details')
		.bindPopup(content)
		.addTo(layer);
}

/**
 * Calculate circle statement on the country area
 * @param {Object} country
 * @param {boolean} isRootElement - current country is on the top of the table
 * @returns {Object} circle properties and content
 * */
const prepareMapParams = (country, isRootElement) => {
	let radius = 250000;

	if (!isRootElement) {
		// radius calculates from the country dimensions
		radius = 10000 * Math.abs(Math.abs(country.bbox.east) - Math.abs(country.bbox.west));
	}

	const currentNewCases = parseInt(country.cases.new, 10) || 0;
	// danger color calculates from the new cases on every 20 000 population
	const dangerColor = currentNewCases * 20000 / parseInt(country.population);
	const bgColor = currentNewCases < 100 // @todo refactor 100 to percents of the new cases among the population
		? 'rgb(250,180,10)'
		: `rgba(230,10,10,${dangerColor})`;
	const content = `<b>${country.country}</b>
		<br />Population: ${country.population}
		<br />Cases (new): ${country.cases.total} (${country.cases.new || 0})
		<br />Total recovered: ${country.cases.recovered || 0}`;

	return { radius, color: bgColor, content };
}

const Covmap = () => {
	const { countryGeoData } = country;
	const { covidData } = covid;

	if (!('geonameId' in countryGeoData) || covidData.length === 0) {
		return <Error error={{ message: 'No one country select' }}/>;
	}

	useEffect(() => {
		const coords = [ countryGeoData.lat, countryGeoData.lng ];

		const myMap = L.map('map').setView(coords, 4);
		// @todo find out what is the accessToken in the URL below
		L.tileLayer(
			'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
			{
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				maxZoom: 18,
				id: 'mapbox/streets-v11',
				tileSize: 512,
				zoomOffset: -1,
				accessToken: MAP_TOKEN,
			},
		).addTo(myMap);
		const { countryName } = countryGeoData;
		const alterName = geoCountryNameToCovid(countryName).toLowerCase();
		const countryCovidData = covidData
			.find(({ country }) => (
				(country.toLowerCase() === countryName.toLowerCase()) || (country.toLowerCase() === alterName)
			));
		countryCovidData.coords = coords;

		mapContent(countryCovidData, myMap, true);
		const siblingsCovidItems = setCovidDataToSiblings();
		siblingsCovidItems.forEach((item) => {
			mapContent(item, myMap);
		})}, []);

	return (
		<div className='flex f-center f-column'>
			<h2>Map</h2>
			<div id='map'></div>
		</div>
	)
}

export default Covmap;
