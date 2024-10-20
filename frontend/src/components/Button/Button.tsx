import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  color?: "primary" | "success" | "error" | "warning" | "info" | "default";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

export default function Button({
  children,
  color = "default",
  size = "medium",
  onClick,
}: ButtonProps) {
  const colorClass = clsx({
    "bg-primary-main text-white hover:bg-primary-hover": color === "primary",
    "bg-success-main text-white hover:bg-success-hover": color === "success",
    "bg-error-main text-white hover:bg-error-hover": color === "error",
    "bg-warning-main text-white hover:bg-warning-hover": color === "warning",
    "bg-info-main text-white hover:bg-info-hover": color === "info",
    "bg-default-main text-white hover:bg-default-hover": color === "default",
  });

  const sizeClass = clsx({
    "px-2 py-1 text-sm": size === "small",
    "px-4 py-2 text-base": size === "medium",
    "px-6 py-3 text-lg": size === "large",
  });

  return (
    <button
      onClick={onClick}
      className={`${colorClass} ${sizeClass} rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2`}
    >
      {children}
    </button>
  );
}
