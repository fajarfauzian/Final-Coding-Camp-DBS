import { cn } from "@/lib/utilis";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "category" | "add";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-primary text-white hover:bg-primary/90 h-9 px-4":
              variant === "default",
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4":
              variant === "outline",
            "bg-white/90 text-gray-600 hover:bg-white px-4 py-2 rounded-full":
              variant === "category",
            "bg-green-500 text-white w-6 h-6 rounded-full hover:bg-green-600":
              variant === "add",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
