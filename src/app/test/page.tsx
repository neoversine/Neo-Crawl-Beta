'use client'
import Script from 'next/script';
import './index.css'

import React, { useEffect, useState } from "react";

interface AttendanceRecord {
    username: string;
    date: string;
    login: string;
    break: string;
    resume: string;
    logout: string;
}

const initialData: AttendanceRecord[] = [
    { username: "Riya", date: "20-Aug-2025", login: "17:41", break: "17:42", resume: "17:42", logout: "17:42" },
    { username: "Khushi", date: "19-Aug-2025", login: "04:32", break: "05:45", resume: "06:02", logout: "06:02" },
    { username: "Khushbu", date: "19-Aug-2025", login: "04:34", break: "06:03", resume: "06:04", logout: "06:04" },
    { username: "Aman", date: "19-Aug-2025", login: "04:52", break: "14:07", resume: "14:07", logout: "14:07" },
    { username: "Shreyans", date: "19-Aug-2025", login: "05:28", break: "05:32", resume: "05:32", logout: "05:32" },
    { username: "Riya", date: "18-Aug-2025", login: "16:46", break: "17:57", resume: "18:02", logout: "18:58" },
    { username: "Satyam", date: "18-Aug-2025", login: "17:53", break: "17:54", resume: "17:54", logout: "17:54" },
    { username: "Khushbu", date: "11-Aug-2025", login: "01:25", break: "01:25", resume: "01:25", logout: "01:25" },
    { username: "Aman", date: "11-Aug-2025", login: "01:25", break: "01:25", resume: "01:25", logout: "01:25" },
    { username: "Satyam", date: "11-Aug-2025", login: "13:05", break: "13:05", resume: "13:05", logout: "13:05" },
    { username: "Arpita", date: "11-Aug-2025", login: "16:10", break: "16:11", resume: "16:11", logout: "16:11" },
    { username: "Riya", date: "11-Aug-2025", login: "16:17", break: "16:18", resume: "07:01", logout: "07:01" },
    { username: "Khushbu", date: "07-Aug-2025", login: "07:09", break: "07:09", resume: "07:09", logout: "07:09" },
    { username: "Aman", date: "07-Aug-2025", login: "07:09", break: "07:09", resume: "07:09", logout: "07:09" },
    { username: "John", date: "07-Aug-2025", login: "08:09", break: "08:09", resume: "08:09", logout: "08:09" },
    { username: "Khushi", date: "07-Aug-2025", login: "08:25", break: "08:26", resume: "08:26", logout: "08:26" },
];

