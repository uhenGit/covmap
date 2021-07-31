import { toJS, observable, runInAction } from 'mobx';
import {COV_API_KEY} from '../keys.js';

class Cov {
	constructor() {
		this.covData = observable.array([]);
		this.covDataByDay = observable.array([]);
		this.state = observable.box('');
		this.error = observable.box(null);
	}
	
	inProcess(status) {
		runInAction(() => {this.state.set(status)})
	}
	getData() { return toJS(this.covData) }
	getState() { return toJS(this.state) }
	getError() { return toJS(this.error) }
	getDataByDay() { return toJS(this.covDataByDay) }
	dropDataByDay() {
		runInAction(() => {
			this.covDataByDay.clear()
			this.inProcess('done')
		})
	}
	async getCovData() {
		this.inProcess('processing');
		try {
			const res = await fetch(`https://covid-193.p.rapidapi.com/statistics`, {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "covid-193.p.rapidapi.com",
					"x-rapidapi-key": COV_API_KEY
				}
			});
			const data = await res.json();
			runInAction(() => {this.covData.replace(data.response)})
			this.inProcess('done');
		}
		catch (err) {
			runInAction(() => {this.error.set(err)})
			this.inProcess('error');
		}
	};
	async getCovDataByDay(c, d) {
		this.inProcess('processing');
		try {
			const res = await fetch(`https://covid-193.p.rapidapi.com/history?country=${c}&day=${d}`, {
				"method": "GET",
				"headers": {
					"x-rapidapi-key": COV_API_KEY,
					"x-rapidapi-host": "covid-193.p.rapidapi.com"
				}
			});
			const data = await res.json();
			if (data.response.length !== 0) {
				runInAction(() => {this.covDataByDay.replace(data.response)});
				this.inProcess('done');
			} else {
				let err = 'No cov data. Maybe You want to see future';
				runInAction(() => {this.error.set(err)});
				this.inProcess('error');
			}
		}
		catch (err) {
			runInAction(() => {this.error.set(err)})
			this.inProcess('error');
		}
	}
};

export default new Cov();

