import { useEffect, useState } from 'react';
import './styles/JobSearch.scss';
import axios from 'axios';

import JobSearchCard from '../components/JobSearchCard';
import SearchBar from '../components/SearchBar';

export default function JobSearch(props) {
	const [query, setQuery] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState({});

	const jobs = searchResults.jobs.map(item => {
		return (
			<div>
				<p>{item.job_title}</p>
			</div>
		);
	});
	const gigs = searchResults.gigs.map(item => {
		return (
			<div>
				<p>{item.job_title}</p>
			</div>
		);
	});

	useEffect(() => {
		const results = axios
			.get('/api/search/query', {
				params: {
					queryString: searchTerm,
				},
			})
			.then(res => {
				setSearchResults(res.data);
				return;
			})
			.catch(err => console.log(err));
	}, [searchTerm]);

	// useEffect(() => {
	// 	const results = axios
	// 		.get('/api/search/city', {
	// 			params: {
	// 				city: 'Toronto',
	// 			},
	// 		})
	// 		.then(res => {
	// 			console.log(res.data);
	// 			return res.data;
	// 		})
	// 		.catch(err => console.log(err));
	// });

	// useEffect(() => {
	// 	axios
	// 		.get('/api/search/type', {
	// 			params: {
	// 				type: 'Part-time',
	// 			},
	// 		})
	// 		.then(res => {
	// 			console.log(res.data);
	// 		})
	// 		.catch(err => console.log(err));
	// });

	return (
		<div className='jobsearch-content'>
			<h1>Job Search Page</h1>
			<SearchBar
				state={query}
				onChange={e => setQuery(e.target.value)}
				onSubmit={() => setSearchTerm(query)}
			/>
			<h1>Jobs:</h1>
			{searchResults.jobs && <div>{jobs}</div>}
			<h1>Gigs:</h1>
			{searchResults.jobs && <div>{gigs}</div>}
		</div>
	);
}
