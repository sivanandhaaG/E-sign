import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown } from "react-bootstrap";
import "./index.css";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Toolbar = ({
  numPages,
  setNumPages,
  active,
  setActive,
  handleEsignSubmit,
}) => {
  const handleNext = () => {
    console.log("active", numPages);
    if (active < numPages) {
      setActive(active + 1);
    }
  };

  const handlePrevious = () => {
    if (active > 1) {
      setActive(active - 1);
    }
  };
  return (
    <div
      className="toolbars"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Button
        className="btn-bg-indigo"
        onClick={handlePrevious}
        disabled={active === 1}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic">{active}</Dropdown.Toggle>

        {/* <Dropdown.Menu>
          {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => {
            return (
              <Dropdown.Item
                onClick={() => {
                  setActive(page);
                }}
              >
                {page}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu> */}
        <Dropdown.Menu>
          {Array.from({ length: numPages }, (_, i) => i + 1).map((page) => (
            <Dropdown.Item
              key={page} 
              onClick={() => setActive(page)} 
            >
              {page}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Button
        className="btn-bg-indigo"
        onClick={handleNext}
        disabled={active === numPages}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </div>
  );
};

export default Toolbar;
