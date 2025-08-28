import React from "react";

export function Progress({ value }) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full">
      <div
        className="h-2 bg-blue-500 rounded-full transition-all"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
