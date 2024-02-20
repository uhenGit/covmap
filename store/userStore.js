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
	setDetails(data) {
		runInAction(() => {
			this.details = data;
		})
	}
	getDetails() {
		return this.details;
	}
	dropDetails() {
		runInAction(() => {
			this.details = '';
		})
	}
}

export default new User();