export default function AdminDashboard() {
    const [currentView, setCurrentView] = useState("attendance");
    const [datetime, setDatetime] = useState("");
    const [sidebarActive, setSidebarActive] = useState(false);

    // Employees data
    const [employees] = useState([
        { username: "jdoe", email: "jdoe@example.com", first_name: "John", last_name: "Doe" },
        { username: "asmith", email: "asmith@example.com", first_name: "Alice", last_name: "Smith" },
    ]);
    const [searchText, setSearchText] = useState("");
    const [filteredEmployees, setFilteredEmployees] = useState(employees);

    // Leave requests data
    const [leaveRequests, setLeaveRequests] = useState([
        { username: "jdoe", date: "2025-08-24", reason: "Medical", status: "Pending" },
        { username: "asmith", date: "2025-08-22", reason: "Vacation", status: "Approved" },
    ]);

    // Update datetime
    useEffect(() => {
        function updateDateTime() {
            const now = new Date();
            const formatted = now.toLocaleString("en-IN", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            });
            setDatetime(formatted);
        }
        updateDateTime();
        const interval = setInterval(updateDateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    // Filter employees
    useEffect(() => {
        setFilteredEmployees(
            employees.filter((e) =>
                e.username.toLowerCase().includes(searchText.toLowerCase())
            )
        );
    }, [searchText, employees]);

    // Leave actions
    const approveLeave = (req: { username: string; date: string; reason: string; status: string }) => {
        setLeaveRequests((prev) =>
            prev.map((r) => (r === req ? { ...r, status: "Approved" } : r))
        );
    };

    const rejectLeave = (req: { username: string; date: string; reason: string; status: string }) => {
        setLeaveRequests((prev) =>
            prev.map((r) => (r === req ? { ...r, status: "Rejected" } : r))
        );
    };

    return (
        <>
            <Script
                src="https://cdn.jsdelivr.net/npm/handsontable@0.38.1/dist/handsontable.full.min.js"
                strategy="beforeInteractive"
            />
            <Script
                src="https://cdn.jsdelivr.net/npm/nghandsontable@0.13.0/dist/ngHandsontable.js"
                strategy="beforeInteractive"
            />
            <div className="container-fluid p-0">
                <div className="row g-0 min-vh-100">
                    {/* Sidebar */}
                    <div
                        className={`sidebar bg-white border-end d-flex flex-column p-3 col-md-3 col-lg-2 ${sidebarActive ? "active" : ""
                            }`}
                        id="sidebar"
                    >
                        <h5 className="sidebar-title mb-4">Admin Menu</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                <button
                                    className={`nav-link btn btn-link text-start ${currentView === "attendance" ? "active" : ""
                                        }`}
                                    onClick={() => setCurrentView("attendance")}
                                >
                                    <i className="fas fa-table me-2"></i> Employee Attendance Overview
                                </button>
                            </li>
                            <li className="nav-item mb-2">
                                <button
                                    className={`nav-link btn btn-link text-start ${currentView === "employees" ? "active" : ""
                                        }`}
                                    onClick={() => setCurrentView("employees")}
                                >
                                    <i className="fas fa-users me-2"></i> Employee List
                                </button>
                            </li>
                            <li className="nav-item mb-2">
                                <button
                                    className={`nav-link btn btn-link text-start ${currentView === "leaveRequests" ? "active" : ""
                                        }`}
                                    onClick={() => setCurrentView("leaveRequests")}
                                >
                                    <i className="fas fa-calendar-alt me-2"></i> Leave Requests
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Overlay for mobile */}
                    <div
                        className={`overlay ${sidebarActive ? "active" : ""}`}
                        id="overlay"
                        onClick={() => setSidebarActive(false)}
                    ></div>

                    {/* Main Content */}
                    <div className="col p-4 bg-light content-area">
                        {/* Header */}
                        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 header-container sticky-header">
                            <div className="d-flex align-items-center flex-wrap">
                                <button
                                    className="btn btn-outline-primary me-3 d-md-none"
                                    id="sidebarToggle"
                                    onClick={() => setSidebarActive(!sidebarActive)}
                                >
                                    <i className="fas fa-bars"></i>
                                </button>
                                <h3 className="fw-bold mb-0 text-truncate">
                                    Welcome, <span className="text-primary">Admin</span>
                                </h3>
                            </div>

                            <div className="d-flex align-items-center mt-2 mt-sm-0 flex-wrap header-right">
                                <div id="datetime" className="text-muted small me-3">
                                    {datetime}
                                </div>
                                <a href="#/logout" className="btn btn-danger btn-sm">
                                    <i className="fas fa-sign-out-alt me-1"></i> Logout
                                </a>
                            </div>
                        </div>

                        {/* Attendance Overview */}
                        {currentView === "attendance" && (
                            <div className="card shadow-sm p-3 mb-4">
                                <h4 className="mb-3">Employee Attendance Overview</h4>
                                <div
                                    id="attendanceChart"
                                    style={{ height: "400px", marginBottom: "20px" }}
                                ></div>
                                <div className="table-responsive-custom">
                                    <div id="adminAttendanceTable" className="ht-custom w-100">
                                        {/* Replace with Handsontable React wrapper if needed */}
                                        <p className="text-muted">Attendance table goes here...</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Employees */}
                        {currentView === "employees" && (
                            <div className="card shadow-sm p-3 mb-4">
                                <h4 className="mb-3">Employee List</h4>
                                <input
                                    type="text"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    placeholder="Search by username"
                                    className="form-control mb-3"
                                />
                                <div className="table-responsive">
                                    <div className="employee-table-wrapper">
                                        <table className="table table-bordered table-hover align-middle">
                                            <thead className="custom-header text-center">
                                                <tr>
                                                    <th>Username</th>
                                                    <th>Email</th>
                                                    <th>First Name</th>
                                                    <th>Last Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredEmployees.length > 0 ? (
                                                    filteredEmployees.map((employee, i) => (
                                                        <tr key={i} className="text-center">
                                                            <td>{employee.username}</td>
                                                            <td>{employee.email}</td>
                                                            <td>{employee.first_name}</td>
                                                            <td>{employee.last_name}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={4} className="text-center text-muted">
                                                            No employees found.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Leave Requests */}
                        {currentView === "leaveRequests" && (
                            <div className="card shadow-sm p-3">
                                <h4 className="mb-3">Leave Requests</h4>
                                <div className="table-responsive">
                                    <table className="table table-bordered align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Username</th>
                                                <th>Date</th>
                                                <th>Reason</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {leaveRequests.length > 0 ? (
                                                leaveRequests.map((request, i) => (
                                                    <tr key={i}>
                                                        <td>{request.username}</td>
                                                        <td>{request.date}</td>
                                                        <td>{request.reason}</td>
                                                        <td>{request.status}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-success btn-sm me-1"
                                                                onClick={() => approveLeave(request)}
                                                                disabled={request.status !== "Pending"}
                                                            >
                                                                Approve
                                                            </button>
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => rejectLeave(request)}
                                                                disabled={request.status !== "Pending"}
                                                            >
                                                                Reject
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="text-center text-muted">
                                                        No leave requests found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
