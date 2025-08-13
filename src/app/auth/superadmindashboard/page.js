"use client";
import AdminListingForm from "@/app/components/AdminListingForm";
import Settings from "@/app/components/Settings";
import TableListing from "@/app/components/TableListing";
import TeamForm from "@/app/components/TeamForm";
import TeamList from "@/app/components/TeamList";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("listing");
  const [isPropertySubmenuOpen, setIsPropertySubmenuOpen] = useState(true);
  const [isTeamSubmenuOpen, setIsTeamSubmenuOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);

  // State for dashboard statistics
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUsers: 0,
    loading: true,
    error: null,
  });

  // Fetch dashboard statistics
  const fetchDashboardStats = async () => {
    try {
      setStats((prev) => ({ ...prev, loading: true, error: null }));

      // Fetch properties and users data simultaneously
      const [propertiesResponse, usersResponse] = await Promise.all([
        fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"
          }/api/properties`
        ),
        fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"
          }/api/users`
        ),
      ]);

      if (!propertiesResponse.ok || !usersResponse.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const propertiesData = await propertiesResponse.json();
      const usersData = await usersResponse.json();

      setStats({
        totalProperties: Array.isArray(propertiesData)
          ? propertiesData.length
          : 0,
        totalUsers: Array.isArray(usersData) ? usersData.length : 0,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setStats((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load dashboard statistics",
      }));
    }
  };

  // Fetch stats on component mount
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // Refresh stats when switching to certain tabs
  useEffect(() => {
    if (activeTab === "listing" || activeTab === "viewTeamMembers") {
      fetchDashboardStats();
    }
  }, [activeTab]);

  const openPage = (pageName) => {
    setActiveTab(pageName);
  };

  const togglePropertySubmenu = () => {
    setIsPropertySubmenuOpen(!isPropertySubmenuOpen);
  };

  const toggleTeamSubmenu = () => {
    setIsTeamSubmenuOpen(!isTeamSubmenuOpen);
  };

  // New function to handle editing a property
  const handleEditProperty = (propertyId) => {
    setSelectedPropertyId(propertyId);
    openPage("update"); // Switch to the update tab when edit is clicked
  };

  // New function to handle adding a new property
  const handleAddNewProperty = () => {
    setSelectedPropertyId(null);
    openPage("create"); // Switch to the create tab when add new is clicked
  };

  // Function to refresh stats manually
  const handleRefreshStats = () => {
    fetchDashboardStats();
  };

  return (
    <>

 <div className="flex justify-between items-center border-b p-5">
            <h2 className="text-2xl font-semibold text-gray-800">
              Dashboard
            </h2>
            <div className="flex justify-between items-center gap-2">
            <button
              onClick={handleRefreshStats}
              disabled={stats.loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`h-4 w-4 ${stats.loading ? "animate-spin" : ""}`}
              >
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
              </svg>
              {stats.loading ? "Refreshing..." : "Refresh"}
            </button>
            <div
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Link href={`/`}>Home</Link>
             
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Link href={`/auth`}>Logout</Link>
             
            </div>
            </div>
          </div>

      {/* Sidebar */}
    <div className="flex min-h-screen">
      <div className="w-1/5 relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 p-4 shadow-xl shadow-blue-gray-900/5">
        <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
          {/* Property Main Menu with Submenu */}
          <div>
            <div
              role="button"
              tabIndex="0"
              className="flex items-center justify-between w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80"
              onClick={togglePropertySubmenu}
            >
              <div className="flex items-center">
                <div className="grid place-items-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z" />
                  </svg>
                </div>
                Property
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`h-5 w-5 transition-transform ${
                  isPropertySubmenuOpen ? "rotate-180" : ""
                }`}
              >
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
              </svg>
            </div>

            {/* Property Submenu */}
            {isPropertySubmenuOpen && (
              <div className="ml-7 pl-4 border-l border-gray-200">
                <div
                  role="button"
                  tabIndex="0"
                  className={`flex items-center w-full p-2 rounded-lg text-start leading-tight transition-all ${
                    activeTab === "create"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-50 hover:bg-opacity-80"
                  }`}
                  onClick={() => openPage("create")}
                >
                  <div className="grid place-items-center mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                  </div>
                  Add new property
                </div>

                <div
                  role="button"
                  tabIndex="0"
                  className={`flex items-center w-full p-2 rounded-lg text-start leading-tight transition-all ${
                    activeTab === "listing"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-50 hover:bg-opacity-80"
                  }`}
                  onClick={() => openPage("listing")}
                >
                  <div className="grid place-items-center mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                    </svg>
                  </div>
                  All properties
                </div>
              </div>
            )}
          </div>

          {/* Team Main Menu with Submenu */}
          <div>
            <div
              role="button"
              tabIndex="0"
              className="flex items-center justify-between w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80"
              onClick={toggleTeamSubmenu}
            >
              <div className="flex items-center">
                <div className="grid place-items-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58-.74.32-1.22 1.04-1.22 1.85V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z" />
                  </svg>
                </div>
                Team
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`h-5 w-5 transition-transform ${
                  isTeamSubmenuOpen ? "rotate-180" : ""
                }`}
              >
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
              </svg>
            </div>

            {/* Team Submenu */}
            {isTeamSubmenuOpen && (
              <div className="ml-7 pl-4 border-l border-gray-200">
                <div
                  role="button"
                  tabIndex="0"
                  className={`flex items-center w-full p-2 rounded-lg text-start leading-tight transition-all ${
                    activeTab === "addTeamMember"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-50 hover:bg-opacity-80"
                  }`}
                  onClick={() => openPage("addTeamMember")}
                >
                  <div className="grid place-items-center mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  Add Team Member
                </div>

                <div
                  role="button"
                  tabIndex="0"
                  className={`flex items-center w-full p-2 rounded-lg text-start leading-tight transition-all ${
                    activeTab === "viewTeamMembers"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-blue-50 hover:bg-opacity-80"
                  }`}
                  onClick={() => openPage("viewTeamMembers")}
                >
                  <div className="grid place-items-center mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                    </svg>
                  </div>
                  View Team Members
                </div>
              </div>
            )}
          </div>

          <div
            role="button"
            tabIndex="0"
            className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all ${
              activeTab === "settings"
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-50 hover:bg-opacity-80"
            }`}
            onClick={() => openPage("settings")}
          >
            <div className="grid place-items-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
              </svg>
            </div>
            Settings
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-4/5">
        {/* Dashboard Stats */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Properties Card */}
            <div className="bg-blue-500 text-white rounded-lg shadow-md p-6 relative">
              {stats.loading && (
                <div className="absolute inset-0 bg-blue-500 bg-opacity-75 flex items-center justify-center rounded-lg">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold">
                    {stats.error
                      ? "---"
                      : stats.totalProperties.toLocaleString()}
                  </h2>
                  <p className="text-lg">Total Properties</p>
                  {stats.error && (
                    <p className="text-sm text-red-200 mt-1">Failed to load</p>
                  )}
                </div>
                <div className="text-blue-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8"
                  >
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="text-white text-sm hover:underline"
                  onClick={() => openPage("listing")}
                >
                  View All Properties
                </button>
              </div>
            </div>

            {/* Total Users Card */}
            <div className="bg-green-600 text-white rounded-lg shadow-md p-6 relative">
              {stats.loading && (
                <div className="absolute inset-0 bg-green-600 bg-opacity-75 flex items-center justify-center rounded-lg">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold">
                    {stats.error ? "---" : stats.totalUsers.toLocaleString()}
                  </h2>
                  <p className="text-lg">Total Users</p>
                  {stats.error && (
                    <p className="text-sm text-red-200 mt-1">Failed to load</p>
                  )}
                </div>
                <div className="text-green-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8"
                  >
                    <path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.61c0-1.18.68-2.26 1.76-2.73 1.17-.52 2.61-.91 4.24-.91zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58-.74.32-1.22 1.04-1.22 1.85V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="text-white text-sm hover:underline"
                  onClick={() => openPage("viewTeamMembers")}
                >
                  View All Users
                </button>
              </div>
            </div>

            {/* You can add more stats cards here in the future */}
            <div className="bg-yellow-500 text-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold">Soon</h2>
                  <p className="text-lg">More Stats</p>
                </div>
                <div className="text-yellow-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button className="text-white text-sm hover:underline">
                  Coming Soon
                </button>
              </div>
            </div>

            <div className="bg-purple-500 text-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold">🚀</h2>
                  <p className="text-lg">Analytics</p>
                </div>
                <div className="text-purple-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-8 w-8"
                  >
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button className="text-white text-sm hover:underline">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-6 py-4">
          <div
            id="create"
            className={`tabcontent ${
              activeTab === "create" ? "block" : "hidden"
            }`}
          >
            <h1 className="text-2xl font-semibold font-nokara mb-4">
              Create New Property
            </h1>
            <AdminListingForm onPropertyCreated={fetchDashboardStats} />
          </div>

          <div
            id="update"
            className={`tabcontent ${
              activeTab === "update" ? "block" : "hidden"
            }`}
          >
            <h1 className="text-2xl font-semibold font-nokara mb-4">
              Update Property
            </h1>
            <AdminListingForm
              propertyId={selectedPropertyId}
              onPropertyUpdated={fetchDashboardStats}
            />
          </div>

          <div
            id="listing"
            className={`tabcontent ${
              activeTab === "listing" ? "block" : "hidden"
            }`}
          >
            <TableListing
              onEdit={handleEditProperty}
              onAddNew={handleAddNewProperty}
              onPropertyDeleted={fetchDashboardStats}
            />
          </div>

          <div
            id="settings"
            className={`tabcontent ${
              activeTab === "settings" ? "block" : "hidden"
            }`}
          >
            <Settings />
          </div>

          {/* Team Content */}
          <div
            id="addTeamMember"
            className={`tabcontent ${
              activeTab === "addTeamMember" ? "block" : "hidden"
            }`}
          >
            <h1 className="text-2xl font-semibold font-nokara mb-4">
              Add New Team Member
            </h1>
            <TeamForm onUserCreated={fetchDashboardStats} />
          </div>

          <div
            id="viewTeamMembers"
            className={`tabcontent ${
              activeTab === "viewTeamMembers" ? "block" : "hidden"
            }`}
          >
            <TeamList onUserDeleted={fetchDashboardStats} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
