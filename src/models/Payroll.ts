import mongoose, { Schema, Document, Types } from "mongoose";

const payrollStatus = {
  PENDING: "pending",
  IN_PROGRESS: "inProgress",
  COMPLETED: "completed",
} as const;

export type PayrollStatus = (typeof payrollStatus)[keyof typeof payrollStatus];

export interface IPayroll extends Document {
  employee: Types.ObjectId;
  dateRange: {
    start: Date;
    end: Date;
  };
  employeeName: string;
  role: string;
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
  status: PayrollStatus;
}

export const PayrollSchema: Schema = new Schema(
  {
    employee: {
      type: Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(payrollStatus),
      default: payrollStatus.PENDING,
    },
    dateRange: {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        required: true,
      },
    },
    employeeName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
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
