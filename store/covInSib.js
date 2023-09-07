import covid from './covStore';
import country from './countryStore';
import { geoCountryToCov } from '../public/scripts/helpers';

export default function sibCovArr() {
	const { covidData } = covid;
	const { allSiblings } = country;
	const covidDataItems = [];

	for (let sibling of allSiblings) {
		const siblingCountryName = sibling.countryName;
		const alterName = geoCountryToCov(siblingCountryName);
		covidData.forEach((covidElement) => {
			const covidDataCountry = covidElement.country;
			const isCountryNameMatched = covidDataCountry.toLowerCase() === siblingCountryName.toLowerCase();
			const isCountryAlterNameMatched = covidDataCountry.toLowerCase() === alterName.toLowerCase();

			if (isCountryNameMatched || isCountryAlterNameMatched) {
				covidDataItems.push({
					bbox: sibling.bbox,
					lat: sibling.lat,
					lng: sibling.lng,
					day: covidElement.day,
					continent: sibling.continentCode,
					country: covidDataCountry,
					population: covidElement.population,
					cases: covidElement.cases,
					deaths: covidElement.deaths
				});
			}
		});
	}
  
	return covidDataItems;
}
