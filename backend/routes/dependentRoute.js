import express from 'express';
import { Employee } from '../models/employeeModel.js';
// Route to Add a Dependent for an Employee
const router = express.Router();
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
  
  
  // Route to Update a Dependent of an Employee
  router.put('/:employeeId/dependents/:dependentId', async (req, res) => {
    try {
      const { employeeId, dependentId } = req.params;
      const { name, relationship } = req.body;
  
      // Find the employee by ID
      const employee = await Employee.findById(employeeId);
  
      if (!employee) {
        return res.status(404).send({ message: 'Employee not found' });
      }
  
      // Find the dependent by ID within the employee's dependents array
      const dependent = employee.dependents.id(dependentId);
  
      if (!dependent) {
        return res.status(404).send({ message: 'Dependent not found' });
      }
  
      // Update the dependent's details
      dependent.name = name;
      dependent.relationship = relationship;
  
      await employee.save();
  
      return res.status(200).send({ message: 'Dependent updated successfully', employee });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  
  // Route to Delete a Dependent of an Employee
  router.delete('/:employeeId/dependents/:dependentId', async (req, res) => {
    try {
      const { employeeId, dependentId } = req.params;
  
      // Find the employee by ID
      const employee = await Employee.findById(employeeId);
  
      if (!employee) {
        return res.status(404).send({ message: 'Employee not found' });
      }
  
      // Remove the dependent by ID from the employee's dependents array
      employee.dependents.id(dependentId).remove();
      await employee.save();
  
      return res.status(200).send({ message: 'Dependent deleted successfully', employee });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  });
  export default router;