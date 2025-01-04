import React, { ReactNode } from "react";

interface CardSectionProps {
  title: string;
  children: ReactNode;
  onSeeAllClick?: () => void;
  backgroundColor?: string;
  width?: string;
}

const CardSection: React.FC<CardSectionProps> = ({
  title,
  children,
  onSeeAllClick,
  backgroundColor = "bg-white",
  width,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gray-800 font-bold text-lg">{title}</h2>
        {onSeeAllClick && (
          <button
            className="text-sm text-gray-500 hover:underline focus:outline-none"
            onClick={onSeeAllClick}
          >
            See All
          </button>
        )}
      </div>

      <div
        className={`${
          width ? width : "w-full"
        } p-4 rounded-3xl ${backgroundColor}`}
      >
        {children}
      </div>
    </div>
  );
};

export default CardSection;
