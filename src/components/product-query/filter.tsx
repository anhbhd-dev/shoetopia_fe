"use client";
import { Checkbox, Input, Select, Option } from "@material-tailwind/react";
import React from "react";

export default function FilterPLP() {
  return (
    <div className="overflow-hidden">
      <div className="lg:mb-10 ml-2">
        <p className="text-xl font-bold lg:mb-5 mb-2">Tìm kiếm</p>
        <Input label="Nhập từ khoá..." />
      </div>
      <p className="ml-2 text-xl font-bold lg:mb-5 mb-2">Danh mục</p>
      <Checkbox
        label={
          <p className="text-ellipsis whitespace-nowrap overflow-hidden lg:max-w-52">
            Ripple Effect On Ripple Effectple Effect
          </p>
        }
      />
      <Checkbox
        label={
          <p className="text-ellipsis whitespace-nowrap overflow-hidden lg:max-w-52">
            Ripple Effect On Ripple Effectple Effect
          </p>
        }
      />
      <Checkbox label="Ripple Effect On" />
      <Checkbox label="Ripple Effect On" />
      <Checkbox label="Ripple Effect On" />
      <div className="lg:mb-10 ml-2">
        <p className="text-xl font-bold lg:mb-5 mb-2 mt-5">Khoảng giá</p>
        <div className="flex flex-col gap-4 lg:w-20 lg:mt-8">
          <Input variant="static" label="Giá tối thiểu" placeholder="0" />
          <Input variant="static" label="Giá tối đa" placeholder="20000" />
        </div>
      </div>
      <div>
        <p className="ml-2 text-xl font-bold lg:mb-5 mb-2">Sizes</p>
        <Checkbox label={<p>Size 40</p>} />
        <Checkbox label={<p>Size 40</p>} />
        <Checkbox label={<p>Size 40</p>} />
        <Checkbox label={<p>Size 40</p>} />
        <Checkbox label={<p>Size 40</p>} />
      </div>
    </div>
  );
}
