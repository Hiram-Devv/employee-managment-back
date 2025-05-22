import mongoose, { Schema, Document } from "mongoose";

// TypeScript
export interface IEmployee extends Document {
  employeeName: string;
  phone: string;
  role: string;
  healthInsurance: boolean;
  payroll: number;
  branch: string;
}

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
    healthInsurance: {
      type: Boolean,
      required: true,
    },
    payroll: {
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
const Employee = mongoose.model<IEmployee>("Employee", EmployeeSchema);
export default Employee;
