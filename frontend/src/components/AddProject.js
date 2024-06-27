import React, { useState, useEffect } from 'react';
import { createProject, getDepartments } from '../api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AddProject = ({ token }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [type, setType] = useState('');
    const [department, setDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            getDepartments(token)
                .then(response => {
                    setDepartments(response.data);
                })
                .catch(error => {
                    setError('Failed to load departments');
                });
        }
    }, [token]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        if (!name.trim()) {
            setError('Project name is required');
            return;
        }

        createProject({ name, description, startDate, type, department }, token)
            .then(response => {
                if (response && response.data) {
                    navigate('/');
                }
            })
            .catch(error => {
                setError('Failed to create project');
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center">
                            <h3>Add a new Project</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Project name <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Start date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Type</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Department</label>
                                    <select
                                        className="form-control"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Department</option>
                                        {departments.map(dept => (
                                            <option key={dept._id} value={dept._id}>{dept.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-3">Create</button>
                                {error && <p className="text-danger mt-3">{error}</p>}
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <Link to="/">Home page</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProject;
