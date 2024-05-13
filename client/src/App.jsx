import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './routes/Home';
import CustDetails from './routes/CustDetails';
import CustUpdate from './routes/CustUpdate';

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/custdetails/:id" element={<CustDetails />} />
                    <Route path="/customers/:id/update" element={<CustUpdate />} />
                </Routes>
            </Router>
        </div>
    );
}


export default App 