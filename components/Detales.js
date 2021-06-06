import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import Cov from '../store/covStore.js';
import User from '../store/userStore.js';
import DetalesStyle from '../styles/detales.module.css';

const Detales = observer(() => {
	const [detales, setDetales] = useState({});
	useEffect(() => {
		if (User.getDetales() !== '' && !Cov.getDataByDay()[0]) {
			let data = Cov.covData.find(el => el.country === User.getDetales());
			setDetales(data);
		} else {
			console.log(Cov.getDataByDay()[0]);
		}
	}, [Cov.covDataByDay])
	function toggle() {
		User.dropDetales();
		User.toggleShow();
	}
	function setCovDate() {
		Cov.getCovDataByDay(detales.country, detales.day);
	}
	let innerStyle = detales ? `${DetalesStyle.inner} ${DetalesStyle.active}` : `${DetalesStyle.inner}`;
	let content;
	if (detales.cases) {
		content = <ul>
					<li><span>Country</span><span>{detales.country}</span></li>
					<li><span>Date</span><span onClick={setCovDate}>{detales.day}</span></li>
					<li><span>Population</span><span>{detales.population}</span></li>
					<li><span>New Cases</span><span>{detales.cases.new}</span></li>
				</ul>
		}
	return (
		<div className={DetalesStyle.outer}>
			<div className={innerStyle}>
				<button onClick={toggle}>Close</button>
				<div>
					<h2>Detales</h2>
					{detales && content}
				</div>
			</div>
		</div>)
})
export default Detales;
