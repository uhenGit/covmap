import React, { useState } from 'react';
import  Link from 'next/link';
import Headblock from '../components/Headblock.js';
import { observer } from 'mobx-react-lite';
import PureInput from '../components/Pureinput.js';
// import User from '../store/userStore.js';
import formStyles from '../styles/form.module.css';

// @todo Define what  is the better way to login/register (page or component) and what was the purpose

const Login = observer((props) => {
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
		setInputs(initState);
	}
	/*if (User.isLogin) {
		setInputs(initState);
		return <Redirect to="/cabinet" />;
	}
	if (User.state === "InProcess") {
		return <h2>Loading...</h2>
	}*/
	const wrapStyle = `${formStyles.wrap} flex f-center f-column`;
	return (
		<div className={wrapStyle}>
			<Headblock title={ 'Login' } />
			<div className={formStyles.formWrap}>
				<form onSubmit={submitForm} className="flex f-column">
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
		</div>
	)
});

export default Login;
