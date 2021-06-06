import Link from 'next/link';
import { useEffect } from 'react';
import Headblock from '../components/Headblock.js';
import Header from '../components/Header.js';
import Content from '../components/Content.js';
import Footer from '../components/Footer.js';
import Cov from '../store/covStore.js';
import styles from '../styles/main.module.css';

const IndexPage = () => {
	useEffect(() => {
		Cov.getCovData();
	}, []);
	return (
		<div>
			<Headblock title={'Next Chris Project'} />
			<Header />
			<Content />
			<Footer />
		</div>
)};
export default IndexPage;
