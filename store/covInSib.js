import Cov from './covStore';
import country from './countryStore';
import { geoCountryToCov } from '../public/scripts/helpers';

export default function sibCovArr() {
	const covData = Cov.getData();
	const siblings = country.allSiblings;
	const res = [];
	for (let sibling of siblings) {
		const alterName = geoCountryToCov(sibling.countryName);
			covData.forEach((covEl) => {
        const isCountryNameMatched = covEl.country.toLowerCase() === sibling.countryName.toLowerCase();
        const isCountryAlterNameMatched = covEl.country.toLowerCase() === alterName.toLowerCase();

				if (isCountryNameMatched || isCountryAlterNameMatched) {
					let elObj = {
						bbox: sibling.bbox,
						lat: sibling.lat,
						lng: sibling.lng,
						day: covEl.day,
						continent: sibling.continentCode,
						country: covEl.country,
						population: covEl.population,
						cases: covEl.cases,
						deaths: covEl.deaths
					};
					res.push(elObj);
				}
			})
	}
  
	return res;
}
