import PropTypes from "prop-types";

function HomeFeatures({ icon, alticon, title, description }) {
  return (
    <div className="feature-item">
      <img src={icon} alt={alticon} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

HomeFeatures.propTypes = {
  icon: PropTypes.string.isRequired,
  alticon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default HomeFeatures;
