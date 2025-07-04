import { useField } from "formik";
import React from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { HiOutlineChevronDown } from "react-icons/hi";

const Field = ({ type, name, label, options }) => {
  if (type === "text")
    return <InputFiled name={name} label={label} type={type} />;
  if (type === "textarea")
    return <TextArea name={name} label={label} type={type} />;
  if (type === "number")
    return <InputNumber name={name} label={label} type={type} />;
  if (type === "file") return <File name={name} label={label} type={type} />;
  if (type === "checkbox")
    return <CheckBox name={name} label={label} type={type} />;
  // if (type === "list") return <List name={name} label={label} type={type} />;
  if (type === "select")
    return (
      <SelectField name={name} label={label} type={type} options={options} />
    );
};

export default Field;

// input field
const InputFiled = ({ name, label, type }) => {
  const [field, meta] = useField(name);
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={field.value}
        onChange={field.onChange}
        className="w-full px-2 border border-gray-300 rounded-[4px]"
      />
      {meta.error && meta.touched && (
        <div className="text-red-500 text-sm">{meta.error} </div>
      )}
    </div>
  );
};

// textarea field
const TextArea = ({ name, label, type }) => {
  const [field, meta] = useField(name);
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <textarea
        type={type}
        name={name}
        value={field.value}
        onChange={field.onChange}
        className="w-full border border-gray-300 rounded-[4px]"
      />
      {meta.error && meta.touched && (
        <div className="text-red-500 text-sm">{meta.error}</div>
      )}
    </div>
  );
};

// upload file

const File = ({ name, label, type }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (event) => {
    const { files } = event.target;
    helpers.setValue([...field.value, ...Array.from(files)]);
  };

  return (
    <div>
      <label className="flex bg-bg gap-2 text-white items-center justify-center rounded-[50px] w-40">
        <MdOutlineFileUpload />
        <span className="text-base">{label}</span>
        <input
          type={type}
          name={name}
          multiple
          onChange={handleChange} // Use the custom handleChange function
          className="hidden"
        />
      </label>
      {meta.error && meta.touched && (
        <div className="text-red-500">{meta.error}</div>
      )}

      {field.value && field.value.length > 0 && (
        <div className="mt-2 border rounded-[4px] p-2">
          {field.value.map((file, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="truncate">{file.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// number field
const InputNumber = ({ name, label, type }) => {
  const [field, meta] = useField(name);
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={field.value}
        onChange={field.onChange}
        className="w-full px-2 border border-gray-300 rounded-[4px]"
      />
      {meta.error && meta.touched && (
        <div className="text-red-500 text-sm">{meta.error}</div>
      )}
    </div>
  );
};

// featured checkbox
const CheckBox = ({ name, label, type }) => {
  const [field] = useField(name);
  return (
    <div className="flex items-center gap-2">
      <input
        type={type}
        name={name}
        checked={field.value}
        onChange={field.onChange}
        className="!h-4 w-4"
      />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
};

// select field with options
const SelectField = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="relative">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        {...field}
        {...props}
        className="w-full border border-gray-300 rounded-[4px] bg-white px-2 placeholder:font-light"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <HiOutlineChevronDown className="absolute bottom-[10px] right-[10px] w-4 h-4" />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

// add feature field
// const List = ({ name, label }) => {
//   const [field, meta, helpers] = useField(name);

//   const handleFeatureChange = (index, value) => {
//     const newFeatures = field.value;
//     newFeatures[index] = value;
//     helpers.setValue(newFeatures);
//   };
//   const removeFeature = (index) => {
//     const newFeatures = field.value;
//     newFeatures.splice(index, 1);
//     helpers.setValue(newFeatures);
//   };
//   const addFeature = () => {
//     helpers.setValue([...field.value, ""]);
//   };
//   return (
//     <div>
//       <label className="text-sm font-medium text-gray-700">{label}</label>
//       {field.value?.map((feature, index) => (
//         <div key={index} className="flex items-center gap-2 mb-2">
//           <input
//             name={`${name}.${index}`}
//             type="text"
//             value={field.value[index]}
//             onChange={(e) => handleFeatureChange(index, e.target.value)}
//             className="w-full px-2 border border-gray-300 rounded-[4px]"
//           />
//           <button
//             type="button"
//             onClick={() => removeFeature(index)}
//             className="text-red-500"
//           >
//             Remove
//           </button>
//         </div>
//       ))}
//       <button type="button" onClick={addFeature} className="text-blue-500">
//         Add {label}
//       </button>
//     </div>
//   );
// };
