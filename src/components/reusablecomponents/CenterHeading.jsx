const CenterHeading = ({ heading, subheading }) => {
  return (
    <div className="w-100">
      <h1 className="d-flex justify-content-center static-page-main-heading mb-2">
        {heading}
      </h1>
      <p className="d-flex justify-content-center culture-container-para">
        {subheading}
      </p>
    </div>
  );
};

export default CenterHeading;
