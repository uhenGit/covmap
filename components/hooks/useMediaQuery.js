import { useEffect, useState } from "react";

module.exports = {
	useMediaQ(q) {
		const [ isMatch, setIsMatch ] = useState(false);
		useEffect(() => {
			const media = window.matchMedia(q);

			if (media.matches) {
				setIsMatch(media.matches);
			}

			const resizeListener = () => { setIsMatch(media.matches) };
			media.addEventListener('change', resizeListener);

			return () => media.removeEventListener('change', resizeListener)
		}, [ isMatch, q ]);

		return isMatch;
	}
}