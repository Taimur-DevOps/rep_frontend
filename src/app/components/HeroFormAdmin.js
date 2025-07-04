'use client';
// your component code
import React, { useState } from "react";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import Field from "./Form";
import { propertyService } from "../Services/api";

const HeroFormAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const formik = useFormik({
    initialValues: {
      propertyId: `P-${Math.floor(1000 + Math.random() * 9000)}`, // Generate a random property ID
      title: "",
      description: "",
      location: "",
      price: "",
      houseNumber: "",
      blockNumber: "",
      images: [],
      propertyType: "house",
      bedrooms: "",
      bathrooms: "",
      garage: "0",
      areaSize: "",
      yearBuilt: new Date().getFullYear().toString(),
      featured: false,
      features: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      price: Yup.number().required("Required").positive("Must be positive"),
      bedrooms: Yup.number()
        .required("Required")
        .positive("Must be positive")
        .integer("Must be an integer"),
      bathrooms: Yup.number()
        .required("Required")
        .positive("Must be positive")
        .integer("Must be an integer"),
      areaSize: Yup.string().required("Required"),
      houseNumber: Yup.string().required("Required"),
      blockNumber: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);
      setSuccess(null);
      
      try {
        await propertyService.createProperty(values);
        setSuccess("Property created successfully!");
        formik.resetForm();
      } catch (err) {
        setError(err.message || "Failed to create property");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.currentTarget.files);
    formik.setFieldValue("images", files);
  };

  return (
    <>
      <FormikProvider value={formik}>
        <form
          onSubmit={formik.handleSubmit}
          className="border border-gray-300 rounded-[4px] bg-white px-6 py-7"
        >
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}
          
          {/* property Id and Title */}
          <main className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-4">
              <Field type="text" name="propertyId" label="Property ID" />
              <Field type="text" name="houseNumber" label="House No." />
              <Field type="text" name="blockNumber" label="Block Name" />
            </div>
            
            {/*location Title Description */}
            <Field type="text" name="title" label="Title" />
            <Field type="text" name="location" label="Location" />
            <Field type="textarea" name="description" label="Description" />

            {/* Property Type and Price */}
            <div className="grid grid-cols-2 gap-4">
              <Field
                type="select"
                name="propertyType"
                label="Property Type"
                options={[
                  { value: "house", label: "House" },
                  { value: "apartment", label: "Apartment" },
                  { value: "farmhouse", label: "Farm House" },
                  { value: "commercial", label: "Commercial" },
                ]}
              />
              <Field type="number" name="price" label="Price" />
            </div>

            {/* BedRoom, BathRooms, areaSize */}
            <div className="grid grid-cols-3 gap-4">
              <Field type="number" name="bedrooms" label="Bedrooms" />
              <Field type="number" name="bathrooms" label="Bathrooms" />
              <Field type="number" name="garage" label="Garage" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field type="text" name="areaSize" label="Area Size" />
              <Field type="number" name="yearBuilt" label="Year Built" />
            </div>
            
            {/* Featured Property */}
            <Field type="checkbox" name="featured" label="Featured" />
            
            {/* Upload Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Property Images
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-green-50 file:text-green-700
                  hover:file:bg-green-100"
              />
              {formik.values.images.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {formik.values.images.length} file(s) selected
                  </p>
                </div>
              )}
            </div>
          </main>

          {/* submit btn */}
          <hr className="mt-4 mb-2" />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-4 py-2 px-5 bg-green-500 text-white rounded-[4px] ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </FormikProvider>
    </>
  );
};

export default HeroFormAdmin;