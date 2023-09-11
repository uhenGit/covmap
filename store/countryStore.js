import { toJS, observable, runInAction } from 'mobx';
import { GEO_DATA_USERNAME } from '../keys.js';

class Country {
	constructor() {
		this.currentCountryGeoData = observable.box({});
		this.siblings = observable.array([]);
		this.currentLoadedCountries = observable.array([]);
		this.loadCountryStatus = observable.box('');
		this.loadCountryError = observable.box({});
	}

	/**
   * private
   * @param {string} status - current country handler status 
   */
	#setStatus(status) {
		runInAction(() => {
			this.loadCountryStatus.set(status);
		});
	}

	/**
   * private
   * @param {Object} error
   */
	#setError(error) {
		this.#setStatus('error');
		runInAction(() => {
			this.loadCountryError.set(error);
		});
	}

	get countryGeoData() {
		return this.currentCountryGeoData.get();
	}

	get loadedCountries() {
		return toJS(this.currentLoadedCountries);
	}

	get status() {
		return this.loadCountryStatus.get();
	}

	get error() {
		return this.loadCountryError.get();
	}

	get isLoading() {
		return this.loadCountryStatus.get() === 'in-progress';
	}

	get allSiblings() {
		return toJS(this.siblings);
	}

	/**
   * clear siblings array
   */
	dropCountryName() {
		runInAction(() => {
			this.currentLoadedCountries.clear();
		});
	}

	/** 
   * Get current coordinates from the browser api or use the default
   * if the user deny access to the location in a browser, use the second parameter of getCurrentPosition()
   */
	async getCurrentCoords() {
		if (navigator.geolocation) {
			this.#setStatus('in-progress');
			navigator.geolocation.getCurrentPosition(
				async (pos) => {
					await this.#getCountry(pos.coords.latitude, pos.coords.longitude);
				},
				// set default coords - Ukraine
				async () => {	await this.#getCountry(48.45, 34.93); },
			);
		} else {
			await this.#getCountry(48.45,34.93);
		}
	}

	/**
	 * private
   * Get country id using the coordinates
   * @param {number} lat - latitude
   * @param {number} lon  - longitude
   */
	async #getCountry(lat, lon) {
		this.#setStatus('in-progress');
		const url = `http://api.geonames.org/findNearbyJSON?formatted=true&lat=${lat}&lng=${lon}&fclass=P&fcode=PPLA&fcode=PPL&fcode=PPLC&username=${GEO_DATA_USERNAME}&style=full`;

		try {
			const res = await fetch(url);
			const { geonames } = await res.json();

			if (geonames.length === 0) {
				this.#setError({ message: `I've no idea where are You now` });

				return;
			}

			await this.setCountry(geonames[0]);
			this.#setStatus('done');
		} catch (err) {
			this.#setError(err);
		}
	}

	/**
   * Set selected country to the store
   * If the parameter comes from the clicked item in the countries table,
   * it should be handled by toJS method
   * @param {Object} selectedCountry 
   */
	async setCountry(selectedCountry) {
		this.#setStatus('in-progress');
		const country = toJS(selectedCountry);

		try {
			runInAction(() => {
				this.currentCountryGeoData.set(country);
			});
			await this.getSiblings(country.countryId);
			this.#setStatus('done');
		} catch (err) {
			this.#setError(err);
		}
	}

	/**
   * 
   * @param {string} countryId 
   */
	async getSiblings(countryId) {
		this.#setStatus('in-progress');

		try {
			const res = await fetch(`http://api.geonames.org/neighboursJSON?formatted=true&geonameId=${countryId}&username=${GEO_DATA_USERNAME}&style=full`);
			const { geonames } = await res.json();

			runInAction(() => {
				this.siblings.replace(geonames);
			});

			if (geonames.length === 0) {
				this.#setError({ message: 'No siblings were found' });

				return;
			}

			this.#setStatus('done');
		} catch (err) {
			this.#setError(err);
		}
	}

	/**
   * 
   * @param {string} char - search query from the input
   */
	async searchCountry(char) {
		this.#setStatus('in-progress');

		try {
			const res = await fetch(`http://api.geonames.org/searchJSON?name_startsWith=${char}&fcode=PCLI&username=${GEO_DATA_USERNAME}`);
			const { geonames } = await res.json();

			if (geonames.length === 0) {
				this.#setError({ message: 'No matches country' });

				return;
			}

			runInAction(() => {
				this.currentLoadedCountries.replace(geonames);
			});
			this.#setStatus('done');
		} catch (err) {
			this.#setError(err);
		}
	}
}

export default new Country();

