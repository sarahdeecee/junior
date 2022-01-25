import axios from 'axios';
const { useState, createContext, useEffect, useMemo } = require('react');

const UserContext = createContext();

const UserProvider = function (props) {
	const [currentUser, setCurrentUser] = useState({});
	const [savedJobsGigs, setSavedJobsGigs] = useState({});
	const [profileView, setProfileView] = useState('projects');

	useEffect(() => {
		axios
			.post('/api/auth/check')
			.then(res => {
				// console.log(
				// 	res.data,
				// 	'successfully retrieved cookie FROM USER PROVIDER'
				// );
				setCurrentUser(prev => res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		if (currentUser) {
			axios
				.get(`/api/save/${currentUser.id}`)
				.then(res => {
					setSavedJobsGigs(res.data);
				})
				.catch(err => {
					console.log(err);
				});
		}
	}, [currentUser, setSavedJobsGigs]);

	const value = useMemo(() => ({
		currentUser,
		setCurrentUser,
		savedJobsGigs,
		setSavedJobsGigs,
		profileView,
		setProfileView,
	}));

	return (
		<UserContext.Provider value={value}>{props.children}</UserContext.Provider>
	);
};

export { UserProvider, UserContext };
