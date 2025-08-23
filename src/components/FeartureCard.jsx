import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function FeatureCard({
  icon,
  title,
  desc,
  link,
  buttonText,
  buttonColor, // không có dấu phẩy cuối
}) {
  return (
    <div className="card">
      <div className="card-icon">{icon}</div>
      <h2 className="card-title">{title}</h2>
      <p className="card-desc">{desc}</p>
      <Link to={link} className={`btn-primary ${buttonColor}`}>
        {buttonText}
      </Link>
    </div>
  );
}

FeatureCard.propTypes = {
  icon: PropTypes.node.isRequired, // nhận <Film size={32} />
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonColor: PropTypes.string,
};

FeatureCard.defaultProps = {
  buttonColor: "bg-purple-600 hover:bg-purple-700",
};
