import type { Request, Response, NextFunction } from "express";
import Employee, { IEmployee } from "../models/Employee";

// Extends the Request interface to include 'employee'
declare global {
  namespace Express {
    interface Request {
      employee: IEmployee;
    }
  }
}

export async function employeeExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { employeeId } = req.params;
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      const error = new Error("Empleado no encontrado");
      res.status(404).json({ error: error.message });
      return;
    }
    req.employee = employee;
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}
