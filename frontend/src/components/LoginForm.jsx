import './styles/LoginForm.scss';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

export default function Login(props) {
	const { handleLoginView } = props;
	// // FOR EXAMPLE LOGIN FUNCTIONALITY
	// const {currentUser, setCurrentUser} = useState();

	// // EXAMPLE
	// useEffect(() => {
	//   axios.get("/api/candidates").then(res => {
	//     setCandidates(res.data);
	//   });
	// }, []);

	// // EXAMPLE LOGIN FUNCTIONALITY
	const login = e => {
		e.preventDefault();

		const data = {
			email: document.getElementById('email').value,
			password: document.getElementById('password').value,
		};

		console.log(data);

		axios
			.post('/api/login', data)
			.then(res => {
				// setCurrentUser(res.data);
				console.log(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div className='login-content'>
			<form className='login' onSubmit={login}>
				<h1>Login:</h1>
				<TextField id='email' label='email' variant='outlined' />
				<TextField
					id='password'
					sx={{ mt: '1rem' }}
					label='password'
					variant='outlined'
				/>
				<div>
					<Button variant='contained' size='large' type='submit'>
						LOG IN
					</Button>
					<Button
						id='cancelLogin'
						variant='contained'
						size='large'
						onClick={handleLoginView}
					>
						Cancel
					</Button>
				</div>
			</form>
		</div>
	);
}