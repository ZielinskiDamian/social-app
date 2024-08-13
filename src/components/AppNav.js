import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './AppNav.css';
const AppNav = (props) => {
	const handleLogout = (e) => {
		e.preventDefault();
		axios
			.post('https://akademia108.pl/api/social-app/user/logout')
			.then((res) => {
				console.log(res.data);
				if (res.data.message) {
					props.setUser(null);
					localStorage.setItem('user', null);
				}
			})
			.catch((error) => {
				props.setUser(null);
				localStorage.setItem('user', null);
				console.error(error);
			});
	};
	return (
		<nav className='mainNav'>
			<ul>
				<li>
					<NavLink to='/'>Home</NavLink>
				</li>
			</ul>
			<ul>
				{!props.user && (
					<li>
						<NavLink to='/login'>Login</NavLink>
					</li>
				)}
			</ul>
			<ul>
				{!props.user && (
					<li>
						<NavLink to='/signup'>SignUp</NavLink>
					</li>
				)}
			</ul>
			<ul>
				{props.user && (
					<li>
						<NavLink
							to='/' onClick={handleLogout}
						>
							Logout
						</NavLink>
					</li>
				)}
			</ul>
		</nav>
	);
};
export default AppNav;
