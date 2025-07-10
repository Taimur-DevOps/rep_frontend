import { useEffect, useState } from "react";
import { useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import { userService } from "../Services/api";
import { useRouter } from "next/navigation";

const TeamForm = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const isEdit = Boolean(userId);
  const router = useRouter();

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    role: "Agent",
    department: "Sales",
    bio: "",
    skills: "",
    images: [],
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string(),
    role: Yup.string().required("Role is required"),
    department: Yup.string(),
    bio: Yup.string().max(500, "Max 500 characters"),
    skills: Yup.string(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const payload = {
        ...values,
        skills: values.skills
          ? values.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        images: values.images,
      };

      if (isEdit) {
        await userService.updateUser(userId, payload);
        setSuccess("Team member updated successfully!");
      } else {
        await userService.createUser(payload);
        setSuccess("Team member created successfully!");
        formik.resetForm();
      }
    } catch (err) {
      setError(err.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  }

  const handleFileChange = (event) => {
    const files = Array.from(event.currentTarget.files);
    formik.setFieldValue("images", [...formik.values.images, ...files]);
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (isEdit) {
        setLoading(true);
        try {
          const user = await userService.getUserById(userId);
          formik.setValues({
            ...user,
            skills: user.skills?.join(", ") || "",
            images: [],
          });
        } catch (err) {
          setError("Failed to load user data");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        className="border border-gray-300 rounded-[4px] bg-white px-6 py-7"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className=" text-sm font-medium">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            {formik.errors.name && formik.touched.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>

          <div>
            <label className=" text-sm font-medium">Email *</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border rounded"
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className=" text-sm font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className=" text-sm font-medium">Role *</label>
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              className="w-full px-3 border rounded"
            >
              <option value="Agent">Agent</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
              <option value="Assistant">Assistant</option>
              <option value="Developer">Developer</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className=" text-sm font-medium">Department</label>
          <select
            name="department"
            value={formik.values.department}
            onChange={formik.handleChange}
            className="w-full px-3 border rounded"
          >
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Management">Management</option>
          </select>
        </div>

        <div className="mt-4">
          <label className=" text-sm font-medium">
            Skills (comma-separated)
          </label>
          <input
            type="text"
            name="skills"
            value={formik.values.skills}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="e.g. Marketing, Sales, Design"
          />
        </div>

        <div className="mt-4">
          <label className=" text-sm font-medium">Bio</label>
          <textarea
            name="bio"
            value={formik.values.bio}
            onChange={formik.handleChange}
            rows="3"
            className="w-full px-3 py-2 border rounded"
          />
          <p className="text-sm text-gray-500 mt-1">
            {formik.values.bio.length}/500 characters
          </p>
        </div>

        <div className="mt-4">
          <label className=" text-sm font-medium">Profile Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-1">
            Upload multiple profile images
          </p>
        </div>

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

export default TeamForm;
