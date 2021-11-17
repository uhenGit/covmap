import { useState } from 'react';
import { useMediaQ } from './hooks/useMediaQuery';
import Navblock from './Navblock.js';
import NavStyle from '../styles/nav.module.css';


export default function Nav() {
	let navcss;
	const [showMobile, setMobile] = useState(false);
	let isMobile = useMediaQ('(max-width: 768px)');
	if (isMobile && !showMobile) {
		navcss = NavStyle.navUl;
	} else {
		navcss = NavStyle.navUl + ' ' + NavStyle.show;
	}
	return (
		<div className={NavStyle.mainWrap}>
			{isMobile ? (<div className={NavStyle.lineWrap}>
				<span className={NavStyle.line} onClick={() => setMobile(!showMobile)}></span>
			</div>) : null}
			<nav className={navcss}>
				<Navblock isMobile={isMobile}/>
			</nav>
		</div>
	)
};
