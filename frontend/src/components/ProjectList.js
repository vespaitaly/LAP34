import React, { useEffect, useState } from 'react';
import { getProjects } from '../api';
import { Link } from 'react-router-dom';

const ProjectList = ({ token }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (token) {
            getProjects(token).then(response => {
                setProjects(response.data);
            });
        }
    }, [token]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="mb-4">List of Projects</h1>
                    <Link to="/projects/add" className="btn btn-primary mb-3">Add new Project</Link>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Project name</th>
                                <th>Description</th>
                                <th>Start date</th>
                                <th>Type</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map(project => (
                                <tr key={project._id}>
                                    <td>{project._id}</td>
                                    <td><Link to={`/employees/${project.departmentId}`}>{project.name}</Link></td>
                                    <td>{project.description}</td>
                                    <td>{project.startDate}</td>
                                    <td>{project.type}</td>
                                    <td>{project.departmentName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProjectList;
