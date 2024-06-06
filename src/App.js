import axios from "axios";
import { useRef, useState } from "react";
import { Badge, Col, Container, Form, Row } from "react-bootstrap";
import { useWindowSize } from 'react-use'; //comprehensive collection of custom React Hooks
import Confetti from 'react-confetti';

const App = () => {
	const { width, height } = useWindowSize()
	const [posts, setPosts] = useState([]);
	const serchRef = useRef("");
	const cancelCountRef = useRef(0);
	let requestToken;
	let controller;

	/**
	 * 
	 * Method 1
	 * 
	 * Using axios's own promise, .then, .catch, and .finally
	 * Using AbortController for the request abort (signal to cancel the requests)
	 * Starting from v0.22.0 Axios supports AbortController to cancel requests in fetch API way
	 */
	const handleChange = (e) => {
		const {value} = e.target;
		if(controller){
			controller.abort()
		}
		controller = new AbortController();
		
		axios.get(`https://jsonplaceholder.typicode.com/posts?q=${value.trim()}`, {
			signal: controller.signal
		})
		.then(response => {
				if(value.trim() !== ""){
					setPosts(response.data);
				}else{
					setPosts([]);
				}
			})
			.catch(err => {
				if (axios.isCancel(err)) { // Differentiate real and intentional error
					console.log("Request Cancelled:", err.message);
					cancelCountRef.current += 1;
				} else {
					console.log(err);
				}
			})
			.finally(() => {
				// console.log('Request completed, regardless of success or failure.');
			});
	}

	/**
	 * 
	 * Method 2
	 * 
	 * Using axios's own promise, .then, .catch, and .finally
	 * Using CancelToken.source factory from axios itself to cancel the requests
	 */
	const handleChange2 = (e) => {
		const {value} = e.target;

		if(requestToken){
			requestToken.cancel("Operation Aborted - Method 2 !!!");
		}
		requestToken = axios.CancelToken.source();
		
		axios.get(`https://jsonplaceholder.typicode.com/posts?q=${value}`, {
			cancelToken: requestToken.token
		})
		.then(response => {
			setPosts(response.data);
		})
		.catch(err => {
			if (axios.isCancel(err)) { // Differentiate real and intentional error
				console.log("Request Cancelled:", err.message);
				cancelCountRef.current += 1;
			} else {
				console.log(err);
			}
		})
		.finally(() => {
			// console.log('Request completed, regardless of success or failure.');
		});
	}

	/**
	 * 
	 * Method 3 - Using async/await along with normal try, catch and finally
	 */
	const handleChange3 = async (e) => {
		const {value} = e.target;
		
		if(requestToken){
			requestToken.cancel("Operation Aborted - Method 3 !!!");
		}
		requestToken = axios.CancelToken.source();

		try{
			const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?q=${value}`, {
				cancelToken: requestToken.token
			});
			setPosts(response.data);
		}
		catch (err) {
			if (axios.isCancel(err)) { // Differentiate real and intentional error
				console.log("Request Cancelled:", err.message);
				cancelCountRef.current += 1;
			} else {
				console.log(err);
			}
		}
		finally {
			// console.log("Always executed!");
		}
	}

	// This is useful for cancelling any ongoing requests when the component unmounts or user leaves the page.
	// useEffect(() => {
	// 	return () => {
	// 		console.log("Unmounting!!!");
	// 		if (requestToken) {
	// 			requestToken.cancel("Component Unmounted!!!");
	// 		}
	// 	}
	// }, [])

	return (
		<div>
			{/* Not a big deal, Just tested react-confetti here! 😃 */}
			<Confetti
				width={width}
				height={height}
				recycle={false} 
				gravity={0.3}
				// tweenDuration={10000}
				// confettiSource={{x:0, y:0}}
				initialVelocityX={10}
			/>

			<Container className="mt-4">
				<h1>Axios Request Cancel Demo</h1>
				<Form>
					<Form.Group className="mb-3" controlId="search">
						<Form.Label>Search</Form.Label>
						<Form.Control type="text" placeholder="Type something" onChange={handleChange} autoComplete="off" ref={serchRef}/>
					</Form.Group>
				</Form>

				{<p>Number of canceled requests: {cancelCountRef.current}</p>}
				<Row>
					{!!posts.length &&
					<>
						{<p>Results for <b>{serchRef.current.value}</b> ({posts.length} item/s)</p>}
						{posts.map(post => (
							<Col key={post.id}>
								<Badge bg="secondary">{post.title}</Badge>
							</Col>
						))}
					</>
				}
				</Row>
				{posts.length === 0 && <p>No data to display.</p>}
			</Container>
		</div>
	);
}

export default App;
