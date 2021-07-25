import { useEffect } from 'react';
import L from 'leaflet';
import Country from '../store/countryStore.js';
import Cov from '../store/covStore.js';

const Covmap = () => {
	let coords = [];
	useEffect(() => {
		if (Country.getState() === 'done') {
			coords.push(Country.getGeoData().lat);
			coords.push(Country.getGeoData().lng);
		} else {
			coords.push(48.45);
			coords.push(34.93);
		}
		console.log('siblings country: ',Country.getAllSiblings());
		console.log('cov data: ',Cov.getData());
		const myMap = L.map('map').setView(coords, 4);
		L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    		maxZoom: 18,
    		id: 'mapbox/streets-v11',
    		tileSize: 512,
    		zoomOffset: -1,
    		accessToken: 'pk.eyJ1IjoidWhlbiIsImEiOiJja25zcDZoN2gyangzMnFueHlybm9heTV2In0.AhZrjp1alacLiSgt_jAh9A'
		}).addTo(myMap);
		const mainData = Country.getGeoData();
		const covData = Cov.getData();
		const currentCovData = covData.find(covItem => covItem.country.toLowerCase() === mainData.countryName.toLowerCase());
		const col = currentCovData.cases.total*15/currentCovData.population;
		const covContent = `<b>${currentCovData.country}</b><br />Population: ${currentCovData.population}<br /> Cases (new): ${currentCovData.cases.total} (${currentCovData.cases.new})<br /> Total recovered: ${currentCovData.cases.recovered}`
		L.circle(coords,{radius: 250000, color: `rgba(200,20,20,${col})`}).bindTooltip('Click for detales').bindPopup(covContent).addTo(myMap);
		Country.getAllSiblings().forEach(item => {
			const sibCovData = covData.find(sibCovItem => sibCovItem.country.toLowerCase() === item.countryName.toLowerCase());
			const sibCol = sibCovData.cases.total*15/sibCovData.population;
			const dataRadius = 10000*Math.abs(Math.abs(item.bbox.east)-Math.abs(item.bbox.west))
			const sibCovContent = `<b>${sibCovData.country}</b><br/>Population: ${sibCovData.population}<br/>Cases (new): ${sibCovData.cases.total} (${sibCovData.cases.new})<br/>Total recovered: ${sibCovData.cases.recovered}`;
			L.circle([item.lat, item.lng], {radius: dataRadius, color: `rgba(230,10,10,${sibCol})`}).bindTooltip('Click for detales').bindPopup(sibCovContent).addTo(myMap)
		})}, []);
	return (
		<div>
			<h2>Map</h2>
			<div id='map'></div>
		</div>)
};
export default Covmap;
