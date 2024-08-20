import { useEffect, useState } from 'react';
import axios from 'axios';
import './FollowRecomendations.css';

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
	}, [props.posts]);
	console.log(recomendations);

	const follow = (id) => {
		axios
			.post('https://akademia108.pl/api/social-app/follows/follow', {
				leader_id: id,
			})
			.then(() => {
				props.getLatestPosts();
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<div className='followRecomendations'>
			{recomendations.map((recomendation) => {
				return (
					<div className='followRecomendation' key={recomendation.id}>
						<img
							src={recomendation.avatar_url}
							alt={recomendation.username}
						></img>
						<h3>{recomendation.username}</h3>
						<button className='btn' onClick={() => follow(recomendation.id)}>
							Follow
						</button>
					</div>
				);
			})}
		</div>
	);
};
export default FollowRecomendations;
