import React from "react";
import sigPathRaw from "@/assets/signature-path?raw";

interface SignatureSVGProps {
  className?: string;
  animate?: boolean;
  durationMs?: number;
}

export const SignatureSVG: React.FC<SignatureSVGProps> = ({
  className,
  animate = false,
  durationMs = 2800,
}) => {
  return (
    <svg
      viewBox="0 0 918.852945 318.844133"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g transform="translate(-64.059051,690.000000) scale(0.100000,-0.100000)">
        <path
          d={sigPathRaw}
          fill="hsl(var(--accent))"
          fillOpacity={animate ? 1 : 1}
          stroke="hsl(var(--accent))"
          strokeWidth={8}
          style={{
            transition: `fill-opacity ${durationMs * 0.3}ms ease-out ${durationMs * 0.7}ms`,
          }}
        />
      </g>
    </svg>
  );
};

export default SignatureSVG;
