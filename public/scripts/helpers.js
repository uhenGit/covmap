// import { useState, useEffect } from "react";
module.exports = {
	covCountryToGeo(c) {
		let a;
		switch (c) {
			case 'USA':
				a = 'United States'
				break;
			case 'CAR':
				a = 'Central African Republic';
				break;
			default:
				a = ''
				break;
		}
		// console.log('helpers func: ',c);
		return a;
	},
	geoCountryToCov(i) {
		let b;
		switch (i) {
			case 'United States':
				b = 'USA'
				break;
			case 'Central African Republic':
				b = 'CAR';
				break;
			default:
				b = ''
				break;
		}
		return b;
	},
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
}
