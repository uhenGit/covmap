import { toJS, observable, runInAction } from 'mobx';

import { GEO_DATA_USERNAME } from '../keys.js';

class Country {
	constructor() {
		this.currentCountryGeoData = observable.box({});
		this.siblings = observable.array([]);
		this.currentCountryName = observable.array([]);
		this.loadCountryStatus = observable.box('');
		this.loadCountryError = observable.box({});
	}

	/**
   * 
   * @param {string} status - current country handler status 
   */
	setStatus(status) {
		runInAction(() => {
			this.loadCountryStatus.set(status);
		});
	}

  /**
   * 
   * @param {Object} erorr - error object
   */
  setError(error) {
    this.setStatus('error');
    runInAction(() => {
			this.loadCountryError.set(error);
    });
  }

  get countryGeoData() {
    return toJS(this.currentCountryGeoData);
  }

	get countryName() {
    return toJS(this.currentCountryName);
  }

	get status() {
    return toJS(this.loadCountryStatus);
  }

	get error() {
    return toJS(this.loadCountryError);
  }

	get isLoading() {
    return toJS(this.loadCountryStatus) === 'in-progress';
  }

	get allSiblings() {
    return toJS(this.siblings);
  }

	/**
   * clear siblings array
   */
	dropCountryName() {
		runInAction(() => {
      this.currentCountryName.clear();
    });
	}

	/** 
   * Get current coordinates from the browser api or use the default
   * if navigation in the browser does not allow using second parameter of getCurrentPosition()
   */
	getCurrentCoords() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
        async (pos) => {
          await this.getCountry(pos.coords.latitude, pos.coords.longitude);
        },
        async () => { await this.getCountry(48.45, 34.93) },
      );
		}
	}

  /**
   * Get country id using coordinates
   * @param {number} lat - latitude
   * @param {number} lon  - longitude
   */
	async getCountry(lat, lon) {
		this.setStatus('in-progress');
    const url = `http://api.geonames.org/findNearbyJSON?formatted=true&lat=${lat}&lng=${lon}&fclass=P&fcode=PPLA&fcode=PPL&fcode=PPLC&username=${GEO_DATA_USERNAME}&style=full`;

		try {
			const res = await fetch(url);
			const { geonames } = await res.json();

			if (geonames.length === 0) {
        this.setError({ message: `I've no idea where are You now` });

				return;
			}

			this.setCountry(geonames[0]);
			this.setStatus('done');
		}	catch (err) {
      this.setError(err);
		}
	}

  /**
   * Set selected country to the store
   * If the parameter comes from the clicked item in the countries table,
   * it should be handled by toJS method
   * @param {Object} selectedCountry 
   */
	async setCountry(selectedCountry) {
		this.setStatus('in-progress');
		const country = toJS(selectedCountry);

		try {
			runInAction(() => {
        this.currentCountryGeoData.set(country);
      });
			await this.getSiblings(country.countryId);
			this.setStatus('done');
		}	catch (err) {
      this.setError(err);
		}
	}

  /**
   * 
   * @param {string} countryId 
   */
	async getSiblings(countryId) {
		this.setStatus('in-progress');

		try {
			const res = await fetch(`http://api.geonames.org/neighboursJSON?formatted=true&geonameId=${countryId}&username=${GEO_DATA_USERNAME}&style=full`);
			const data = await res.json();

			if (data.geonames.length === 0) {
        this.setError({ message: 'No siblings' });

				return;
			}

			runInAction(() => {
        this.siblings.replace(data.geonames);
      });
			this.setStatus('done');
		}	catch (err) {
      this.setError(err);
		}
	}

  /**
   * 
   * @param {string} char - search query from the input
   */
	async searchCountry(char) {
		this.setStatus('in-progress');

		try {
			const res = await fetch(`http://api.geonames.org/searchJSON?name_startsWith=${char}&fcode=PCLI&username=${GEO_DATA_USERNAME}`);
			const { geonames } = await res.json();

			if (geonames.length == 0) {
        this.setError({ message: 'No matches country' });

				return;
			}

			runInAction(() => {
        this.currentCountryName.replace(geonames);
      });
			this.setStatus('done');
		}	catch (err) {
      this.setError(err);
		}
	}
}

export default new Country();

