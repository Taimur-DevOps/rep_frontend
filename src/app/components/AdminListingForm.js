"use client";
import { useState, useEffect } from "react";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import Field from "./Form";
import { propertyService } from "../Services/api";
import { useRouter } from "next/navigation";

const AdminListingForm = ({ propertyId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();

  const initialValues = {
    propertyId: "",
    title: "",
    description: "",
    price: "",
    location: "",
    houseNumber: "",
    blockNumber: "",
    images: [],
    propertyType: "house",
    bedrooms: "",
    bathrooms: "",
    garage: "",
    areaSize: "",
    yearBuilt: "",
    featured: false,
    features: [""],
  };

  const validationSchema = Yup.object({
    propertyId: Yup.string().required("Required"),
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    price: Yup.number().required("Required").positive("Must be positive"),
    location: Yup.string().required("Required"),
    houseNumber: Yup.string().required("Required"),
    blockNumber: Yup.string().required("Required"),
    propertyType: Yup.string().required("Required"),
    bedrooms: Yup.number()
      .required("Required")
      .positive("Must be positive")
      .integer("Must be an integer"),
    bathrooms: Yup.number()
      .required("Required")
      .positive("Must be positive")
      .integer("Must be an integer"),
    garage: Yup.number()
      .required("Required")
      .positive("Must be positive")
      .integer("Must be an integer"),
    areaSize: Yup.string().required("Required"),
    yearBuilt: Yup.number()
      .required("Required")
      .positive("Must be positive")
      .integer("Must be an integer"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const fetchProperty = async () => {
      if (propertyId) {
        setIsEdit(true);
        setIsLoading(true);
        try {
          const data = await propertyService.getPropertyById(propertyId);
          // Format the data for formik
          const formattedData = {
            ...data,
            images: [], // We don't get the File objects back from the API
          };
          formik.setValues(formattedData);
        } catch (error) {
          setError("Failed to fetch property details");
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProperty();
  }, [propertyId]);

  async function handleSubmit(values) {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isEdit) {
        await propertyService.updateProperty(propertyId, values);
        setSuccess("Property updated successfully!");
      } else {
        await propertyService.createProperty(values);
        setSuccess("Property created successfully!");
        formik.resetForm();
      }
    } catch (error) {
      setError(error.message || "An error occurred while saving the property");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleFeatureChange = (index, value) => {
    const newFeatures = formik.values.features.slice();
    newFeatures[index] = value;
    formik.setFieldValue("features", newFeatures);
  };

  const addFeature = () => {
    formik.setFieldValue("features", [...formik.values.features, ""]);
  };

  const removeFeature = (index) => {
    const newFeatures = formik.values.features.slice();
    newFeatures.splice(index, 1);
    formik.setFieldValue("features", newFeatures);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.currentTarget.files);
    formik.setFieldValue("images", [...formik.values.images, ...files]);
  };

  return (
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

        <main className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-5">
            <Field type="text" name="propertyId" label="Property ID" />
            <Field type="text" name="blockNumber" label="Block Name" />
            <Field type="text" name="houseNumber" label="House No." />
          </div>

          {/* location title desc */}
          <div className="flex flex-col gap-2">
            <Field type="text" name="location" label="Location" />
            <Field type="text" name="title" label="Title" />
            <Field type="textarea" name="description" label="Description" />
          </div>

          {/* property type and area */}
          <div className="grid grid-cols-2 gap-5">
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
            <Field
              type="select"
              name="areaSize"
              label="Area Size"
              options={[
                { value: "marla5", label: "5 Marla" },
                { value: "marla10", label: "10 Marla" },
                { value: "marla15", label: "15 Marla" },
                { value: "marla20", label: "20 Marla" },
              ]}
            />
          </div>
          
          {/* beds bath area */}
          <div className="grid grid-cols-3 gap-5">
            <Field type="number" name="bedrooms" label="Bedrooms" />
            <Field type="number" name="bathrooms" label="Bathrooms" />
            <Field type="number" name="garage" label="Garage" />
          </div>
          
          {/* price year build */}
          <div className="grid grid-cols-2 gap-5">
            <Field type="number" name="yearBuilt" label="Year Built" />
            <Field type="number" name="price" label="Price" />
          </div>
          
          {/* featured property  */}
          <Field type="checkbox" name="featured" label="Featured" />

          {/* features */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Features
            </label>
            {formik.values.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded-[4px]"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="text-blue-500"
            >
              Add Feature
            </button>
          </div>
          
          {/* upload images */}
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

          {/* submit btn */}
          <hr className="mt-4 mb-2" />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-4 py-2 px-5 bg-green-500 text-white rounded-[4px] text-base leading-4 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Saving..." : isEdit ? "Update" : "Save"}
            </button>
          </div>
        </main>
      </form>
    </FormikProvider>
  );
};

export default AdminListingForm;