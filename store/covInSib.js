import Cov from './covStore';
import Country from './countryStore';
import { geoCountryToCov } from '../public/scripts/helpers';

export default function sibCovArr() {
	const covData = Cov.getData();
	const sibs = Country.getAllSiblings();
	let res = [];
	for (let sib of sibs) {
		let alterName = geoCountryToCov(sib.countryName);
			covData.forEach((covEl) => {
				if (covEl.country.toLowerCase() === sib.countryName.toLowerCase() || covEl.country.toLowerCase() === alterName.toLowerCase()) {
					let elObj = {
						bbox: sib.bbox,
						lat: sib.lat,
						lng: sib.lng,
						day: covEl.day,
						continent: sib.continentCode,
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
