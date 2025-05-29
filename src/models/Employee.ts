import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { IPayroll } from "./Payroll";

// TypeScript
export interface IEmployee extends Document {
  employeeName: string;
  phone: string;
  role: string;
  healthInsurance: boolean;
  payroll: PopulatedDoc<IPayroll & Document>[];
  branch: string;
}

const EmployeeSchema: Schema = new Schema(
  {
    employeeName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    healthInsurance: {
      type: Boolean,
      required: true,
    },
    branch: {
      type: String,
      required: true,
      trim: true,
    },
    payroll: [
      {
        type: Types.ObjectId,
        ref: "Payroll",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Conect with Mongoose
const Employee = mongoose.model<IEmployee>("Employee", EmployeeSchema);
export default Employee;
