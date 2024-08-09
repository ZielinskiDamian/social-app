import { useState } from 'react';
import './Login.css';
const Login = () => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const handleInputChange = (e) => {
		const target = e.target;
		const name = target.name;

		setFormData({ ...formData, [name]: target.value });
	};

	return (
		<div className='login'>
			<form>
				<input
					type='text'
					name='username'
					placeholder='Username'
					value={formData.username}
					onChange={handleInputChange}
				></input>
				<input
					type='password'
					name='password'
					placeholder='Password'
					value={formData.password}
					onChange={handleInputChange}
				></input>
				<button className='btn'>Login </button>
			</form>
		</div>
	);
};
export default Login;
