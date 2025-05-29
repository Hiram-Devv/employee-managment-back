import type { Request, Response } from "express";
import Payroll from "../models/Payroll";

export class PayrollController {
  static createPayroll = async (req: Request, res: Response): Promise<void> => {
    try {
      const payroll = new Payroll(req.body);
      payroll.employee = req.employee.id;
      req.employee.payroll.push(payroll.id);
      await Promise.allSettled([payroll.save(), req.employee.save()]);
      res.send("Nómina creada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getEmployeePayroll = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const payroll = await Payroll.find({
        employee: req.employee.id,
      }).populate("employee");
      res.json(payroll);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static getPayrollById = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      if (req.payroll.employee.toString() !== req.employee.id) {
        const error = new Error("Acción no permitida");
        res.status(400).json({ error: error.message });
        return;
      }
      res.json(req.payroll);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updatePayroll = async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.payroll.employee.toString() !== req.employee.id) {
        const error = new Error("Acción no permitida");
        res.status(400).json({ error: error.message });
        return;
      }

      // Update all fields
      req.payroll.employeeName = req.body.employeeName;
      req.payroll.role = req.body.role;
      req.payroll.baseSalary = req.body.baseSalary;
      req.payroll.dailySalary = req.body.dailySalary;
      req.payroll.daysWorked = req.body.daysWorked;
      req.payroll.weeklySalary = req.body.weeklySalary;
      req.payroll.overtimeValue = req.body.overtimeValue;
      req.payroll.overtimeHours = req.body.overtimeHours;
      req.payroll.overtime = req.body.overtime;
      req.payroll.discount = req.body.discount;
      req.payroll.healthInsurance = req.body.healthInsurance;
      req.payroll.incentive = req.body.incentive;
      req.payroll.total = req.body.total;
      // Update dateRange if it comes in the body
      if (req.body.dateRange) {
        req.payroll.dateRange = {
          start: req.body.dateRange.start,
          end: req.body.dateRange.end,
        };
      }

      await req.payroll.save();
      res.send("Nómina actualizada correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
      console.log(error);
    }
  };

  static deletePayroll = async (req: Request, res: Response): Promise<void> => {
    try {
      req.employee.payroll = req.employee.payroll.filter(
        (payroll) => payroll.toString() !== req.payroll.id.toString()
      );

      await Promise.allSettled([req.payroll.deleteOne(), req.employee.save()]);
      console.log("Nómina eliminada correctamente");
      res.send("Payroll eliminado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static updatePayrollStatus = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { payrollId } = req.params;
      const payroll = await Payroll.findById(payrollId);
      if (!payroll) {
        const error = new Error("Nómina no encontrada");
        res.status(404).json({ error: error.message });
        return;
      }
      const { status } = req.body;
      payroll.status = status;
      await payroll.save();
      res.send("Estado de nómina actualizado correctamente");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}
