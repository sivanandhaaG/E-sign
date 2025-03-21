import Tablecomponet from "../ReusableTable/Tablecomponet";
import { useQuery,useMutation } from "react-query";
import { useState,useEffect } from "react";
import { getEsignRequestByStatus } from "../../app/api/userApi";

const ExpiredComponent = () => {
  const [data, setData] = useState([]); 

  const mutation = useMutation({
    mutationFn: async () => await getEsignRequestByStatus("EXPIRED"),
    onSuccess: (responseData) => {
      setData(responseData.data); 
    },
    onError: (error) => {
      console.error("API call failed:", error);
    },
  });

  useEffect(() => {
    mutation.mutate(); 
  }, []);
 
  
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = data?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data?.length / itemsPerPage);
  return (
    <div>
      <Tablecomponet
        tablecolumn={column}
        tableData={currentData}
        tableName={"Expired Documents"}
        subheading={"Expired Documents"}
        addAction={<div />}
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
        data={data}

      />
    </div>
  );
};

export default ExpiredComponent;

const column = [
  {
    header: "Document Name",
    keyname: "documentName",
    filter: true,
  },
  {
    header: "Reference No",
    content: <></>,
    keyname: "documentReferenceNumber",
    filter: true,
  },
  {
    header: "No. of receivers",
    content: <></>,
    keyname: "index",
    filter: false,
  },
  {
    header: "Pending signature",
    content: <></>,
    keyname: "index",
    filter: false,
  },
  {
    header: "Receivers Name",
    content: <></>,
    keyname: "index",
    filter: false,
  },
  {
    header: "Email ID",
    content: <></>,
    keyname: "index",
    filter: false,
  },
  
  {
    header: "Document Link",
    content: <></>,
    keyname: "index",
    filter: false,
  },

  { header: "Status", keyname: "index", filter: false },
  {
    header: "Date",
    content: <></>,
    keyname: "index",
    filter: false,
  },
];
