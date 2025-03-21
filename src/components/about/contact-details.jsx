
const Contactdetails = ({ heading, action, subheading }) => {
  return (
    <div className="contact-d">
      <div className="start-free-t-card-1">
        <div>
          <h1 className="static-page-main-heading-white d-flext justify-content-start">
            {heading}
          </h1>
          <p className="static-para-white">{subheading}</p>
          <div className="d-flex justify-content-start">{action}</div>
        </div>
      </div>
      <div className="start-free-t-card-2">
        <div className="">
          <h1 className="static-page-main-heading-white pt-4">Contact Sales</h1>
          <div className="">
            <div className="d-flex row gap-3">
              <p className="static-para-white">
                Our team would love to help you find the perfect fit of products
                and solutions.
              </p>
              <a className="border-top static-para-white" href="/">
                1 -877-720-2040
              </a>
              <a className="border-top static-para-white" href="/">
                Send a Massage
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactdetails;
