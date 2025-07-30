'use client';
import React, { useState } from "react";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { heroService } from "../Services/api";

const HeroFormAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formik = useFormik({
    initialValues: {
      images: [],
    },
    validationSchema: Yup.object({
      images: Yup.array()
        .min(1, "At least one image is required")
        .required("Please upload at least one image"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError("");
      setSuccess("");

      try {
        await heroService.createHeroSection(values);
        setSuccess("Hero section created successfully!");
        toast.success("Hero section created successfully!");
        formik.resetForm();
      } catch (err) {
        const msg = err.message || "Failed to create hero section";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFileChange = (event) => {
    const files = Array.from(event.currentTarget.files);
    formik.setFieldValue("images", [...formik.values.images, ...files]);
  };

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        className="p-6 bg-white rounded shadow"
      >
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Image Upload */}
        <div className="mb-4">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          {formik.errors.images && formik.touched.images && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.images}</div>
          )}
          {formik.values.images.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              {formik.values.images.length} file(s) selected
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`py-2 px-5 ${
              loading ? "bg-gray-400" : "bg-green-500"
            } text-white rounded`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </FormikProvider>
  );
};

export default HeroFormAdmin;
