import type { Request, Response, NextFunction } from "express";
import Payroll, { IPayroll } from "../models/Payroll";

// Extends the Request interface to include 'employee'
declare global {
  namespace Express {
    interface Request {
      payroll: IPayroll;
    }
  }
}

export async function payrollExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { payrollId } = req.params;
    const payroll = await Payroll.findById(payrollId);
    if (!payroll) {
      const error = new Error("Nómina no encontrada");
      res.status(404).json({ error: error.message });
      return;
    }
    req.payroll = payroll;
    next();
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
}
