// This file contains only non-React exports (no components)
export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
export type ButtonSize = "default" | "sm" | "lg" | "icon";

interface VariantProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const buttonVariants = ({
  variant = "default",
  size = "default",
}: VariantProps = {}): string => {
  const base =
    "inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none disabled:opacity-50";
  const variants: Record<ButtonVariant, string> = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    ghost: "text-gray-700 hover:bg-gray-100",
    link: "text-blue-500 underline-offset-4 hover:underline",
  };
  const sizes: Record<ButtonSize, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6 text-lg",
    icon: "h-10 w-10",
  };

  return `${base} ${variants[variant]} ${sizes[size]}`;
};
