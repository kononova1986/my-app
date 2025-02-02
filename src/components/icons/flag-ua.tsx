import type { ReactElement, SVGProps } from "react";

type Props =
  | {
      readonly width: number;
      readonly height: number;
    }
  | Partial<SVGProps<SVGSVGElement>>;

export const FlagUa = (props: Props): ReactElement => {
  const { width, height } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "18"}
      height={height || "12"}
      fill="none"
    >
      <g clipPath="url(#a)">
        <path fill="#FFDA44" d="M1 1h16v10H1V1Z" />
        <path fill="#338AF3" d="M1 1h16v5H1V1Z" />
      </g>
      <path stroke="#8392A6" strokeWidth=".5" d="M.75.75h16.5v10.5H.75z" />
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M1 1h16v10H1z" />
        </clipPath>
      </defs>
    </svg>
  );
};

