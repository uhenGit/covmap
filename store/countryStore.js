import { observable, runInAction } from 'mobx';
import { GEO_DATA_USERNAME } from '../keys.js';

class Country {
	constructor() {
		this.currentCountryGeoData = observable.box({});
		this.siblings = observable.array([]);
		this.loadedCountries = observable.array([]);
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
		// console.log('store: ', this.currentCountryGeoData.get())
		return this.currentCountryGeoData.get();
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

	/**
   * clear siblings array
   */
	dropCountryName() {
		runInAction(() => {
			this.loadedCountries.clear();
		});
	}

	/** 
   * Get current coordinates from the browser api or use the default
   * if the user deny access to the location in a browser, use the second parameter of getCurrentPosition()
   */
	getCurrentCoords() {
		// let selectedCountry;

		if (navigator.geolocation) {
			this.#setStatus('in-progress');
			navigator.geolocation.getCurrentPosition(
				(pos) => {
					this.#getCountry(pos.coords.latitude, pos.coords.longitude)
						.then((selectedCountry) => this.setCountry(selectedCountry))
						.catch((err) => console.error('Set country error 0: ', err));
				},
				// set default coords - Ukraine
				async () => {
					this.#getCountry(48.45, 34.93)
						.then((selectedCountry) => this.setCountry(selectedCountry))
						.catch((err) => console.error('Set country error 1: ', err));
				},
			);
		} else {
			this.#getCountry(48.45,34.93)
				.then((selectedCountry) => this.setCountry(selectedCountry))
				.catch((err) => console.error('Set country error 2: ', err));
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

			this.#setStatus('done');
			return geonames[0];
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

		try {
			runInAction(() => {
				this.currentCountryGeoData.set(selectedCountry);
			});
			await this.getSiblings(selectedCountry.countryId);
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
				this.loadedCountries.replace(geonames);
			});
			this.#setStatus('done');
		} catch (err) {
			this.#setError(err);
		}
	}
}

export default new Country();

