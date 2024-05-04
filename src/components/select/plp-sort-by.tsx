"use client";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import { Select, Option } from "@material-tailwind/react";
export function SelectSortByPLP() {
  return (
    <div className="w-72">
      <Select
        onChange={(value) => {
          console.log(value);
        }}
        label="Sắp xếp theo"
      >
        <Option value="angular">
          <p className="flex justify-between">
            <span className="min-w-[80px]">Mới nhất</span>
            <ArrowDownIcon width={15} />
          </p>
        </Option>
        <Option value="angular1">
          <p className="flex justify-between">
            <span className="min-w-[80px]">Cũ nhất</span>
            <ArrowUpIcon width={15} />
          </p>
        </Option>
        <Option value="as">
          <p className="flex justify-between">
            <span className="min-w-[80px]">Cũ nhất</span>
            <ArrowDownIcon width={15} />
          </p>
        </Option>
        <Option value="áhdasu">
          <p className="flex justify-between">
            <span className="min-w-[80px]">Cũ nhất</span>
            <ArrowUpIcon width={15} />
          </p>
        </Option>
      </Select>
    </div>
  );
}
