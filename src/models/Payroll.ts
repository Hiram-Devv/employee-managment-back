import mongoose, { Schema, Document } from "mongoose";

export interface IPayroll extends Document {
  dateRange: Date;
  employeeName: string;
  employeeRole: string;
  baseSalary: number;
  dailySalary: number;
  daysWorked: number;
  weeklySalary: number;
  overtimeValue: number;
  overtimeHours: number;
  overtime: number;
  discount: number;
  healthInsurance: number;
  incentive: number;
  total: number;
}

export const PayrollSchema: Schema = new Schema(
  {
    dateRange: {
      type: Date,
      required: true,
    },
    employeeName: {
      type: String,
      required: true,
      trim: true,
    },
    employeeRole: {
      type: String,
      required: true,
      trim: true,
    },
    baseSalary: {
      type: Number,
      required: true,
      min: 0,
    },
    dailySalary: {
      type: Number,
      required: true,
      min: 0,
    },
    daysWorked: {
      type: Number,
      required: true,
      min: 0,
      max: 31,
    },
    weeklySalary: {
      type: Number,
      required: true,
      min: 0,
    },
    overtimeValue: {
      type: Number,
      required: true,
      min: 0,
    },
    overtimeHours: {
      type: Number,
      required: true,
      min: 0,
    },
    overtime: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    healthInsurance: {
      type: Number,
      required: true,
      min: 0,
    },
    incentive: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

const Payroll = mongoose.model<IPayroll>("Payroll", PayrollSchema);
export default Payroll;
