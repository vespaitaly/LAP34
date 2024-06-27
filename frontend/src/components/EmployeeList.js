import React, { useEffect, useState } from 'react';
import { getEmployeesByDepartment } from '../api';
import { useParams, Link } from 'react-router-dom';

const EmployeeList = ({ token }) => {
    const { dept } = useParams();
    const [employees, setEmployees] = useState([]);
    const [departmentName, setDepartmentName] = useState('');

    useEffect(() => {
        if (token) {
            getEmployeesByDepartment(dept, token).then(response => {
                setEmployees(response.data);
                if (response.data && response.data.length > 0 && response.data[0].department) {
                    setDepartmentName(response.data[0].department.name);
                }
            }).catch(error => {
                console.error('Failed to fetch employees:', error);
            });
        }
    }, [dept, token]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="mb-4">List of Employees</h1>
                    <h3>Department: {departmentName}</h3>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Employee name</th>
                                <th>Date of birth</th>
                                <th>Gender</th>
                                <th>Position</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(employee => (
                                <tr key={employee._id}>
                                    <td>{employee._id}</td>
                                    <td>{employee.name}</td>
                                    <td>{new Date(employee.dob).toLocaleDateString()}</td>
                                    <td>{employee.gender}</td>
                                    <td>{employee.position}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Link to="/" className="btn btn-primary mt-3">Home page</Link>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
