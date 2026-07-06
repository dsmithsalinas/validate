export function ValidateLogo({ style }) {
  return (
    <svg
      viewBox="0 0 512 128"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Validate"
      style={style}
    >
      <g fill="#000000" transform="translate(16 18) scale(0.72)">
        <polygon points="10,24 68,24 88,42 74,42 58,34 10,34" />
        <polygon points="10,44 78,44 94,56 78,56 64,52 10,52" />
        <polygon points="10,64 78,64 94,72 78,72 64,76 10,76" />
        <polygon points="10,94 58,94 74,84 88,84 68,104 10,104" />
        <polygon points="88,38 120,64 88,90" />
      </g>
      <text
        x="128"
        y="80"
        fill="#000000"
        fontFamily="Inter, Geist, Helvetica, Arial, sans-serif"
        fontSize="56"
        fontWeight="700"
        letterSpacing="0"
      >
        Validate
      </text>
    </svg>
  );
}
