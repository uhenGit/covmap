import Link from 'next/link';
import navStyle from '../styles/nav.module.css';


const Nav = () => {
	return (
		<nav className={navStyle.navUl}>
			<ul className='flex'>
				<li>
					<Link href="/">
						<a>Home Page</a>
					</Link>
				</li>
				<li>
					<Link href="/about">
						<a>About Page</a>
					</Link>
				</li>
				<li>
					<Link href="/contacts">
						<a>Contact Page</a>
					</Link>
				</li>
			</ul>
		</nav>
	)
};
export default Nav;
