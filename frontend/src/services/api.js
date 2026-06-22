import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

export const employeeApi = {
  list: (params) => api.get("/employees", { params }),
  create: (employee) => api.post("/employees", employee),
  update: (id, employee) => api.put(`/employees/${id}`, employee),
  remove: (id) => api.delete(`/employees/${id}`)
};

export default api;

