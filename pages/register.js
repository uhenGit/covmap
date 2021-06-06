import { useState } from 'react';
import Link from 'next/link';
import Headblock from '../components/Headblock.js';
// import { toJS } from 'mobx';
// import { observer } from 'mobx-react-lite';
import PureInput from '../components/Pureinput.js';
// import User from '../../store/user.js';
// import { useContextProvider } from '../store/context.js';
import formStyles from '../styles/form.module.css';

const Register = () => {
	const initState = {
		email: '',
		firstName: '',
		lastName: '',
		login: '',
		password: '',
		confirmPass: ''
	};
	const [status, setStatus] = useState('');
    const [inputs, setInputs] = useState(initState);
    /*const contextStore = useContextProvider();
    console.log(contextStore.data1);*/
    /*useEffect(() => {
		setStatus(User.state);
    }, [User.state]);*/
	const handleInput = (e) => {
		const { name, value } = e.target;
		setInputs({...inputs, [name]:value})
	};
    const submitForm = e => {
    	e.preventDefault();
    	console.log(inputs);
    	setInputs(initState);
    	// User.registerUser(inputs);    	
    }
    /*if (toJS(User.user).msg) {
    	clearForm();
    	return <Redirect to="/login" />;
    }
    if (status === "InProcess") {
    	return <h2>Loading...</h2>
    }*/
    const wrapStyle = `${formStyles.wrap} flex f-center f-column`;
    return (
        <div className={wrapStyle}>
    		<Headblock title={'Register'} />
            <div className={formStyles.formWrap}>
                <form onSubmit={submitForm} className="flex f-column">
                	<PureInput inputType="text" inputName="email" placeholder="Input Your email here..." inputFunc={handleInput} val={inputs.email} />
                	<PureInput inputType="text" inputName="firstName" placeholder="Type Your First Name here..." inputFunc={handleInput} val={inputs.firstName}/>
                	<PureInput inputType="text" inputName="lastName" placeholder="Type Your Last Name here..." inputFunc={handleInput} val={inputs.lastName}/>
                	<PureInput inputType="text" inputName="login" placeholder="Type Your Login here..." inputFunc={handleInput} val={inputs.login}/>
                    <PureInput inputType="password" inputName="password" placeholder="Type Your Password here..." inputFunc={handleInput} val={inputs.password}/>
                    <PureInput inputType="password" inputName="confirmPass" placeholder="Confirm Your Password" inputFunc={handleInput} val={inputs.confirmPass}/>
                    <div className="btnBlock flex">
                        <input type="submit" name="submit" value="Register" />
                        <input type="reset" onClick={() => setInputs(initState)} name="reset" value="Clear Form" />
                    </div>
                </form>
                <div className="btnBlock flex">
                	<span>Allready have an account?</span>
                    <Link href="/login">Log In</Link>
                </div>
            </div>
        </div>
	)
}
export default Register;
