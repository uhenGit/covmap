import { toJS, observable, runInAction } from 'mobx';

import { GEO_DATA_USERNAME } from '../keys.js';

class Country {
	constructor() {
		this.currentCountryGeoData = observable.box({});
		this.siblings = observable.array([]);
		this.countryName = observable.array([]);
		this.state = observable.box('');
		this.error = observable.box(null);
	}
	inProcess(status) {
		runInAction(() => {this.state.set(status)})
	}
	getGeoData() {return toJS(this.currentCountryGeoData.get())};
	getCountryName() {return this.countryName};
	getState() {return this.state.get()};
	getError() {return this.error.get()};
	getAllSiblings() {return toJS(this.siblings)};
	// clear siblings array
	dropCountryName() {
		runInAction(() => {this.countryName.clear()});
	}
	// if navigator.geolocation
	getCurrentCoords() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((pos) => {
				this.getCountryId(pos.coords.latitude, pos.coords.longitude);
			}, () => this.getCountryId(48.45, 34.93))
		}
	}
	async getCountryId(lat, lon) {
		this.inProcess('processing...');
		try {
			const res = await fetch(`http://api.geonames.org/findNearbyJSON?formatted=true&lat=${lat}&lng=${lon}&fclass=P&fcode=PPLA&fcode=PPL&fcode=PPLC&username=${GEO_DATA_USERNAME}&style=full`);
			const data = await res.json();
			if (data.geonames.length !== 0) {
				this.setCountry(data.geonames[0])
			} else {
				runInAction(() => {this.error.set({ msg: `I've no idea where are You now` })});
				this.inProcess('error');
			} 
		}
		catch (err) {
			runInAction(() => {this.error.set(err)});
			this.inProcess('error');
		}
	};
	setCountry(item) {
		item = toJS(item);
		try {
			this.getSiblings(item.countryId);
			runInAction(() => {this.currentCountryGeoData.set(item)})
		}
		catch (err) {
			runInAction(() => {this.error.set(err)});
			this.state.set('error');
		}
	}
	async getSiblings(id) {
		this.inProcess('processing...');
		try {
			const res = await fetch(`http://api.geonames.org/neighboursJSON?formatted=true&geonameId=${id}&username=uhen&style=full`);
			const data = await res.json();
			runInAction(() => {this.siblings.replace(data.geonames)});
			this.inProcess('done');
		}
		catch (err) {
			runInAction(() => {this.error.set(err)});
			this.inProcess('error');
		}
	};
	async searchCountry(char) {
		this.inProcess('processing...');
		try {
			const res = await fetch(`http://api.geonames.org/searchJSON?name_startsWith=${char}&fcode=PCLI&username=uhen`);
			const data = await res.json();
			runInAction(() => {this.countryName.replace(data.geonames)});
			this.inProcess('done');
		}
		catch (err) {
			runInAction(() => {this.error.set(err)});
			this.inProcess('error');
		}
	};
};

export default new Country();

