import Link from 'next/link';
import Nav from './Nav.js';
// import Reglog from './Reglog.js';

import headerStyle from '../styles/header.module.css';
const Header = () => {
	return (
		<header>
			<div className={headerStyle.topBlock}>
				<div>
					<Link href="/">
						<a>
							<img src="#" alt="logo" />
							<span>LOGO</span>
						</a>
					</Link>
				</div>
				{/* <Reglog /> */}
			</div>
			<Nav />
		</header>
	);
};
export default Header;
