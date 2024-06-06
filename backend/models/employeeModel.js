import mongoose from 'mongoose';

const dependentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    relationship: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    id: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      contractType: {
        type: String,
        required: true,
        enum: ['Full-Time', 'Part-Time', 'Contract'],
      },
     Email: {
      type: String,
      required: false,
     },
     Designation: {
      type: String,
      required: false,
     },
    dependents: [dependentSchema],
  },
  {
    timestamps: true,
  }
);

export const Employee = mongoose.model('Employee', employeeSchema);
