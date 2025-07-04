"use client";

import React, { useState } from "react";
import { HiChevronUpDown } from "react-icons/hi2";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";

const FilterDropdown = ({ label, options, selectedValue, onChange }) => {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="relative w-full">
      <Combobox value={selectedValue} onChange={onChange}>
        <div className="relative">
          <ComboboxInput
            className="w-full rounded-[4px] border border-gray-300 py-[9px] pr-8 pl-3 text-sm text-gray-700 placeholder-gray-400 outline-none"
            placeholder={`Select ${label}`}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 px-2.5">
            <HiChevronUpDown className="size-4 text-gray-500" />
          </ComboboxButton>
        </div>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <ComboboxOptions className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <ComboboxOption
                  key={index}
                  value={option}
                  className="cursor-pointer hover:bg-blue-100 px-3 py-2 text-sm text-gray-700"
                >
                  {option}
                </ComboboxOption>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">No results found</div>
            )}
          </ComboboxOptions>
        </Transition>
      </Combobox>
    </div>
  );
};

export default FilterDropdown;
