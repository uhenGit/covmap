import Link from 'next/link';

const Reglog = () => {
	let token = true;
	return (
		<>
		{ token ? (
			<div>
				<Link href="/login"><a>Login</a></Link>
				<Link href="/register"><a>Register</a></Link>
			</div>):
			(
			<div>
				<Link href="/main/content/cabinet"><a>Cabinet</a></Link>
				<span>Exit</span>
			</div>
			)}
		</>
	);
};
export default Reglog;
