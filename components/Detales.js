import { useEffect, useState } from 'react';
import { autorun } from 'mobx';
import LiDate from './Lidate.js';
import Cov from '../store/covStore.js';
import User from '../store/userStore.js';
import DetalesStyle from '../styles/detales.module.css';

const Detales = () => {
	const [detales, setDetales] = useState({});
	useEffect(() => autorun(() => {
		if (User.getDetales() !== '' && !Cov.getDataByDay()[0]) {
			let data = Cov.getData().find(el => el.country === User.getDetales());
			setDetales(data);
		} else {
			setDetales(Cov.getDataByDay()[0]);
		}
	}),[])
	function toggle() {
		User.dropDetales();
		User.toggleShow();
		Cov.dropDataByDay();
	}
	function setCovDate() {
		Cov.getCovDataByDay(detales.country, detales.day);
	}
	let innerStyle = detales ? `${DetalesStyle.inner} ${DetalesStyle.active}` : `${DetalesStyle.inner}`;
	let content;
	if (detales && detales.cases) {
		content = <ul>
					<li><span>Country</span><span>{detales.country}</span></li>
					<LiDate detales={detales} />
					<li><span>Population</span><span>{detales.population}</span></li>
					<li><span>New Cases</span><span>{detales.cases.new}</span></li>
				</ul>
		}
	if (Cov.getState() === 'error') return (
		<div className={DetalesStyle.outer}>
			<div className={innerStyle}>
				<button onClick={toggle}>Close</button>
				<h3>{Cov.getError()}</h3>
			</div>
		</div>)
	return (
		<div className={DetalesStyle.outer}>
			<div className={innerStyle}>
				<button onClick={toggle}>Close</button>
				<div>
					<h2>Detales</h2>
					<h4>Click on date to select another day</h4>
					{detales && content}
				</div>
			</div>
		</div>)
}
export default Detales;
