import { useState } from 'react';

// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';

import './App.css';
import MainLayout from './layouts/main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainLayout />}>
						LOAD CONTENT
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
