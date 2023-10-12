import { toJS, observable, runInAction } from 'mobx';
import { COV_API_KEY } from '../keys.js';

class Covid {
	constructor() {
		this.covData = observable.array([]);
		this.loadCovidDataStatus = observable.box('');
		this.loadCovidDataError = observable.box({});
	}
	
	/**
   * private
   * @param {string} status 
   */
	#setStatus(status) {
		runInAction(() => {
			this.loadCovidDataStatus.set(status);
		})
	}

	/**
   * private
   * @param {Object} error
   */
	#setError(error) {
		this.#setStatus('error');
		runInAction(() => {
			this.loadCovidDataError.set(error);
		})
	}

	get covidData() {
		return toJS(this.covData);
	}
  
	get status() {
		return this.loadCovidDataStatus.get();
	}

	get error() {
		return this.loadCovidDataError.get();
	}

	async getCovidData() {
		this.#setStatus('in-progress');

		try {
			const res = await fetch('https://covid-193.p.rapidapi.com/statistics', {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "covid-193.p.rapidapi.com",
					"x-rapidapi-key": COV_API_KEY,
				}
			});
			const { response } = await res.json();
			runInAction(() => {
				this.covData.replace(response);
			});
			this.#setStatus('done');
		}
		catch (err) {
			this.#setError(err);
		}
	}

	async getCovidDataByDay(country, date) {
		this.#setStatus('in-progress');

		try {
			const res = await fetch(
				`https://covid-193.p.rapidapi.com/history?country=${country}&day=${date}`,
				{
					"method": "GET",
					"headers": {
						"x-rapidapi-key": COV_API_KEY,
						"x-rapidapi-host": "covid-193.p.rapidapi.com",
					}
				},
			);
			const { response, errors } = await res.json();

			if (errors.length > 0 || response.length === 0) {
				this.#setStatus('error');

				return { errorMsg: 'No data from the API' };
			}

			this.#setStatus('done');

			return response[0];
		}
		catch (err) {
			this.#setStatus('error');
			throw new Error('Covid data by day request error');
		}
	}
}

export default new Covid();
