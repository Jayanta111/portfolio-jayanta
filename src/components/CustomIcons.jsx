// components/CustomIcons.jsx
export const LeetCode = ({ size = 24, className = "" }) => (
  <img
    src="/LeetCode.png"
    alt="LeetCode"
    width={size}
    height={size}
    className={`object-contain ${className}`}
  />
);

export const BuyMeACoffee = ({ size = 24, className = "" }) => (
  <img
    src="/buymeacoffee.png"
    alt="BuyMeACoffee"
    width={size}
    height={size}
    className={`object-contain ${className}`}
  />
);
