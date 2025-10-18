import { useState, useEffect, useCallback } from "react";
import { Employee, EmployeeFormData } from "../types/employee";
import employeeService from "../services/employeeService";

interface UseEmployeesReturn {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  fetchEmployees: () => Promise<void>;
  createEmployee: (data: EmployeeFormData) => Promise<void>;
  updateEmployee: (id: number, data: EmployeeFormData) => Promise<void>;
  deleteEmployee: (id: number) => Promise<void>;
  clearError: () => void;
}

export const useEmployees = (): UseEmployeesReturn => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  const createEmployee = useCallback(
    async (data: EmployeeFormData) => {
      setLoading(true);
      setError(null);
      try {
        await employeeService.createEmployee(data);
        await fetchEmployees();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error creating employee"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchEmployees]
  );

  const updateEmployee = useCallback(
    async (id: number, data: EmployeeFormData) => {
      setLoading(true);
      setError(null);
      try {
        await employeeService.updateEmployee(id, data);
        await fetchEmployees();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error updating employee"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchEmployees]
  );

  const deleteEmployee = useCallback(
    async (id: number) => {
      setLoading(true);
      setError(null);
      try {
        await employeeService.deleteEmployee(id);
        await fetchEmployees();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error deleting employee"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchEmployees]
  );

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const clearError = () => setError(null);

  return {
    employees,
    loading,
    error,
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    clearError,
  };
};
