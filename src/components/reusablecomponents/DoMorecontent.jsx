import { Avatar } from "@chakra-ui/react";
import React from "react";
import { Button } from "react-bootstrap";
import { IoIosArrowForward } from "react-icons/io";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";

const DoMorecontent = ({ title }) => {
  return (
    <div>
      <div className="know-more-main-2">
        <div className=" mt-4 ">
          <p className="f-2 mb-4 static-page-main-heading">{title}</p>
          <div className="position-relative">
            <div className="d-flex flex-row scroll-x ">
              {[1, 2].map((item, index) => (
                <div key={index} className="d-flex">
                  <div className="know-more-content-3">
                    <div>
                      <Button variant="link" className="know-more-link">
                        <span className="d-flex align-items-center">
                          <span> United Airelines</span> <IoIosArrowForward />
                        </span>
                      </Button>
                      <p className="para-1 light-font">
                        Developed seamless HR workflows that save time and give
                        HR teams more visibility into processes
                      </p>
                      <div className="">
                        <h1 className="heading-2">
                          We needed the process to be user friendly, legally
                          immutable and trusted.
                        </h1>
                      </div>
                    </div>
                    <div className="d-flex align-items-baseline">
                      <div className="p-1 d-flex align-items-center">
                        <Avatar />
                        <div className="d-flex flex-column  m-2">
                          <span>
                            <b>Stefan Josephson</b>
                          </span>
                          <p className="light-font mb-0">
                            Senior Manager of IT Application Development
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="know-more-content-3">
                    <div>
                      <Button variant="link" className="know-more-link">
                        <span className="d-flex align-items-center">
                          <span> Explore more</span> <IoIosArrowForward />
                        </span>
                      </Button>
                      <p className="para-1 light-font">
                        Turns around agreements 95% faster
                      </p>
                    </div>
                    <div className="d-flex justify-content-start">
                      <iframe
                        title="Zerozilla"
                        height={"300"}
                        width={"100%"}
                        src="https://www.youtube.com/embed/AtQu5P6SFVk"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="actionwrapper ">
              <Button size="lg" variant="primary" className="round-button">
                <IoChevronBackOutline />
              </Button>
              <Button size="lg" variant="primary" className="round-button">
                <IoChevronForward />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoMorecontent;
