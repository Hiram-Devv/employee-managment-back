import { Router } from "express";
import { body, param } from "express-validator";
import { EmployeeController } from "../controllers/EmployeeController";
import { handleInputErrors } from "../middleware/validation";
import {
  employeeValidationSchema,
  validateEmployeeId,
} from "../validators/employee";
import {
  payrollValidationSchema,
  validatePayrollId,
} from "../validators/payroll";
import { PayrollController } from "../controllers/PayrollController";
import { employeeExists } from "../middleware/employee";
import { payrollExists } from "../middleware/payroll";

const router = Router();

router.post(
  "/",
  employeeValidationSchema,
  handleInputErrors,
  EmployeeController.createEmployees
);
router.get("/", EmployeeController.getAllEmployees);

router.get(
  "/:id",
  validateEmployeeId,
  handleInputErrors,
  EmployeeController.getEmployeeById
);

router.put(
  "/:id",
  [...validateEmployeeId, ...employeeValidationSchema],
  handleInputErrors,
  EmployeeController.updateEmployee
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  EmployeeController.deleteEmployee
);

/** Routes for Payroll */

router.post(
  "/:employeeId/payrolls",
  employeeExists,
  payrollValidationSchema,
  handleInputErrors,
  PayrollController.createPayroll
);
router.get(
  "/:employeeId/payrolls",
  employeeExists,
  PayrollController.getEmployeePayroll
);

router.get(
  "/:employeeId/payrolls/:payrollId",
  employeeExists,
  payrollExists,
  validatePayrollId,
  handleInputErrors,
  PayrollController.getPayrollById
);

router.put(
  "/:employeeId/payrolls/:payrollId",
  employeeExists,
  payrollExists,
  validatePayrollId.concat(payrollValidationSchema),
  handleInputErrors,
  PayrollController.updatePayroll
);

router.delete(
  "/:employeeId/payrolls/:payrollId",
  employeeExists,
  payrollExists,

  validatePayrollId,
  handleInputErrors,
  PayrollController.deletePayroll
);

router.post(
  "/:employeeId/payrolls/:payrollId/status",
  employeeExists,
  payrollExists,

  validatePayrollId,
  body("status").notEmpty().withMessage("El estado es obligatorio"),
  handleInputErrors,
  PayrollController.updatePayrollStatus
);

export default router;
