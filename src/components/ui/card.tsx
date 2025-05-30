// components/ui/card.tsx
import { ReactNode } from "react";
import { cn } from "../../libs/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-md border border-gray-200",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className }: CardProps) {
  return (
    <div className={cn("p-6", className)}>
      {children}
    </div>
  );
}
