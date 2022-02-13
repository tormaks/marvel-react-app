import ErrorMessage from '../errorMessage/ErrorMessage';
import {useNavigate} from 'react-router-dom';

const Page404 = () => {
	const navigate = useNavigate();

	return (
		<div>
			<ErrorMessage/>
			<p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
			<button style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'margin': '30px auto 0 auto'}}
				onClick={() => navigate(-1)}>Back to main page</button>
		</div>
	)
}

export default Page404;