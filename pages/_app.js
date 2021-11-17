import { useEffect } from 'react';
import Cov from '../store/covStore';
import '../styles/global.css';
export default function App({ Component, pageProps }) {
	useEffect(() => {
		if (Cov.getData().length == 0) Cov.getCovData();
	},[])
	return (<Component { ...pageProps } />)
}
