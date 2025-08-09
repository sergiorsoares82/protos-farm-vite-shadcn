import {
  buttonVariants,
  type ButtonVariant,
  type ButtonSize,
} from "./button-variants";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${buttonVariants({ variant, size })} ${className}`}
    />
  );
};
