import React from "react";
import { EmployeeFormData } from "../types/employee";
import { useForm } from "../hooks/useForm";

interface EmployeeFormProps {
    onSubmit: (data: EmployeeFormData) => Promise<void>;
    onCancel: () => void;
    initialData?: EmployeeFormData;
    isEditing?: boolean;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
    onSubmit,
    onCancel,
    initialData,
    isEditing = false,
}) => {
    const { formData, errors, handleChange, handleSubmit, resetForm } = useForm(initialData);

    const onCancelClick = () => {
        resetForm();
        onCancel();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
            <h2 style={styles.formTitle}>
                {isEditing ? "Edit Employee" : "Add New Employee"}
            </h2>

            <div style={styles.formGroup}>
                <label htmlFor="firstName" style={styles.label}>
                    First Name *
                </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    style={errors.firstName ? styles.inputError : styles.input}
                    placeholder="Enter first name"
                />
                {errors.firstName && <span style={styles.error}>{errors.firstName}</span>}
            </div>

            <div style={styles.formGroup}>
                <label htmlFor="lastName" style={styles.label}>
                    Last Name *
                </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    style={errors.lastName ? styles.inputError : styles.input}
                    placeholder="Enter last name"
                />
                {errors.lastName && <span style={styles.error}>{errors.lastName}</span>}
            </div>

            <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>
                    Email *
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={errors.email ? styles.inputError : styles.input}
                    placeholder="employee@example.com"
                />
                {errors.email && <span style={styles.error}>{errors.email}</span>}
            </div>

            <div style={styles.formGroup}>
                <label htmlFor="position" style={styles.label}>
                    Position *
                </label>
                <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    style={errors.position ? styles.inputError : styles.input}
                    placeholder="Enter position"
                />
                {errors.position && <span style={styles.error}>{errors.position}</span>}
            </div>

            <div style={styles.formActions}>
                <button type="submit" style={styles.btnSubmit}>
                    {isEditing ? "Update Employee" : "Create Employee"}
                </button>
                <button type="button" onClick={onCancelClick} style={styles.btnCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

const styles = {
    form: {
        backgroundColor: "#f8f9fa",
        padding: "24px",
        borderRadius: "8px",
        marginBottom: "24px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    formTitle: {
        marginTop: 0,
        marginBottom: "20px",
        color: "#333",
        fontSize: "20px",
    },
    formGroup: {
        marginBottom: "16px",
    },
    label: {
        display: "block",
        marginBottom: "6px",
        color: "#555",
        fontSize: "14px",
        fontWeight: "500" as const,
    },
    input: {
        width: "100%",
        padding: "10px 12px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontSize: "14px",
        boxSizing: "border-box" as const,
        transition: "border-color 0.2s",
    },
    inputError: {
        width: "100%",
        padding: "10px 12px",
        border: "1px solid #dc3545",
        borderRadius: "4px",
        fontSize: "14px",
        boxSizing: "border-box" as const,
        backgroundColor: "#fff5f5",
    },
    error: {
        display: "block",
        color: "#dc3545",
        fontSize: "12px",
        marginTop: "4px",
    },
    formActions: {
        display: "flex",
        gap: "10px",
        marginTop: "20px",
    },
    btnSubmit: {
        padding: "10px 20px",
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500" as const,
    },
    btnCancel: {
        padding: "10px 20px",
        backgroundColor: "#6c757d",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500" as const,
    },
};