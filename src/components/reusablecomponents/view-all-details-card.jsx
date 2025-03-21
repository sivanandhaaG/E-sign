import PropTypes from "prop-types";

const ViewAllSolutions = ({ title, actions }) => {
  return (
    <div className="mt-4 d-flex justify-content-center">
      <div className="view-all-solution-card-a-outer w-100">
        <div className="view-all-solution-card">
          <div>
            <p className="static-subheading text-center">{title}</p>
            <div>{actions}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
ViewAllSolutions.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.func,
};
export default ViewAllSolutions;
