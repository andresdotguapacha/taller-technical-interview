import React, { useState } from "react";
import { Employee, EmployeeFormData } from "./types/employee";
import { useEmployees } from "./hooks/useEmployees";
import { EmployeeForm } from "./components/employeeForm";
import { EmployeeList } from "./components/employeeList";
import { ErrorMessage } from "./components/errorMessage";

export default function App() {
    const {
        employees,
        loading,
        error,
        fetchEmployees,
        createEmployee,
        updateEmployee,
        deleteEmployee,
        clearError,
    } = useEmployees();

    const [showForm, setShowForm] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    const handleCreateEmployee = async (data: EmployeeFormData) => {
        await createEmployee(data);
        setShowForm(false);
    };

    const handleUpdateEmployee = async (data: EmployeeFormData) => {
        if (editingEmployee) {
            await updateEmployee(editingEmployee.id, data);
            setEditingEmployee(null);
            setShowForm(false);
        }
    };

    const handleEdit = (employee: Employee) => {
        setEditingEmployee(employee);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingEmployee(null);
    };

    const handleAddNew = () => {
        setEditingEmployee(null);
        setShowForm(true);
    };

    const getInitialFormData = (): EmployeeFormData | undefined => {
        if (editingEmployee) {
            return {
                firstName: editingEmployee.firstName,
                lastName: editingEmployee.lastName,
                email: editingEmployee.email,
                position: editingEmployee.position,
            };
        }
        return undefined;
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Employee Management System</h1>
                <p style={styles.subtitle}>Manage your organization's employee records</p>
            </header>

            {error && (
                <ErrorMessage
                    message={error}
                    onClose={clearError}
                />
            )}

            <div style={styles.actions}>
                <button
                    onClick={handleAddNew}
                    style={showForm && !editingEmployee ? styles.btnPrimaryActive : styles.btnPrimary}
                    disabled={showForm && !editingEmployee}
                >
                    {showForm && !editingEmployee ? "Adding Employee..." : "Add Employee"}
                </button>
                <button onClick={fetchEmployees} style={styles.btnPrimary} disabled={loading}>
                    Refresh
                </button>
                <div style={styles.counter}>
                    Total Employees: <strong>{employees.length}</strong>
                </div>
            </div>

            {showForm && (
                <EmployeeForm
                    onSubmit={editingEmployee ? handleUpdateEmployee : handleCreateEmployee}
                    onCancel={handleCancel}
                    initialData={getInitialFormData()}
                    isEditing={!!editingEmployee}
                />
            )}

            <EmployeeList
                employees={employees}
                onEdit={handleEdit}
                onDelete={deleteEmployee}
                loading={loading}
            />
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
    },
    header: {
        textAlign: "center" as const,
        marginBottom: "40px",
        paddingTop: "20px",
    },
    title: {
        color: "#2c3e50",
        fontSize: "32px",
        margin: "0 0 8px 0",
        fontWeight: "700" as const,
    },
    subtitle: {
        color: "#7f8c8d",
        fontSize: "16px",
        margin: 0,
    },
    counter: {
        color: "#7f8c8d",
        fontSize: "12px",
        margin: 0,
    },
    actions: {
        display: "flex",
        gap: "12px",
        marginBottom: "24px",
        alignItems: "center",
        flexWrap: "wrap" as const,
    },
    btnPrimary: {
        padding: "12px 24px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "600" as const,
        transition: "all 0.2s",
        boxShadow: "0 2px 4px rgba(0,123,255,0.3)",
    },
    btnPrimaryActive: {
        padding: "12px 24px",
        backgroundColor: "#0056b3",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "600" as const,
        transition: "all 0.2s",
        boxShadow: "0 2px 4px rgba(0,123,255,0.3)",
    }
}