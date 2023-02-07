function Progress({ progressTextClassName } : any) {
  return (
    <svg
      className={progressTextClassName}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      viewBox="0 0 300 1080"
    >
      <text
        fill="none"
        stroke="#138500"
        strokeWidth="4"
        dx="0"
        dy="0"
        fontFamily='"impact"'
        fontSize="250"
        fontWeight="700"
        transform="rotate(-90 666 415)"
      >
        <tspan y="0">PROGRESS</tspan>
      </text>
    </svg>
  );
}

export default Progress;
