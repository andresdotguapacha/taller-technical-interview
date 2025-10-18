import { useState, useCallback } from "react";
import { EmployeeFormData, ValidationErrors } from "../types/employee";

interface UseFormReturn {
  formData: EmployeeFormData;
  errors: ValidationErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (
    callback: (data: EmployeeFormData) => Promise<void>
  ) => (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
  setFormData: (data: EmployeeFormData) => void;
  isValid: boolean;
}

const initialFormState: EmployeeFormData = {
  firstName: "",
  lastName: "",
  email: "",
  position: "",
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateForm = (data: EmployeeFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(data.email)) {
    errors.email = "Invalid email format";
  }

  if (!data.position.trim()) {
    errors.position = "Position is required";
  }

  return errors;
};

export const useForm = (initialData?: EmployeeFormData): UseFormReturn => {
  const [formData, setFormData] = useState<EmployeeFormData>(
    initialData || initialFormState
  );
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (errors[name as keyof ValidationErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleSubmit = useCallback(
    (callback: (data: EmployeeFormData) => Promise<void>) =>
      async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }

        try {
          await callback(formData);
          setFormData(initialFormState);
          setErrors({});
        } catch (err) {
          console.error("Form submission error:", err);
        }
      },
    [formData]
  );

  const resetForm = useCallback(() => {
    setFormData(initialData || initialFormState);
    setErrors({});
  }, [initialData]);

  const isValid = Object.keys(validateForm(formData)).length === 0;

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
    setFormData,
    isValid,
  };
};
