import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';

import LandingPage from './pages/registration/Phone';
import Confirm from './pages/registration/Confirmation';
import Email from './pages/registration/Email';
import Personal from './pages/registration/Personal';

function App()
{
	return (
		<Router>
			<Navbar/>

			<Routes>
				<Route path = "/" element = {<LandingPage/>}/>
				<Route path = "/confirm" element = {<Confirm/>}/>
				<Route path = "/email" element = {<Email/>}/>
				<Route path = "/personal" element = {<Personal/>}/>
			</Routes>
		</Router>
	)
}

export default App;