import { useEffect, useState } from 'react';
import axios from 'axios';

const FollowRecomendations = (props) => {
	const [recomendations, setRecomendations] = useState([]);

	const getRecomendations = () => {
		axios
			.post('https://akademia108.pl/api/social-app/follows/recommendations')
			.then((res) => {
				setRecomendations(res.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		getRecomendations();
	}, []);

	return <div className='followRecomendations'>Follow</div>;
};
export default FollowRecomendations;
