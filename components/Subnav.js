import Link from 'next/link';

const Subnav = () => {
	return (
		<ul>
			<li>
				<Link href="/main/">
					<a>Posts</a>
				</Link>
			</li>
			<li>
				<Link href="/main/cabinet">
					<a>Cabinet</a>
				</Link>
			</li>
			<li>
				<Link href="/main/newpost">
					<a>Add New Post</a>
				</Link>
			</li>
		</ul>)
};
export default Subnav;
