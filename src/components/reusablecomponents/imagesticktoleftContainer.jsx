import PropTypes from "prop-types";

const ImagesticktoleftContainer = ({
  title,
  subtitle,
  list,
  imageLink,
  actions,
  isleft,
}) => {
  return (
    <div>
      {isleft ? (
        <div className="how-to-use-esing">
          <img src={imageLink} alt={title} />
          <div>
            <h1 className="static-page-main-heading">{title}</h1>
            <p className="static-para">{subtitle}</p>
            <ul>
              {list.map((item, index) => (
                <li key={index}>
                  <p className="static-para">{item}</p>
                </li>
              ))}
            </ul>
            {actions}
          </div>
        </div>
      ) : (
        <div className="how-to-use-esing padding-left">
          <div>
            <h1 className="static-page-main-heading">{title}</h1>
            <p className="static-para">{subtitle}</p>
            <ul>
              {list.map((item, index) => (
                <li key={index}>
                  <p className="static-para">{item}</p>
                </li>
              ))}
            </ul>
            {actions}
          </div>
          <img src={imageLink} alt={title} />
        </div>
      )}
    </div>
  );
};

ImagesticktoleftContainer.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  imageLink: PropTypes.string,
  actions: PropTypes.func,
  isleft: PropTypes.bool,
};

export default ImagesticktoleftContainer;
