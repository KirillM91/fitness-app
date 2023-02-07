function Routines({ routinesTextClassName } : any) {
  return (
    <svg
      className={routinesTextClassName}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      viewBox="0 0 300 1080"
    >
      <text
        fill="none"
        stroke="#a44500"
        strokeWidth="4"
        dx="0"
        dy="0"
        fontFamily='"impact"'
        fontSize="250"
        fontWeight="700"
        transform="rotate(-90 666 415)"
      >
        <tspan y="0">ROUTINES</tspan>
      </text>
    </svg>
  );
}

export default Routines;
