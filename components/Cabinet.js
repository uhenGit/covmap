import { useState, useEffect } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import L from 'leaflet';
import Country from '../store/countryStore.js';

const Cabinet = () => {
	let coords = [];
	useEffect(() => {
		if (Country.state === 'done') {
			let data = toJS(Country.currentCountryGeoData);
			coords.push(data.lat);
			coords.push(data.lng);
		} else {
			coords.push(48.45);
			coords.push(34.93);
		}
		const myMap = L.map('map').setView(coords, 8);
		L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    		maxZoom: 18,
    		id: 'mapbox/streets-v11',
    		tileSize: 512,
    		zoomOffset: -1,
    		accessToken: 'pk.eyJ1IjoidWhlbiIsImEiOiJja25zcDZoN2gyangzMnFueHlybm9heTV2In0.AhZrjp1alacLiSgt_jAh9A'
		}).addTo(myMap);}, []);
	return (
		<div>
			<h2>Cabinet</h2>
			<div id='map'></div>
		</div>)
};
export default Cabinet;
