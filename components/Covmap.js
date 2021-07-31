import { useEffect } from 'react';
import L from 'leaflet';
import Country from '../store/countryStore.js';
import Cov from '../store/covStore.js';
import sibCovArr from '../store/covInSib.js';

const mapContent = (el, layer, coords = []) => {
	let radius = 250000;
	if (coords.length === 0) {
		coords.push(el.lat);
		coords.push(el.lng);
		radius = 10000*Math.abs(Math.abs(el.bbox.east)-Math.abs(el.bbox.west));
	}
	const borderColor = Number(el.cases.new)*20000/Number(el.population);
	const color = Number(el.cases.new) < 100 ? 'rgb(250,180,10)' : `rgba(230,10,10,${borderColor})`
	const content = `<b>${el.country}</b><br />Population: ${el.population}<br />Cases (new): ${el.cases.total} (${el.cases.new})<br />Total recovered: ${el.cases.recovered}`;
	L.circle(coords, {radius, color}).bindTooltip('Click for detales').bindPopup(content).addTo(layer);
}

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
		mapContent(currentCovData, myMap, coords)
		sibCovArr().forEach(item => {
			mapContent(item, myMap);
		})}, []);
	return (
		<div className='flex f-center f-column'>
			<h2>Map</h2>
			<div id='map'></div>
		</div>)
};
export default Covmap;
