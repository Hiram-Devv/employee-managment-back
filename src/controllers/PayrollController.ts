import type { Request, Response } from "express";
import Payroll from "../models/Payroll";
import { calculatePayrollValues, calculateTotal } from "../utils/payrollCalculations";

export class PayrollController {
  static calculatePayrollValues = async (req: Request, res: Response): Promise<void> => {
    try {
      const { baseSalary } = req.body;
      
      if (!baseSalary || baseSalary <= 0) {
        res.status(400).json({ error: "El salario base es requerido y debe ser mayor a 0" });
        return;
      }

      const calculatedValues = calculatePayrollValues(baseSalary);
      res.json(calculatedValues);
    } catch (error) {
      res.status(500).json({ error: "Hubo un error al calcular los valores" });
    }
  };

  static createPayroll = async (req: Request, res: Response): Promise<void> => {
    try {
      const { baseSalary, daysWorked, overtimeHours, discount, healthInsurance, incentive } = req.body;
      
      // Calcular valores automáticamente
      const calculatedValues = calculatePayrollValues(baseSalary);
      
      // Calcular el total
      const total = calculateTotal(
        baseSalary,
        daysWorked,
        overtimeHours,
        calculatedValues.overtimeValue,
        discount,
        healthInsurance,
        incentive
      );

      const payroll = new Payroll({
        ...req.body,
        ...calculatedValues,
        total,
        employee: req.employee.id
      });

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

      const { baseSalary, daysWorked, overtimeHours, discount, healthInsurance, incentive } = req.body;
      
      // Recalcular valores si el salario base cambió
      if (baseSalary && baseSalary !== req.payroll.baseSalary) {
        const calculatedValues = calculatePayrollValues(baseSalary);
        req.payroll.dailySalary = calculatedValues.dailySalary;
        req.payroll.overtimeValue = calculatedValues.overtimeValue;
      }

      // Actualizar campos
      req.payroll.employeeName = req.body.employeeName;
      req.payroll.role = req.body.role;
      req.payroll.baseSalary = baseSalary;
      req.payroll.daysWorked = daysWorked;
      req.payroll.overtimeHours = overtimeHours;
      req.payroll.discount = discount;
      req.payroll.healthInsurance = healthInsurance;
      req.payroll.incentive = incentive;

      // Recalcular el total
      req.payroll.total = calculateTotal(
        req.payroll.baseSalary,
        req.payroll.daysWorked,
        req.payroll.overtimeHours,
        req.payroll.overtimeValue,
        req.payroll.discount,
        req.payroll.healthInsurance,
        req.payroll.incentive
      );

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
