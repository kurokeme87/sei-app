import React, { ReactNode } from "react";

const LoadingSkeleton: React.FC = (): ReactNode => {
  return (
    <div className="p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse">
        {/* Skeleton Header */}
        <div className="h-4 bg-gray-500 rounded w-3/4 mb-4"></div>

        {/* Skeleton Sub Header */}
        <div className="h-3 bg-gray-500 rounded w-1/2 mb-2"></div>

        {/* Skeleton Content */}
        <div className="space-y-4">
          <div className="h-3 bg-gray-400 rounded w-full"></div>
          <div className="h-3 bg-gray-400 rounded w-5/6"></div>
          <div className="h-3 bg-gray-400 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
