"use client";
import AdminListingForm from "@/app/components/AdminListingForm";
import TableListing from "@/app/components/TableListing";
import React, { useState, useEffect } from "react";

const TeamMemberDashboard = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [isPropertySubmenuOpen, setIsPropertySubmenuOpen] = useState(true);
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
    if (activeTab === "listing") {
      fetchDashboardStats();
    }
  }, [activeTab]);

  const openPage = (pageName) => {
    setActiveTab(pageName);
  };

  const togglePropertySubmenu = () => {
    setIsPropertySubmenuOpen(!isPropertySubmenuOpen);
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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
            Team Member Dashboard
          </h5>
        </div>
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
                  Add new properties
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
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-full">
        {/* Dashboard Stats */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Dashboard Overview
            </h2>
            <button
              onClick={handleRefreshStats}
              disabled={stats.loading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
          </div>

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
            <h1 className="text-2xl font-semibold font-nokara mb-4">
              Listing of Properties
            </h1>
            <TableListing
              onEdit={handleEditProperty}
              onAddNew={handleAddNewProperty}
              onPropertyDeleted={fetchDashboardStats}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDashboard;
