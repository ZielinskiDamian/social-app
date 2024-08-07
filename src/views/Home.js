import axios from 'axios';
import { useEffect, useState } from 'react';
import Post from '../components/Post';

const Home = () => {
	const [posts, setPosts] = useState([]);
	const getLatestPosts = (res) => {
		axios
			.post('https://akademia108.pl/api/social-app/post/latest')
			.then((res) => {
				setPosts(res.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		getLatestPosts();
	}, []);
	console.log(posts);
	return (
		<div>
			<h2>Home</h2>
			<div className='postList'>
				{posts.map((post) => {
					return <Post post={post} key={post.id} />
				})}
			</div>
		</div>
	);
};
export default Home;
