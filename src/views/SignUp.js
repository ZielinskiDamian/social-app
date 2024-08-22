import './SignUp.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
const SignUp = (props) => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmpassword: '',
	});

	const [errors, setErrors] = useState({
		username: '',
		email: '',
		password: '',
		confirmpassword: '',
	});
	const [signUpMessage, setSignUpMessage] = useState('');
	const [signUpDone, setSignUpDone] = useState(false);

	const validate = () => {
		let validationErrors = {
			username: false,
			email: false,
			password: false,
			confirmpassword: false,
		};
		// username
		if (formData.username.trim().length < 4) {
			validationErrors.username = true;
			setErrors((prevErrors) => {
				return {
					...prevErrors,
					username: 'Username should have at least 4 characters',
				};
			});
		} else if (!/^[^\s]*$/.test(formData.username.trim())) {
			validationErrors = true;
			setErrors((prevErrors) => {
				return {
					...prevErrors,
					username: 'Username should have empty characters',
				};
			});
		} else {
			validationErrors.username = false;
			setErrors((prevErrors) => {
				return {
					...prevErrors,
					username: '',
				};
			});
		}
		// mail
		if (/^[-\w]+@([-\w]+\.)+[a-z]+$/i.test(formData.email.trim())) {
			validationErrors.email = true;
			setErrors((prevErrors) => {
				return {
					...prevErrors,
					email: 'there is no vaild email',
				};
			});
		} else {
			validationErrors.email = false;
			setErrors((prevErrors) => {
				return {
					...prevErrors,
					email: '',
				};
			});
		}
		// password
		if (formData.password.trim().length < 6) {
			validationErrors.password = true;
			setErrors((prevErrors) => {
				return {
					...prevErrors,
					password: 'Password should have at least 6 characters',
				};
			});
		} else if (!/^[^\s]*$/.test(formData.password.trim())) {
			validationErrors.password = true;
			setErrors((prevErrors) => {
				return {
					...prevErrors,
					password: 'Password should have empty characters',
				};
			});
		} else if (
			!/[!@#$%^&*()_+\-=[\]]{};':"\\|,.<>/?.test(formData.password.trim())
		) {
			validationErrors.password = true;
			setErrors((prevErrors) => {
				return {
					...prevErrors,
					password: 'Password must contain one of chart: !@#$',
				};
			});
		} else {
			validationErrors.password = false;
			setErrors((prevErrors) => {
				return {
					...prevErrors,
					password: '',
				};
			});
		}
		// confirm password
		if (formData.password.trim() !== formData.confirmpassword.trim()) {
			validationErrors.confirmpassword = true;
			setErrors((prevErrors) => {
				return {
					...prevErrors,
					confirmpassword: 'Password must be the same',
				};
			});
		} else {
			validationErrors.confirmpassword = false;
			setErrors((prevErrors) => {
				return {
					...prevErrors,
					confirmpassword: '',
				};
			});
		}
		return (
			!validationErrors.username &&
			!validationErrors.email &&
			!validationErrors.password &&
			!validationErrors.confirmpassword
		);
	};

	const handleInputChange = (e) => {
		const target = e.target;
		const name = target.name;

		setFormData({ ...formData, [name]: target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validate()) {
			return;
		}

		axios
			.post('https://akademia108.pl/api/social-app/user/signup', {
				username: formData.username,
				email: formData.email,
				password: formData.password,
			})
			.then((res) => {
				console.log(res.data);
				let resData = res.data;
				if (resData.signeup) {
					setSignUpMessage('Acount Create');
					setSignUpDone(true);
				} else {
					if (resData.message.username) {
						setSignUpMessage(resData.message.username[0]);
					} else if (resData.message.email) {
						setSignUpMessage(resData.message.email[0]);
					}
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};
	return (
		<div className='signUp'>
			{props.user && <Navigate to='/' />}
			<form onSubmit={handleSubmit}>
				{signUpMessage && <h2>{signUpMessage}</h2>}
				<input
					type='text'
					name='username'
					placeholder='user name'
					onChange={handleInputChange}
				></input>
				{errors.username && <p>{errors.username}</p>}
				<input
					type='email'
					name='email'
					placeholder='email'
					onChange={handleInputChange}
				></input>
				{errors.email && <p>{errors.email}</p>}
				<input
					type='password'
					name='password'
					placeholder='password'
					onChange={handleInputChange}
				></input>
				{errors.password && <p>{errors.password}</p>}
				<input
					type='password'
					name='confirmpassword'
					placeholder='Confirm password'
					onChange={handleInputChange}
				></input>
				{errors.confirmpassword && <p>{errors.confirmpassword}</p>}
				<button className='btn' disabled={signUpDone}>
					Sign UP
				</button>
				{signUpDone && (
					<div>
						<link to='/login' className='btn'>
							Go to login
						</link>
					</div>
				)}
			</form>
		</div>
	);
};
export default SignUp;
