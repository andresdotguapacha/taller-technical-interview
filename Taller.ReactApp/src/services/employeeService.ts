import { Employee, EmployeeFormData } from "../types/employee";

const AUTH_TOKEN = "Bearer DummyTokenForAuthorization";
const API_URL = "https://localhost:7150/api/employee";

class EmployeeService {
  private getHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
      Authorization: AUTH_TOKEN,
    };
  }

  async getAllEmployees(): Promise<Employee[]> {
    const response = await fetch(API_URL, {
      headers: this.getHeaders(),
    });

    if (response.status === 204) {
      return [];
    }

    if (!response.ok) {
      throw new Error(`Error fetching employees: ${response.statusText}`);
    }

    return response.json();
  }

  async getEmployeeById(id: number): Promise<Employee> {
    const response = await fetch(`${API_URL}/${id}`, {
      headers: this.getHeaders(),
    });

    if (response.status === 404) {
      throw new Error("Employee not found");
    }

    if (!response.ok) {
      throw new Error(`Error fetching employee: ${response.statusText}`);
    }

    return response.json();
  }

  async createEmployee(employee: EmployeeFormData): Promise<Employee> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(employee),
    });

    if (!response.ok) {
      throw new Error(`Error creating employee: ${response.statusText}`);
    }

    return response.json();
  }

  async updateEmployee(
    id: number,
    employee: EmployeeFormData
  ): Promise<Employee> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify({ id, ...employee }),
    });

    if (!response.ok) {
      throw new Error(`Error updating employee: ${response.statusText}`);
    }

    return response.json();
  }

  async deleteEmployee(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error deleting employee: ${response.statusText}`);
    }
  }
}

export default new EmployeeService();
