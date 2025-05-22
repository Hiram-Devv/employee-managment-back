import { Router } from "express";
import { body, param } from "express-validator";
import { EmployeeController } from "../controllers/EmployeeController";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post(
  "/",
  body("employeeName")
    .notEmpty()
    .withMessage("El nombre del empleado es obligatorio"),
  body("phone")
    .notEmpty()
    .withMessage("El teléfono del empleado es obligatorio"),
  body("role").notEmpty().withMessage("El puesto del empleado es obligatorio"),
  body("health_insurance")
    .notEmpty()
    .withMessage("El seguro del empleado es obligatorio"),
  body("weekly_payroll")
    .notEmpty()
    .withMessage("La nómina del empleado es obligatoria"),
  body("branch")
    .notEmpty()
    .withMessage("La sucursal del empleado es obligatoria"),
  handleInputErrors,
  EmployeeController.createEmployees
);
router.get("/", EmployeeController.getAllEmployees);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  EmployeeController.getEmployeeById
);

router.put(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  body("employeeName")
    .notEmpty()
    .withMessage("El nombre del empleado es obligatorio"),
  body("phone")
    .notEmpty()
    .withMessage("El teléfono del empleado es obligatorio"),
  body("role").notEmpty().withMessage("El puesto del empleado es obligatorio"),
  body("health_insurance")
    .notEmpty()
    .withMessage("El seguro del empleado es obligatorio"),
  body("weekly_payroll")
    .notEmpty()
    .withMessage("La nómina del empleado es obligatoria"),
  body("branch")
    .notEmpty()
    .withMessage("La sucursal del empleado es obligatoria"),
  handleInputErrors,
  EmployeeController.updateEmployee
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  EmployeeController.deleteEmployee
);

export default router;
