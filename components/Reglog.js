import React from "react";
import Link from 'next/link';

const Reglog = () => {
	let token = true;
	return (
		<>
			{ token
				? (<div>
					<Link href={ "/login" }>Login</Link>
					<Link href={ "/register" }>Register</Link>
				</div>)
				: (<div>
					<Link href={ "/main/content/cabinet" }>Cabinet</Link>
					<span>Exit</span>
				</div>)
			}
		</>
	);
}

export default Reglog;
