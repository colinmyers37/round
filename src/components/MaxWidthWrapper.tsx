import { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A wrapper component that sets a maximum width for its children.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional CSS class name for the wrapper.
 * @param {ReactNode} props.children - The children elements to be wrapped.
 * @returns {JSX.Element} The wrapped children within a div element.
 */
const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
