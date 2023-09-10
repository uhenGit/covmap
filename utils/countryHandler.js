import country from '../store/countryStore.js';
import covid from '../store/covStore.js';

export function covidCountryNameToGeo(countryName) {
	switch (countryName) {
	case 'USA':
		return 'United States';
	case 'CAR':
		return 'Central African Republic';
	case 'DPRK':
		return 'North Korea';
	case 'S-Korea':
		return 'South Korea';
	default:
		return '';
	}
}

export function geoCountryNameToCovid(countryName) {
	switch (countryName) {
	case 'United States':
		return 'USA';
	case 'Central African Republic':
		return 'CAR';
	case 'North Korea':
		return 'DPRK';
	case 'South Korea':
		return 'S-Korea';
	default:
		return '';
	}
}

export function setCovidDataToSiblings() {
	const { allSiblings } = country;
	return allSiblings?.map((sibling) => {
		const { countryName } = sibling;
		const siblingCovidData = getCovidDataByCountry(countryName);

		return {
			bbox: sibling.bbox,
			coords: [ sibling.lat, sibling.lng ],
			continent: sibling.continentCode,
			country: countryName,
			day: siblingCovidData.day,
			population: siblingCovidData.population,
			cases: siblingCovidData.cases,
			deaths: siblingCovidData.deaths,
		};
	});
}

export function getCovidDataByCountry(countryName) {
	const { covidData } = covid;
	const alterName = geoCountryNameToCovid(countryName).toLowerCase();

	return covidData.find(({ country }) => (
		(country.toLowerCase() === countryName.toLowerCase()) || (country.toLowerCase() === alterName)
	));
}

/*useMediaQ(query) {
	const [isMatch, setIsMatch] = useState(false);
	useEffect(() => {
		const media = window.matchMedia(query);
		if (media.matches !== isMatch) setIsMatch(media.matches);
		const resizeListener = () => {setIsMatch(media.matches)};
		media.addEventListener('change', resizeListener);
		return () => media.removeEventListener('change', resizeListener)
	}, [isMatch, query]);
	return isMatch;
}*/