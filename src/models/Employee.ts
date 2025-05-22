import mongoose, { Schema, Document } from "mongoose";

// TypeScript
export type EmployeeType = Document & {
  employeeName: string;
  phone: string;
  role: string;
  health_insurance: boolean;
  weekly_payroll: number;
  branch: string;
};

// Schema para mongoose
const EmployeeSchema: Schema = new Schema(
  {
    employeeName: {
      type: String,
      require: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      require,
      trim: true,
    },
    health_insurance: {
      type: Boolean,
      required: true,
    },
    weekly_payroll: {
      type: Number,
      required: true,
      min: 0,
    },
    branch: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Conectar con Mongoose
const Employee = mongoose.model<EmployeeType>("Employee", EmployeeSchema);
export default Employee;
