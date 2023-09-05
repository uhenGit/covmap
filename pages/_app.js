import { useEffect } from 'react';
import covid from '../store/covStore';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
	useEffect(() => {
		if (covid.covidData.length == 0) {
      covid.getCovidData();
    }
	},[]);

	return (<Component { ...pageProps } />)
}
