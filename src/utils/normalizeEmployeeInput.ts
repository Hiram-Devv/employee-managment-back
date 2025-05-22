import { Request } from "express";
import { EmployeeUpdateData } from "../types/EmployeeUpdateData";

export const normalizeEmployeeInput = (req: Request): EmployeeUpdateData => {
  return {
    employeeName: req.body.employeeName,
    phone: Number(req.body.phone),
    role: req.body.role,
    health_insurance:
      req.body.health_insurance === "true" ||
      req.body.health_insurance === true,
    weekly_payroll: Number(req.body.weekly_payroll),
    branch: req.body.branch,
  };
};
