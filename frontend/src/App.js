import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ProjectList from './components/ProjectList';
import EmployeeList from './components/EmployeeList';
import AddProject from './components/AddProject';

const App = () => {
    const [token, setToken] = useState('');

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/register" element={<Register />} />
                {token ? (
                    <>
                        <Route path="/" element={<ProjectList token={token} />} />
                        <Route path="/employees/:dept" element={<EmployeeList token={token} />} />
                        <Route path="/projects/add" element={<AddProject token={token} />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </Router>
    );
};

export default App;
