import checked from "../../assets/images/general/check.svg";

const StartupEmploye = () => {
  return (
    <div className="start-up-employee">
      <div>
        <div>
          <div className="square">
            <div className="startup-employes-text-wrapper">
              <img src={checked} height={120} width={100} />
              <span className="static-subheading-white">
                Startups Employees Love
              </span>
              <span className="startup-employes-text-wrapper-bottom static-subheading color-blue">
                Best for Women 2022
              </span>
            </div>
          </div>
        </div>
        <div className="hexagon"></div>
      </div>
      <div>
        <div>
          <div className="square-red">
            <div className="startup-employes-text-wrapper">
              <img src={checked} height={120} width={100} />
              <span className="static-subheading-white">
                Startups Employees Love
              </span>
              <span className="startup-employes-text-wrapper-bottom color-red static-subheading">
                People Excellence 2022
              </span>
            </div>
          </div>
        </div>
        <div className="hexagon-red"></div>
      </div>
      <div>
        <div>
          <div className="square-purple">
            <div className="startup-employes-text-wrapper">
              <img src={checked} height={120} width={100} />
              <span className="static-subheading-white">
                Startups Employees Love
              </span>
              <span className="startup-employes-text-wrapper-bottom static-subheading color-purple">
                Best People Practices 2022
              </span>
            </div>
          </div>
        </div>
        <div className="hexagon-purple"></div>
      </div>
    </div>
  );
};

export default StartupEmploye;
