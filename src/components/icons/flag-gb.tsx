import type { ReactElement, SVGProps } from "react";

type Props =
  | {
      readonly width: number;
      readonly height: number;
    }
  | Partial<SVGProps<SVGSVGElement>>;

export const FlagGb = (props: Props): ReactElement => {
  const { width, height } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || "18"}
      height={height || "12"}
      fill="none"
    >
      <g clipPath="url(#a)">
        <path fill="#fff" d="M1 1h16v10H1V1Z" />
        <path
          fill="#D80027"
          d="M10 1H8v4.062H1v1.875h7V11h2V6.937h7V5.062h-7V1Z"
        />
        <path
          fill="#0052B4"
          d="M13.306 7.739 17 9.663V7.74h-3.694Zm-2.567 0L17 10.999v-.921l-4.49-2.339h-1.77Zm4.593 3.26L10.74 8.608V11h4.593Z"
        />
        <path fill="#fff" d="m10.74 7.739 6.26 3.26v-.921l-4.49-2.339h-1.77Z" />
        <path
          fill="#D80027"
          d="m10.74 7.739 6.26 3.26v-.921l-4.49-2.339h-1.77Z"
        />
        <path
          fill="#0052B4"
          d="M3.823 7.739 1 9.209V7.74h2.823Zm3.438.415V11H1.797L7.26 8.154Z"
        />
        <path fill="#D80027" d="M5.49 7.739 1 10.078V11l6.26-3.261H5.49Z" />
        <path
          fill="#0052B4"
          d="M4.694 4.26 1 2.338V4.26h3.694Zm2.567 0L1 1v.922l4.49 2.339h1.77ZM2.668 1 7.26 3.392V1H2.668Z"
        />
        <path fill="#fff" d="M7.26 4.26 1 1v.922l4.49 2.339h1.77Z" />
        <path fill="#D80027" d="M7.26 4.26 1 1v.922l4.49 2.339h1.77Z" />
        <path
          fill="#0052B4"
          d="M14.177 4.26 17 2.79v1.47h-2.823Zm-3.438-.414V1h5.464L10.74 3.846Z"
        />
        <path fill="#D80027" d="M12.51 4.26 17 1.923V1l-6.26 3.26h1.77Z" />
      </g>
      <path stroke="#607085" strokeWidth=".5" d="M.75.75h16.5v10.5H.75z" />
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M1 1h16v10H1z" />
        </clipPath>
      </defs>
    </svg>
  );
};
