import { body, param } from "express-validator";

export const validatePayrollId = [
  param("payrollId").isMongoId().withMessage("ID no válido"),
];

export const payrollValidationSchema = [
  body("_id").not().exists().withMessage("No se puede modificar el ID"),
  body("employee")
    .not()
    .exists()
    .withMessage("No se puede modificar el empleado"),
  body("dateRange").notEmpty().withMessage("El rango de fechas es obligatorio"),
  body("employeeName")
    .notEmpty()
    .withMessage("El nombre del empleado es obligatorio"),
  body("role").notEmpty().withMessage("El puesto del empleado es obligatorio"),
  body("baseSalary")
    .notEmpty()
    .withMessage("El sueldo base es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("Debe ser un número positivo"),
  body("dailySalary")
    .notEmpty()
    .withMessage("El sueldo diario es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("Debe ser un número positivo"),
  body("daysWorked")
    .notEmpty()
    .withMessage("Los días trabajados son obligatorios")
    .isInt({ min: 0, max: 31 })
    .withMessage("Debe estar entre 0 y 31"),
  body("weeklySalary")
    .notEmpty()
    .withMessage("El sueldo semanal es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("Debe ser un número positivo"),
  body("overtimeValue")
    .notEmpty()
    .withMessage("El valor de hora extra es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("Debe ser un número positivo"),
  body("overtimeHours")
    .notEmpty()
    .withMessage("Las horas extra son obligatorias")
    .isFloat({ min: 0 })
    .withMessage("Debe ser un número positivo"),
  body("overtime")
    .notEmpty()
    .withMessage("El total de horas extra es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("Debe ser un número positivo"),
  body("discount")
    .notEmpty()
    .withMessage("El descuento es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("Debe ser un número positivo"),
  body("healthInsurance")
    .notEmpty()
    .withMessage("El valor del seguro médico es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("Debe ser un número positivo"),
  body("incentive")
    .notEmpty()
    .withMessage("El incentivo es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("Debe ser un número positivo"),
  body("total")
    .notEmpty()
    .withMessage("El total de la nómina es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("Debe ser un número positivo"),
];
