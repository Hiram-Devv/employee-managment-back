import type { Request, Response } from "express";
import Employee from "../models/Employee";

export class EmployeeController {
  static createEmployees = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const employee = new Employee(req.body);
    try {
      await employee.save();
      res.send("Empleado creado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static getAllEmployees = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const employees = await Employee.find({});
      res.json(employees);
    } catch (error) {
      console.log(error);
    }
  };

  static getEmployeeById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const employee = await Employee.findById(id);

      if (!employee) {
        const error = new Error("Empleado no encontrado");
        res.status(404).json({ error: error.message });
        return;
      }
      res.json(employee);
    } catch (error) {
      console.log(error);
    }
  };

  static updateEmployee = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const employee = await Employee.findByIdAndUpdate(id, req.body);
      if (!employee) {
        const error = new Error("Empleado no encontrado");
        res.status(404).json({ error: error.message });
        return;
      }
      await employee.save();
      res.send("Empleado actualizado");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar el empleado" });
    }
  };

  static deleteEmployee = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const employee = await Employee.findById(id);
      if (!employee) {
        const error = new Error("Empleado no encontrado");
        res.status(404).json({ error: error.message });
        return;
      }
      await employee.deleteOne();
      res.send("Empleado eliminado");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al actualizar el empleado" });
    }
  };
}
