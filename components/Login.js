import React, { useState } from 'react';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';
// import { toJS } from 'mobx';
import PureInput from './Pureinput.js';
import User from '../store/userStore.js';

// @todo Investigate what was the purpose

const Login = observer(() => {
	const initState = {
		login: '',
		password: ''
	};
	const [ inputs, setInputs ] = useState(initState);
	const handleInput = (e) => {
		const { name, value } = e.target;
		setInputs({...inputs, [name]:value})
	};
	const submitForm = (e) => {
		e.preventDefault();
		console.log(inputs);
		// setInputs(initState);
		User.setUserName(inputs.login);
	}
	const getUserLogin = () => {
		const name = User.getUserName();
		setInputs({ ...inputs, login: name });
	}
	/*if (User.isLogin) {
		setInputs(initState);
		return <Redirect to="/cabinet" />;
	}
	if (User.state === "InProcess") {
		return <h2>Loading...</h2>
	}*/
	return (
		<div className="flex f-center f-column">
			<h1>Login</h1>
			<div className="formWrap">
				<form onSubmit={ submitForm } className="flex f-column">
					<PureInput
						inputType="text"
						inputName="login"
						placeholder="Type Your Login here..."
						inputFunc={ handleInput }
						val={ inputs.login }
					/>
					<PureInput
						inputType="password"
						inputName="password"
						placeholder="Type Your Password here..."
						inputFunc={ handleInput }
						val={ inputs.password }
					/>
					<div className="btnBlock flex">
						<input
							type="submit"
							name="submit"
							value="Log In"
						/>
						<input
							type="reset"
							name="reset"
							value="Clear Form"
							onClick={ () => setInputs(initState) }
						/>
					</div>
				</form>
				<div className="btnBlock flex">
					<span>Have no account?</span>
					<Link href={ "/register" }>Register</Link>
				</div>
			</div>
			<input
				type='button'
				value='get login'
				onClick={ getUserLogin }
			/>
		</div>
	)
});

export default Login;
