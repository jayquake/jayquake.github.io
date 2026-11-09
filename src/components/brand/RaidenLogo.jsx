import PropTypes from "prop-types";

const LOGO_SRC = `${process.env.PUBLIC_URL || ""}/raiden-logo.svg`;

export default function RaidenLogo({ variant = "full", collapsed = false }) {
  if (variant === "mark" || collapsed) {
    return (
      <svg className="size-7 shrink-0" viewBox="0 0 32 32" role="img" aria-label="RAIDEN">
        <defs>
          <linearGradient id="markTeal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4fd1ed" />
            <stop offset="100%" stopColor="#00a38d" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="3" height="24" fill="url(#markTeal)" rx="0.5" />
        <text x="11" y="22" fill="#14171a" fontFamily="Rajdhani, sans-serif" fontSize="16" fontWeight="700">
          R
        </text>
      </svg>
    );
  }

  return (
    <img
      src={LOGO_SRC}
      alt="RAIDEN Accessibility QA Engine"
      className="block h-10 w-auto max-w-full"
    />
  );
}

RaidenLogo.propTypes = {
  variant: PropTypes.oneOf(["full", "mark"]),
  collapsed: PropTypes.bool,
};
