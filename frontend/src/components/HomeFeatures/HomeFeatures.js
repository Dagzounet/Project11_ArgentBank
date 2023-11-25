function HomeFeatures({ icon, alticon, title, description }) {
  return (
    <div className="feature-item">
      <img src={icon} alt={alticon} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default HomeFeatures;
