import {toJS, observable, runInAction} from 'mobx';

import {GEO_DATA_USERNAME} from '../keys.js';

class Country {
	constructor() {
		this.currentCountryGeoData = observable.box({});
		this.siblings = observable.array([]);
		this.countryName = observable.array([]);
		this.state = observable.box('');
		this.error = observable.box(null);
		this.isError = observable.box(false);
		this.isLoading = observable.box(false);
	}
	// !!!!!!!!!!!!!!! implement in right places !!!!!!!!!!!!!!!
	inProcess(s, l, e) {
		runInAction(() => {
			this.state.set(s);
			this.isLoading.set(l);
			this.isError.set(e);
		})
	}
	getGeoData() {return toJS(this.currentCountryGeoData.get())};
	getCountryName() {return this.countryName};
	getState() {return toJS(this.state.get())};
	getError() {return toJS(this.error.get())};
	getAllSiblings() {return toJS(this.siblings)};
	getIsLoading() {return this.isLoading.get()};
	getIsError() {return this.isError.get()};
	// clear siblings array
	dropCountryName() {
		runInAction(() => {this.countryName.clear()});
	}
	// if navigator.geolocation
	// if nav does not allow -> uses second parameter of getCurrentPosition()
	getCurrentCoords() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((pos) => {
				this.getCountryId(pos.coords.latitude, pos.coords.longitude);
			}, () => this.getCountryId(48.45, 34.93))
		}
	}
	async getCountryId(lat, lon) {
		this.inProcess('processing...', true, false);
		try {
			const res = await fetch(`http://api.geonames.org/findNearbyJSON?formatted=true&lat=${lat}&lng=${lon}&fclass=P&fcode=PPLA&fcode=PPL&fcode=PPLC&username=${GEO_DATA_USERNAME}&style=full`);
			const data = await res.json();
			if (data.geonames.length === 0) {
				runInAction(() => {this.error.set({ msg: `I've no idea where are You now` })});
				this.inProcess('error', false, true);
				return;
			} 
			this.setCountry(data.geonames[0]);
			this.inProcess('done', false, false);
		}
		catch (err) {
			runInAction(() => {this.error.set(err)});
			this.inProcess('error', false, true);
		}
	};
	setCountry(item) {
		this.inProcess('', true, false);
		const i = toJS(item);
		console.log(i);
		try {
			this.getSiblings(i.countryId);
			runInAction(() => {this.currentCountryGeoData.set(i)});
			this.inProcess('done', false, false)
		}
		catch (err) {
			runInAction(() => {this.error.set(err)});
			this.inProcess('error', false, true);
		}
	}
	async getSiblings(id) {
		this.inProcess('processing...', true, false);
		try {
			const res = await fetch(`http://api.geonames.org/neighboursJSON?formatted=true&geonameId=${id}&username=${GEO_DATA_USERNAME}&style=full`);
			const data = await res.json();
			if (data.geonames.length === 0) {
				runInAction(() => {this.error.set({msg: 'No siblings'})});
				this.inProcess('error', false, true);
				return;
			}
			runInAction(() => {this.siblings.replace(data.geonames)});
			this.inProcess('done', false, false);
		}
		catch (err) {
			runInAction(() => {this.error.set(err)});
			this.inProcess('error', false, true);
		}
	};
	async searchCountry(char) {
		this.inProcess('processing...', true, false);
		try {
			const res = await fetch(`http://api.geonames.org/searchJSON?name_startsWith=${char}&fcode=PCLI&username=${GEO_DATA_USERNAME}`);
			const data = await res.json();
			if (data.geonames.length == 0) {
				runInAction(() => {this.error.set({msg: 'No matches country'})});
				this.inProcess('error', false, true);
				return;
			}
			runInAction(() => {this.countryName.replace(data.geonames)});
			this.inProcess('done', false, false);
		}
		catch (err) {
			runInAction(() => {this.error.set(err)});
			this.inProcess('error', false, true);
		}
	};
};

export default new Country();

