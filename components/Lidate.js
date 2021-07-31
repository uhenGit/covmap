import { useState } from 'react';
import Cov from '../store/covStore.js';

const LiDate = (props) => {
	const data = props.detales;
	if (data.simpleLi) {
		return (<li><span>{data.span}</span><span>{data.info}</span></li>)
	}
	const [inputType, setType] = useState('text');
	const [val, setVal] = useState(data.detales.day);
	const setCovDate = e => {
		Cov.getCovDataByDay(data.detales.country, e.target.value);
		setVal(e.target.value);	
	}
	let msg = data.inter ? 'Try another date ' : 'Date ';
	return (
		<li><span>{msg}</span><input type={inputType} onFocus={() => setType('date')} onBlur={() => setType('text')} value={val} onChange={setCovDate}/></li>
	)
}
export default LiDate
