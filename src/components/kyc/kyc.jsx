import Tablecomponet from "./kycTable/Tablecomponet";
import KycForm from "./KycForm";

export default function Kyc() {
  return (
    <div className="">
      <Tablecomponet
        tablecolumn={column}
        tableData={tableData}
        tableName={"KYC"}
        addAction={<KycForm />}
        subheading={"KYC"}
      />
    </div>
  );
}

const column = [
  {
    header: "User ID",
    keyname: "userID",
    filter: true,
  },
  {
    header: "Session ID",
    keyname: "userID",
    filter: true,
  },
  {
    header: "Expiration",
    keyname: "Selfi",
    filter: false,
  },
  {
    header: "Selfi",
    keyname: "userID",
    filter: true,
  },
  {
    header: "Link",
    keyname: "userID",
    filter: true,
  },
];

const tableData = [
  {
    sessionID: "123",
    userid: "amar@123",
    expairation: "EXPIRATION",
    selfi:"selfi",
    link:"https://"
  },
  {
    sessionID: "123",
    userid: "amar@123",
    expairation: "EXPIRATION",
    selfi:"selfi",
    link:"https://"
  },{
    sessionID: "123",
    userid: "amar@123",
    expairation: "EXPIRATION",
    selfi:"selfi",
    link:"https://"
  },{
    sessionID: "123",
    userid: "amar@123",
    expairation: "EXPIRATION",
    selfi:"selfi",
    link:"https://"
  },
];
