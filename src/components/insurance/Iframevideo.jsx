import CenterHeading from "../reusablecomponents/CenterHeading";

const Iframevideo = ({ title, videoLink, actions }) => {
  return (
    <div>
      <div className="iframe-warper">
        <div className="get-more-heading-warper">
          <CenterHeading heading={title} subheading={""} />
        </div>
        <iframe
          title="Zerozilla"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded"
          src={videoLink}
        />
        <div className="iframe-warper-action">{actions}</div>
      </div>
    </div>
  );
};

export default Iframevideo;
