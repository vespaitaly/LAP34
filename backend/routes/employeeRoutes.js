const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/:dept', employeeController.getEmployeesByDepartment);

module.exports = router;
