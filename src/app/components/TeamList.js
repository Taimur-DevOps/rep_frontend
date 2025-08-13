"use client";

import React, { useState, useEffect } from "react";
import { userService } from "../Services/api";

const TeamList = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterRole, setFilterRole] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");

  // Fetch team members
  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to fetch from API first
      const response = await fetch("http://localhost:5001/api/users");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTeamMembers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching team members:", err);

      setTeamMembers(mockData);
      setError(
        "Could not connect to server. Showing mock data for development."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this team member?")) {
      try {
        console.log("Deleting user with ID:", id);
        await userService.deleteUser(id); // Use your Axios wrapper
        fetchTeamMembers(); // Refresh list
        alert("Team member removed successfully!");
      } catch (err) {
        console.error("Error deleting team member:", err);
        alert("Error removing team member: " + (err.message || err));
      }
    }
  };

  // Filter team members based on role and department
  const filteredMembers = teamMembers.filter((member) => {
    const roleMatch = !filterRole || member.role === filterRole;
    const departmentMatch =
      !filterDepartment || member.department === filterDepartment;
    return roleMatch && departmentMatch;
  });

  // Get unique roles and departments for filters
  const roles = [...new Set(teamMembers.map((member) => member.role))];
  const departments = [
    ...new Set(teamMembers.map((member) => member.department)),
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
        <button
          onClick={fetchTeamMembers}
          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Team Members</h2>
        <div className="text-sm text-gray-600">
          Total: {filteredMembers.length} member
          {filteredMembers.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <select
            id="roleFilter"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            id="departmentFilter"
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => {
              setFilterRole("");
              setFilterDepartment("");
            }}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Team Members Grid */}
      {filteredMembers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No team members found</p>
          <p className="text-sm mt-2">
            Try adjusting your filters or check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member._id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {member.name || "Unknown Name"}
                  </h3>
                  <p className="text-blue-600 font-medium text-sm mb-1">
                    {member.role || "No Role Specified"}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.department || "No Department"}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(member._id)}
                  className="ml-4 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
                  title="Remove team member"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
              {member.images && member.images.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {member.images.map((imgObj, index) => (
                      <img
                        key={index}
                        src={imgObj.url}
                        alt={`${member.name} ${index}`}
                        className="w-16 h-16 rounded-full object-cover border"
                      />
                    ))}
                  </div>
                )}
              {/* Contact Information */}
              <div className="space-y-2 text-sm text-gray-600">
                {member.email && (
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="truncate">{member.email}</span>
                  </div>
                )}
                {member.phone && (
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>{member.phone}</span>
                  </div>
                )}
                {member.location && (
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{member.location}</span>
                  </div>
                )}
              </div>

              {/* Join Date */}
              {member.joinDate && (
                <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                  Joined: {new Date(member.joinDate).toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Refresh Button */}
      <div className="mt-8 text-center">
        <button
          onClick={fetchTeamMembers}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          Refresh Team List
        </button>
      </div>
    </div>
  );
};

export default TeamList;
