import React, { ReactNode } from "react";

interface CardSectionProps {
  title: string;
  children: ReactNode;
  onSeeAllClick?: () => void;
}

const CardSection: React.FC<CardSectionProps> = ({
  title,
  children,
  onSeeAllClick,
}) => {
  return (
    <div className="ml-5 m-1 md:m-1 p-1 rounded-lg">
      <div className="flex items-center justify-between text-gray-700 font-bold text-xl">
        <div>{title}</div>
        {onSeeAllClick ? (
          <div
            className="text-sm text-black cursor-pointer"
            onClick={onSeeAllClick}
          >
            See All
          </div>
        ) : null}
      </div>
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-1">
        {children}
      </div>
    </div>
  );
};

export default CardSection;
