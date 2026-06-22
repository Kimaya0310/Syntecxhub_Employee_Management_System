import { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  Edit3,
  Mail,
  Phone,
  Plus,
  Search,
  Trash2,
  Users,
  X
} from "lucide-react";
import { employeeApi } from "./services/api.js";
import EmployeeForm from "./components/EmployeeForm.jsx";
import EmployeeTable from "./components/EmployeeTable.jsx";
import StatCard from "./components/StatCard.jsx";

const emptyEmployee = {
  name: "",
  email: "",
  role: "",
  department: "",
  salary: "",
  phone: "",
  status: "Active",
  joiningDate: ""
};

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState(emptyEmployee);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [apiError, setApiError] = useState("");

  const stats = useMemo(() => {
    const active = employees.filter((item) => item.status === "Active").length;
    const payroll = employees.reduce((sum, item) => sum + Number(item.salary || 0), 0);
    const departments = new Set(employees.map((item) => item.department)).size;

    return {
      total: employees.length,
      active,
      departments,
      payroll: money.format(payroll)
    };
  }, [employees]);

  const fetchEmployees = async () => {
    setLoading(true);
    setApiError("");
    try {
      const { data } = await employeeApi.list({ search, status, sortBy, order });
      setEmployees(data);
    } catch (error) {
      setApiError(error.response?.data?.message || "Unable to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(fetchEmployees, 250);
    return () => clearTimeout(timeout);
  }, [search, status, sortBy, order]);

  const validate = () => {
    const nextErrors = {};
    const emailPattern = /^\S+@\S+\.\S+$/;
    const phonePattern = /^[0-9+\-\s()]{7,20}$/;

    if (formData.name.trim().length < 2) nextErrors.name = "Enter at least 2 characters";
    if (!emailPattern.test(formData.email)) nextErrors.email = "Enter a valid email";
    if (!formData.role.trim()) nextErrors.role = "Role is required";
    if (!formData.department.trim()) nextErrors.department = "Department is required";
    if (formData.salary === "" || Number(formData.salary) < 0) nextErrors.salary = "Enter a valid salary";
    if (!phonePattern.test(formData.phone)) nextErrors.phone = "Enter a valid phone number";
    if (!formData.joiningDate) nextErrors.joiningDate = "Joining date is required";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setApiError("");

    if (!validate()) return;

    setSaving(true);
    const payload = {
      ...formData,
      salary: Number(formData.salary)
    };

    try {
      if (editingEmployee) {
        await employeeApi.update(editingEmployee._id, payload);
        setMessage("Employee updated successfully");
      } else {
        await employeeApi.create(payload);
        setMessage("Employee added successfully");
      }

      setFormData(emptyEmployee);
      setEditingEmployee(null);
      setErrors({});
      await fetchEmployees();
    } catch (error) {
      setApiError(error.response?.data?.message || "Unable to save employee");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setErrors({});
    setMessage("");
    setFormData({
      name: employee.name,
      email: employee.email,
      role: employee.role,
      department: employee.department,
      salary: employee.salary,
      phone: employee.phone,
      status: employee.status,
      joiningDate: employee.joiningDate?.slice(0, 10) || ""
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (employee) => {
    const confirmed = window.confirm(`Delete ${employee.name}? This action cannot be undone.`);
    if (!confirmed) return;

    setApiError("");
    setMessage("");
    try {
      await employeeApi.remove(employee._id);
      setMessage("Employee deleted successfully");
      await fetchEmployees();
    } catch (error) {
      setApiError(error.response?.data?.message || "Unable to delete employee");
    }
  };

  const cancelEdit = () => {
    setEditingEmployee(null);
    setFormData(emptyEmployee);
    setErrors({});
  };

  return (
    <main className="app-shell">
      <section className="hero-section">
        <div className="hero-content">
          <div>
            <p className="eyebrow">MERN Dashboard</p>
            <h1>Employee Management System</h1>
            <p className="hero-copy">
              Manage employee records, payroll details, departments, and status from one clean workspace.
            </p>
          </div>
          <div className="hero-actions">
            <a className="primary-link" href="#employee-form">
              <Plus size={18} />
              Add Employee
            </a>
          </div>
        </div>
      </section>

      <section className="stats-grid" aria-label="Employee summary">
        <StatCard icon={Users} label="Total Employees" value={stats.total} tone="blue" />
        <StatCard icon={CheckCircle2} label="Active Staff" value={stats.active} tone="green" />
        <StatCard icon={BriefcaseBusiness} label="Departments" value={stats.departments} tone="orange" />
        <StatCard icon={CircleDollarSign} label="Monthly Payroll" value={stats.payroll} tone="pink" />
      </section>

      <section className="workspace-grid">
        <aside id="employee-form" className="panel form-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{editingEmployee ? "Update Record" : "New Employee"}</p>
              <h2>{editingEmployee ? "Edit Employee" : "Add Employee"}</h2>
            </div>
            {editingEmployee && (
              <button className="icon-button" onClick={cancelEdit} type="button" title="Cancel edit">
                <X size={18} />
              </button>
            )}
          </div>

          <EmployeeForm
            data={formData}
            errors={errors}
            saving={saving}
            isEditing={Boolean(editingEmployee)}
            onChange={setFormData}
            onSubmit={handleSubmit}
            onCancel={cancelEdit}
          />
        </aside>

        <section className="panel list-panel">
          <div className="section-heading list-heading">
            <div>
              <p className="eyebrow">Directory</p>
              <h2>Employees</h2>
            </div>
            <div className="quick-meta">
              <span><Mail size={14} /> Email</span>
              <span><Phone size={14} /> Phone</span>
              <span><CalendarDays size={14} /> Joining</span>
            </div>
          </div>

          {(message || apiError) && (
            <div className={`notice ${apiError ? "error" : "success"}`}>
              {apiError || message}
            </div>
          )}

          <div className="toolbar">
            <label className="search-field">
              <Search size={18} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search employees"
                type="search"
              />
            </label>

            <select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter by status">
              <option>All</option>
              <option>Active</option>
              <option>On Leave</option>
              <option>Inactive</option>
            </select>

            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort employees">
              <option value="createdAt">Recently Added</option>
              <option value="name">Name</option>
              <option value="role">Role</option>
              <option value="department">Department</option>
              <option value="salary">Salary</option>
              <option value="joiningDate">Joining Date</option>
            </select>

            <button
              className="secondary-button"
              onClick={() => setOrder((current) => (current === "asc" ? "desc" : "asc"))}
              type="button"
            >
              {order === "asc" ? "Ascending" : "Descending"}
            </button>
          </div>

          <EmployeeTable
            employees={employees}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            editIcon={Edit3}
            deleteIcon={Trash2}
          />
        </section>
      </section>
    </main>
  );
}

export default App;

