import React, { ReactNode } from "react";

interface CardSectionProps {
  title: string;
  children: ReactNode;
  onSeeAllClick?: () => void;
  backgroundColor?: string;
}

const CardSection: React.FC<CardSectionProps> = ({
  title,
  children,
  onSeeAllClick,
  backgroundColor = "bg-white",
}) => {
  return (
    <div className="m-5">
      {/* Header Section */}
      <div className="flex items-center justify-between text-gray-800 font-bold text-lg mb-4">
        <h2>{title}</h2>
        {onSeeAllClick && (
          <button
            className="text-sm text-grey-500 hover:underline focus:outline-none"
            onClick={onSeeAllClick}
          >
            See All
          </button>
        )}
      </div>

      {/* Card Section */}
      <div className={`flex p-4 rounded-lg ${backgroundColor}`}>
        {children}
      </div>
    </div>
  );
};

export default CardSection;
