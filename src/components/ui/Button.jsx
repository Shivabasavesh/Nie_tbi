import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', asChild = false, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "button"
  
  const baseStyles = "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white hover:scale-[1.03] active:scale-[0.97]";
  
  const variants = {
    primary: "bg-nie-orange text-white hover:bg-orange-500 shadow-premium hover:shadow-premium-hover",
    secondary: "bg-nie-navy text-white hover:bg-slate-800 shadow-premium hover:shadow-premium-hover",
    outline: "border-2 border-slate-200 bg-transparent hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 transition-colors",
    ghost: "hover:bg-slate-100 hover:text-slate-900",
  };
  
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
  };

  return (
    <Comp
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button };
export default Button;
