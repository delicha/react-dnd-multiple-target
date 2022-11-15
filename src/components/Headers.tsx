import { FC } from "react";
import "./Headers.css";

interface HeadersProps {
  heading: string;
}

const Headers: FC<HeadersProps> = ({ heading }) => {
  return (
    <div className="header-container">
      <div className="header-title">
        {heading}
      </div>
    </div>
  );
};
export default Headers;
