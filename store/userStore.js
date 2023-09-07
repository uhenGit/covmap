import { toJS, makeAutoObservable, runInAction } from 'mobx';

class User {
	showDetails = false;
	details = '';
	constructor() {
		makeAutoObservable(this);
	}
	toggleShow() {
		runInAction(() => {
			this.showDetails = !this.showDetails;
		})
	}
	isShow() {
		return toJS(this.showDetails);
	}
	setDetales(data) {
		runInAction(() => {
			this.details = data;
		})
	}
	getDetales() {
		return this.details;
	}
	dropDetales() {
		runInAction(() => {
			this.details = '';
		})
	}
}

export default new User();
