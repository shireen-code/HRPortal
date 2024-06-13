import express from 'express';
import { Employee } from '../models/employeeModel.js';

const router = express.Router();



// Route for Save a new Employee
router.post('/', async (req, res) => {
  try {
    const { name, id, startDate, contractType, dependents} = req.body;

    if (!name || !id || !startDate || !contractType || !dependents) {
      return res.status(400).send({
        message: 'Send all required fields: name, id, startDate, contractType',
      });
    }

    const dependentsList = dependents.map(dependent => ({
      name: dependent.name,
      relationship: dependent.relationship,
      // Add any other dependent details you might have
    }));

    const newEmployee = {
      name,
      id,
      startDate,
      contractType,
      dependents: dependentsList
    };

    const employee = await Employee.create(newEmployee);

    return res.status(201).send(employee);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


// Route for Get All Employees from database
router.get('/', async (request, response) => {
  try {
    // Retrieve all employees from the database
    const employees = await Employee.find({});

    // Calculate benefits cost and net salary for each employee
    const employeesWithDetails = employees.map(employee => {
      // Calculate the annual salary (default to $2000 per paycheck)
      const annualSalary = employee.salary || 2000 * 26;

      // Calculate the total cost of benefits
      let employeeCost = 1000;
      let dependentCost = 500;
      let totalBenefitsCost = employeeCost;
      employee.dependents.forEach(dependent => {
        if (typeof dependent === 'string' && dependent.startsWith('A')) {
          totalBenefitsCost += dependentCost * 0.9;
        } else {
          totalBenefitsCost += dependentCost;
        }
      });

      // Calculate the net salary
      const netSalary = annualSalary - totalBenefitsCost;

      // Calculate the per paycheck net salary
      const perPaycheckNetSalary = (netSalary / 26).toFixed(2);

      // Return employee details along with calculated fields
      return {
        ...employee.toObject(),
        totalBenefitsCost,
        netSalary,
        perPaycheckNetSalary
      };
    });

    return response.status(200).json({
      count: employeesWithDetails.length,
      data: employeesWithDetails
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const employee = await Employee.findById(id);

    return response.status(200).json(employee);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
// Route for Get One Employee from database by id
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Employee.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Employee not found' });
    }

    return response.status(200).send({ message: 'Employee updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Delete Employee by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).send({ message: 'Employee not found' });
    }

    return res.status(200).send({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
router.post('/:id/dependents', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, relationship } = req.body;

    console.log(`Received request to add dependent to employee with ID: ${id}`);
    console.log(`Dependent details: Name - ${name}, Relationship - ${relationship}`);

    // Find the employee by ID
    const employee = await Employee.findById(id);

    if (!employee) {
      console.log('Employee not found');
      return res.status(404).send({ message: 'Employee not found' });
    }

    // Add the new dependent to the employee's dependents array
    employee.dependents.push({ name, relationship });
    await employee.save();

    console.log('Dependent added successfully');
    return res.status(201).send({ message: 'Dependent added successfully', employee });
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).send({ message: error.message });
  }
});
export default router;
