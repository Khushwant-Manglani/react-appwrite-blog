import React from "react";

const Button = ({
  children,
  textColor = "text-white",
  bgColor = "bg-blue-600",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${textColor} ${bgColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
