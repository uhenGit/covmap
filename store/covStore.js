import { toJS, observable, runInAction } from 'mobx';
import { COV_API_KEY } from '../keys.js';

class Covid {
	constructor() {
		this.covData = observable.array([]);
		this.covDataByDay = observable.array([]);
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
    return toJS(this.loadCovidDataStatus);
  }

	get error() {
    return toJS(this.loadCovidDataError);
  }

	get covidDataByDay() {
    return toJS(this.covDataByDay);
  }

	dropDataByDay() {
		runInAction(() => {
			this.covDataByDay.clear();
		})
	}

	async getCovidData() {
		this.#setStatus('in-progress');

		try {
			const res = await fetch(`https://covid-193.p.rapidapi.com/statistics`, {
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
	};

	async getCovidDataByDay(country, date) {
		this.#setStatus('in-progress');

		try {
			const res = await fetch(
        `https://covid-193.p.rapidapi.com/history?country=${country}&day=${date}`,
        {
          "method": "GET",
          "headers": {
            "x-rapidapi-key": COV_API_KEY,
            "x-rapidapi-host": "covid-193.p.rapidapi.com"
          }
			  },
      );
			const { response } = await res.json();

			if (response.length !== 0) {
				runInAction(() => {
          this.covDataByDay.replace(response);
        });
				this.#setStatus('done');
			} else {
				this.#setError({ message: 'No cov data. Maybe You want to see future' });
			}
		}
		catch (err) {
			this.#setError(err);
		}
	}
};

export default new Covid();

