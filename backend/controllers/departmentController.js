const { Department } = require("../models");

exports.getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createDepartment = async (req, res) => {
    const { name } = req.body;

    const department = new Department({
        name,
    });

    try {
        const newDepartment = await department.save();
        res.status(201).json(newDepartment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
