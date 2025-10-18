import React from "react";
import { Employee } from "../types/employee";

interface EmployeeListProps {
    employees: Employee[];
    onEdit: (employee: Employee) => void;
    onDelete: (id: number) => void;
    loading: boolean;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({
    employees,
    onEdit,
    onDelete,
    loading,
}) => {
    const handleDelete = (id: number, name: string) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            onDelete(id);
        }
    };

    if (loading) {
        return <div style={styles.loading}>Loading employees...</div>;
    }

    if (employees.length === 0) {
        return (
            <div style={styles.empty}>
                <p>No employees found</p>
                <p style={styles.emptySubtext}>Click "Add Employee" to create your first employee record</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>ID</th>
                        <th style={styles.th}>First Name</th>
                        <th style={styles.th}>Last Name</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Position</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id} style={styles.tr}>
                            <td style={styles.td}>{employee.id}</td>
                            <td style={styles.td}>{employee.firstName}</td>
                            <td style={styles.td}>{employee.lastName}</td>
                            <td style={styles.td}>{employee.email}</td>
                            <td style={styles.td}>{employee.position}</td>
                            <td style={styles.td}>
                                <button
                                    onClick={() => onEdit(employee)}
                                    style={styles.btnEdit}
                                    aria-label={`Edit ${employee.firstName} ${employee.lastName}`}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(employee.id, `${employee.firstName} ${employee.lastName}`)}
                                    style={styles.btnDelete}
                                    aria-label={`Delete ${employee.firstName} ${employee.lastName}`}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        overflowX: "auto" as const,
    },
    loading: {
        textAlign: "center" as const,
        padding: "40px",
        fontSize: "18px",
        color: "#666",
    },
    empty: {
        textAlign: "center" as const,
        padding: "60px 20px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        color: "#666",
    },
    emptySubtext: {
        fontSize: "14px",
        color: "#999",
        marginTop: "8px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse" as const,
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        overflow: "hidden",
    },
    th: {
        backgroundColor: "#343a40",
        color: "white",
        padding: "14px 12px",
        textAlign: "left" as const,
        fontWeight: "600" as const,
        fontSize: "14px",
        textTransform: "uppercase" as const,
        letterSpacing: "0.5px",
    },
    tr: {
        borderBottom: "1px solid #dee2e6",
        transition: "background-color 0.2s",
    },
    td: {
        padding: "14px 12px",
        fontSize: "14px",
        color: "#495057",
    },
    btnEdit: {
        padding: "6px 14px",
        backgroundColor: "#ffc107",
        color: "#000",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginRight: "8px",
        fontSize: "13px",
        fontWeight: "500" as const,
        transition: "background-color 0.2s",
    },
    btnDelete: {
        padding: "6px 14px",
        backgroundColor: "#dc3545",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: "500" as const,
        transition: "background-color 0.2s",
    },
};