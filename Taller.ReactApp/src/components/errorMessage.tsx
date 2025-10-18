import React from "react";

interface ErrorMessageProps {
    message: string;
    onClose: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
    return (
        <div style={styles.container} role="alert">
            <div style={styles.content}>
                <span style={styles.icon}>⚠️</span>
                <span style={styles.message}>{message}</span>
            </div>
            <button
                onClick={onClose}
                style={styles.closeBtn}
                aria-label="Close error message"
            >
                ×
            </button>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: "#f8d7da",
        color: "#721c24",
        padding: "16px 20px",
        borderRadius: "6px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #f5c6cb",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    content: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    icon: {
        fontSize: "20px",
    },
    message: {
        fontSize: "14px",
        fontWeight: "500" as const,
    },
    closeBtn: {
        background: "none",
        border: "none",
        fontSize: "28px",
        cursor: "pointer",
        color: "#721c24",
        padding: "0",
        width: "28px",
        height: "28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px",
        transition: "background-color 0.2s",
    },
};