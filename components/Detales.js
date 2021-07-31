import { useEffect, useState } from 'react';
import { autorun } from 'mobx';
import {observer} from 'mobx-react-lite';
import LiDate from './Lidate.js';
import Cov from '../store/covStore.js';
import User from '../store/userStore.js';
import DetalesStyle from '../styles/detales.module.css';

const Detales = observer(() => {
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
	let innerStyle = detales ? `${DetalesStyle.inner} ${DetalesStyle.active}` : `${DetalesStyle.inner}`;
	let content;
	if (detales && detales.cases) {
		content = <ul>
					<LiDate detales={{span: 'Country', info: detales.country, simpleLi: true}}/>
					<LiDate detales={{detales, inter: false, simpleLi: false}} />
					<LiDate detales={{span: 'Population', info: detales.population, simpleLi: true}}/>
					<LiDate detales={{span: 'New Cases', info: detales.cases.new, simpleLi: true}}/>
				</ul>
		}
	if (Cov.getState() === 'error') {
		content = <ul>
					<LiDate detales={{detales, inter: true, simpleLi: false}}/>
				</ul>
		return (
			<div className={DetalesStyle.outer}>
				<div className={innerStyle}>
					<button onClick={toggle}>Close</button>
					<h3 className='flex f-center f-column'>{Cov.getError()}</h3>
					{content}
				</div>
			</div>)
		}
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
})
export default Detales;
