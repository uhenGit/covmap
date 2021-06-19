import { useState, useEffect } from 'react';
import Cov from '../store/covStore.js';

const LiDate = (props) => {
	const [inputType, setType] = useState('text');
	const [val, setVal] = useState(props.detales.day);
	const setCovDate = e => {
		Cov.getCovDataByDay(props.detales.country, e.target.value);
		setVal(e.target.value);
	}
	return (
		<li><span>Date </span><input type={inputType} onFocus={() => setType('date')} onBlur={() => setType('text')} value={val} onChange={setCovDate}/></li>
	)
}
export default LiDate
