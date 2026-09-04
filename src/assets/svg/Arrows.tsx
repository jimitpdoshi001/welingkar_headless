export const ArrowLight = () => {
  return (
    <svg
      width="231"
      height="264"
      viewBox="0 0 231 264"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.1"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 263.154L230.534 131.632L0 0V263.154Z"
        fill="#70A344"
      />
    </svg>
  );
};

export const ArrowDark = () => {
  return (
    <svg
      width="21"
      height="24"
      viewBox="0 0 21 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 23.3457L20.4519 11.6777L0 0V23.3457Z"
        fill="var(--color-primary)"
      />
    </svg>
  );
};

export const ArrowLeft = ({ height, width }: { height: number; width: number }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 7 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 9L7 0L1.96701e-07 4.5L7 9Z"
        fill="var(--color-primary)"
      />
    </svg>
  );
};

export const ArrowRight = ({ height, width }: { height: number; width: number }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 7 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M-3.93402e-07 9L0 0L7 4.5L-3.93402e-07 9Z"
        fill="var(--color-primary)"
      />
    </svg>
  );
};

export const ArrowUp = () => {
  return (
    <svg
      width="9"
      height="7"
      viewBox="0 0 9 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 7L9 7L4.5 -3.93402e-07L0 7Z"
        fill="var(--color-primary)"
      />
    </svg>
  );
};

export const ArrowDown = ({ height, width }: { height: number; width: number }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 6 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.5968 2.44644e-07L0 0L2.7984 4.35307L5.5968 2.44644e-07Z"
        fill="var(--color-primary)"
      />
    </svg>
  );
};

export const AccordionDown = ({ height, width }: { height: number; width: number }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 4.6L10.6 -6.11959e-08L12 1.4L6 7.4L-6.11959e-08 1.4L1.4 -4.63341e-07L6 4.6Z"
        fill="black" />
    </svg>
  );
};
