import Employee from "../models/Employee.js";

const parseSort = (sortBy = "createdAt", order = "desc") => {
  const allowedFields = ["name", "role", "department", "salary", "status", "joiningDate", "createdAt"];
  const field = allowedFields.includes(sortBy) ? sortBy : "createdAt";
  return { [field]: order === "asc" ? 1 : -1 };
};

export const getEmployees = async (req, res, next) => {
  try {
    const { search = "", status = "All", sortBy, order } = req.query;
    const query = {};

    if (search.trim()) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } }
      ];
    }

    if (status !== "All") {
      query.status = status;
    }

    const employees = await Employee.find(query).sort(parseSort(sortBy, order));
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!employee) {
      res.status(404);
      throw new Error("Employee not found");
    }

    res.json(employee);
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      res.status(404);
      throw new Error("Employee not found");
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    next(error);
  }
};

