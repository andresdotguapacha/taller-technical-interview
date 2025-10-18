export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  position?: string;
}