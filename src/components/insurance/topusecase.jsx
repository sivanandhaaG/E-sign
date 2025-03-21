import { FaCheck } from "react-icons/fa";

const Topusecase = () => {
  return (
    <div className="docusign-realtors pt-0">
      <h1 className="static-page-main-heading">Top use cases for insurance</h1>
      <p className="static-para">
        Digitize critical agreements across the customer lifecycle.
      </p>
      <div className="grid-warper">
        <div>
          <div className="d-flex align-items-center gap-2">
            <FaCheck />
            <p className="static-para">Applications</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaCheck />
            <p className="static-para">Accident reports</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaCheck />
            <p className="static-para">Change of address</p>
          </div>
        </div>
        <div>
          <div className="d-flex align-items-center gap-2">
            <FaCheck />
            <p className="static-para">Coverage selection forms</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaCheck />
            <p className="static-para">Medical release authorizations</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaCheck />
            <p className="static-para">Renewals and cancellations</p>
          </div>
        </div>
        <div>
          <div className="d-flex align-items-center gap-2">
            <FaCheck />
            <p className="static-para">Disclosures</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaCheck />
            <p className="static-para">Total loss forms</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <FaCheck />
            <p className="static-para">Bill presentment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topusecase;
