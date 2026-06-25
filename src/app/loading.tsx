import React from "react";

export default function TaskSkeleton() {
  return (
    <div className="w-full space-y-4 animate-pulse">
      {/* ৩টা ফেক টাস্ক কার্ড দেখাবে লোডিং এর সময় */}
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="p-5 bg-gray-100 rounded-xl border border-gray-200 flex flex-col gap-3"
        >
          {/* টাইটেলের জন্য ফেক বার */}
          <div className="h-5 bg-gray-200 rounded-md w-1/3"></div>

          {/* ডেসক্রিপশনের জন্য ফেক বার */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
          </div>

          {/* নিচের স্ট্যাটাস বা বাজের জন্য ছোট বার */}
          <div className="flex justify-between items-center mt-2">
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            <div className="h-4 bg-gray-200 rounded-md w-16"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
