import React from "react";
import Link from 'next/link';

const Subnav = () => {
	return (
		<ul>
			<li>
				<Link href={ "/main" }>
					Posts
				</Link>
			</li>
			<li>
				<Link href={ "/main/cabinet" }>
					Cabinet
				</Link>
			</li>
			<li>
				<Link href={ "/main/newpost" }>
					Add New Post
				</Link>
			</li>
		</ul>)
}

export default Subnav;
