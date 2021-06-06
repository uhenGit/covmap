import { toJS, observable, runInAction } from 'mobx';

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
	getData() {
		return toJS(this.covData);
	}
	getDataByDay() {
		return toJS(this.covDataByDay);
	}
	async getCovData() {
		this.inProcess('processing');
		try {
			const res = await fetch(`https://covid-193.p.rapidapi.com/statistics`, {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "covid-193.p.rapidapi.com",
					"x-rapidapi-key": "c67b6ad2bamsh89144d732b71fdbp17bbf0jsn23c79345dd6f"
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
					"x-rapidapi-key": "c67b6ad2bamsh89144d732b71fdbp17bbf0jsn23c79345dd6f",
					"x-rapidapi-host": "covid-193.p.rapidapi.com"
				}
			});
			const data = await res.json();
			runInAction(() => {this.covDataByDay.replace(data.response)});
			this.inProcess('done');
		}
		catch (err) {
			runInAction(() => {this.error.set(err)})
			this.inProcess('error');
		}
	}
};

export default new Cov();

