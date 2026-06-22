import { Save } from "lucide-react";

const departments = ["Engineering", "Design", "Marketing", "Finance", "Human Resources", "Operations", "Sales"];
const statuses = ["Active", "On Leave", "Inactive"];

function FieldError({ message }) {
  return message ? <span className="field-error">{message}</span> : null;
}

function EmployeeForm({ data, errors, saving, isEditing, onChange, onSubmit, onCancel }) {
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <form className="employee-form" onSubmit={onSubmit}>
      <label>
        <span>Full Name</span>
        <input
          value={data.name}
          onChange={(event) => updateField("name", event.target.value)}
          placeholder="Aarav Sharma"
          type="text"
        />
        <FieldError message={errors.name} />
      </label>

      <label>
        <span>Email Address</span>
        <input
          value={data.email}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="aarav@company.com"
          type="email"
        />
        <FieldError message={errors.email} />
      </label>

      <div className="form-row">
        <label>
          <span>Role</span>
          <input
            value={data.role}
            onChange={(event) => updateField("role", event.target.value)}
            placeholder="Frontend Developer"
            type="text"
          />
          <FieldError message={errors.role} />
        </label>

        <label>
          <span>Department</span>
          <select value={data.department} onChange={(event) => updateField("department", event.target.value)}>
            <option value="">Select</option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
          <FieldError message={errors.department} />
        </label>
      </div>

      <div className="form-row">
        <label>
          <span>Salary</span>
          <input
            value={data.salary}
            onChange={(event) => updateField("salary", event.target.value)}
            placeholder="65000"
            type="number"
            min="0"
          />
          <FieldError message={errors.salary} />
        </label>

        <label>
          <span>Status</span>
          <select value={data.status} onChange={(event) => updateField("status", event.target.value)}>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-row">
        <label>
          <span>Phone</span>
          <input
            value={data.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="+91 98765 43210"
            type="tel"
          />
          <FieldError message={errors.phone} />
        </label>

        <label>
          <span>Joining Date</span>
          <input
            value={data.joiningDate}
            onChange={(event) => updateField("joiningDate", event.target.value)}
            type="date"
          />
          <FieldError message={errors.joiningDate} />
        </label>
      </div>

      <div className="form-actions">
        {isEditing && (
          <button className="secondary-button" onClick={onCancel} type="button">
            Cancel
          </button>
        )}
        <button className="submit-button" disabled={saving} type="submit">
          <Save size={18} />
          {saving ? "Saving..." : isEditing ? "Update Employee" : "Save Employee"}
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;

