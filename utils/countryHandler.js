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
	return country.siblings?.map((sibling) => {
		const { countryName, lat, lng, bbox, continentCode } = sibling;
		const siblingCovidData = getCovidDataByCountry(countryName);

		return {
			bbox,
			coords: [ lat, lng ],
			continent: continentCode,
			country: countryName,
			...siblingCovidData,
		};
	});
}

export function getCovidDataByCountry(countryName) {
	const { covidData } = covid;
	const alterName = geoCountryNameToCovid(countryName).toLowerCase();

	const countryCovidData = covidData.find(({ country }) => (
		(country.toLowerCase() === countryName.toLowerCase()) || (country.toLowerCase() === alterName)
	));

	return countryCovidData || { error: { message: 'There is no covid data for this location', countryName } };
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