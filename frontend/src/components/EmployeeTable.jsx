const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(date));

function EmployeeTable({ employees, loading, onEdit, onDelete, editIcon: EditIcon, deleteIcon: DeleteIcon }) {
  if (loading) {
    return <div className="empty-state">Loading employee records...</div>;
  }

  if (!employees.length) {
    return <div className="empty-state">No employees found. Add a new employee to get started.</div>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Role</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Joining</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>
                <div className="employee-cell">
                  <span className="avatar">{employee.name.charAt(0).toUpperCase()}</span>
                  <div>
                    <strong>{employee.name}</strong>
                    <small>{employee.email}</small>
                    <small>{employee.phone}</small>
                  </div>
                </div>
              </td>
              <td>{employee.role}</td>
              <td>{employee.department}</td>
              <td>{money.format(employee.salary)}</td>
              <td>
                <span className={`status-pill ${employee.status.toLowerCase().replaceAll(" ", "-")}`}>
                  {employee.status}
                </span>
              </td>
              <td>{formatDate(employee.joiningDate)}</td>
              <td>
                <div className="row-actions">
                  <button className="icon-button" onClick={() => onEdit(employee)} type="button" title="Edit employee">
                    <EditIcon size={17} />
                  </button>
                  <button className="icon-button danger" onClick={() => onDelete(employee)} type="button" title="Delete employee">
                    <DeleteIcon size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;

