import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';

import LandingPage from './pages/registration/Phone';
import NumConfirm from './pages/registration/Confirmation';
import Email from './pages/registration/Email';

function App()
{
	return (
		<Router>
			<Navbar/>

			<Routes>
				<Route path = "/" element = {<LandingPage/>}/>
				<Route path = "/confirm" element = {<NumConfirm/>}/>
				<Route path = "/email" element = {<Email/>}/>
			</Routes>
		</Router>
	)
}

export default App;