const { Project } = require("../models");

const moment = require('moment');


exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('department');
        const formattedProjects = projects.map(project => ({
            _id: project._id,
            name: project.name,
            description: project.description,
            startDate: moment(project.startDate).format('DD/MM/YYYY'),
            type: project.type,
            departmentId: project.department._id,
            departmentName: project.department.name
        }));
        res.json(formattedProjects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createProject = async (req, res) => {
    const { name, description, startDate, type, department } = req.body;

    const project = new Project({
        name,
        description,
        startDate: moment(startDate, 'DD/MM/YYYY').toDate(),
        type,
        department,
    });

    try {
        const newProject = await project.save();
        const populatedProject = await Project.findById(newProject._id).populate('department');
        res.status(201).json({
            name: populatedProject.name,
            description: populatedProject.description,
            startDate: populatedProject.startDate,
            type: populatedProject.type,
            department: populatedProject.department._id,
            _id: populatedProject._id,
            createdAt: populatedProject.createdAt,
            updatedAt: populatedProject.updatedAt,
            __v: populatedProject.__v
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};