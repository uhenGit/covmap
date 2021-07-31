import Cov from './covStore';
import Country from './countryStore';

export default function sibCovArr() {
	const covData = Cov.getData();
	const sibs = Country.getAllSiblings();
	let res = [];
	for (let sib of sibs) {
		let alterName;
		switch (sib.countryName) {
			case 'United States':
				alterName = 'usa';
				break;
		
			default:
				break;
		}
		covData.forEach(covEl => {
			if (covEl.country.toLowerCase() === sib.countryName.toLowerCase() || covEl.country.toLowerCase() === alterName) {
				
				let elObj = {
					bbox: sib.bbox,
					lat: sib.lat,
					lng: sib.lng,
					continentName: sib.continentCode,
					country: covEl.country,
					population: covEl.population,
					cases: covEl.cases
				};
				res.push(elObj);
			}
		});
	}
	return res;
}
