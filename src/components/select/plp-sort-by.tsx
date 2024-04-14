"use client";
import { Select, Option } from "@material-tailwind/react";

export function SelectSortByPLP() {
  return (
    <div className="w-72">
      <Select
        onChange={(value) => {
          console.log(value);
        }}
        label="Select Version"
      >
        <Option value="angular">Material Tailwind HTML</Option>
        <Option value="bád">Material Tailwind React</Option>
        <Option value="áhdasu">Material Tailwind Vue</Option>
      </Select>
    </div>
  );
}
