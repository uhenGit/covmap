import { toJS, makeAutoObservable, runInAction } from 'mobx';

class User {
	showDetales = false;
	detales = '';
	constructor() {	
		// this.userName = observable.box('');
		makeAutoObservable(this);
	}
	toggleShow() {
		runInAction(() => {
			this.showDetales = !this.showDetales;
		})
	}
	isShow() {
		return toJS(this.showDetales);
	}
	setDetales(data) {
		runInAction(() => {
			this.detales = data;
		})
	}
	getDetales() {
		return this.detales;
	}
	dropDetales() {
		runInAction(() => {
			this.detales = '';
		})
	}
}

export default new User();
