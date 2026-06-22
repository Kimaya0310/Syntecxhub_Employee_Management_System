import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [80, "Name cannot exceed 80 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
      maxlength: [60, "Role cannot exceed 60 characters"]
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
      maxlength: [60, "Department cannot exceed 60 characters"]
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: [0, "Salary cannot be negative"]
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[0-9+\-\s()]{7,20}$/, "Please enter a valid phone number"]
    },
    status: {
      type: String,
      enum: ["Active", "On Leave", "Inactive"],
      default: "Active"
    },
    joiningDate: {
      type: Date,
      required: [true, "Joining date is required"]
    }
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;

