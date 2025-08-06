import { body, param } from "express-validator";

export const validateEmployeeId = [
  param("id").isMongoId().withMessage("ID no válido"),
];

export const employeeValidationSchema = [
  body("employeeName")
    .notEmpty()
    .withMessage("El nombre del empleado es obligatorio"),
  body("phone")
    .notEmpty()
    .withMessage("El teléfono del empleado es obligatorio"),
  body("role").notEmpty().withMessage("El puesto del empleado es obligatorio"),
  body("healthInsurance")
    .notEmpty()
    .withMessage("El seguro del empleado es obligatorio"),
  body("branch")
    .notEmpty()
    .withMessage("La sucursal del empleado es obligatoria"),
];
