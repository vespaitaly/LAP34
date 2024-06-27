const { Employee } = require("../models");

const moment = require('moment');

exports.getEmployeesByDepartment = async (req, res) => {
    try {
        const employees = await Employee.find({ department: req.params.dept });
        const formattedEmployees = employees.map(employee => ({
            _id: employee._id,
            name: employee.name,
            dob: moment(employee.dob).format('DD/MM/YYYY'),
            gender: employee.gender,
            position: employee.position
        }));
        res.json(formattedEmployees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};