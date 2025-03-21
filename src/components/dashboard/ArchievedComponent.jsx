import Tablecomponet from "../ReusableTable/Tablecomponet";
import { useState, useEffect } from "react";
import { getArchievedDocuments } from "../../app/api/userApi";
import { useMutation } from "react-query";
import AntDesign from "../common/antDesignTable/AntTable";
import moment from "moment";
import { HiDocumentArrowDown } from "react-icons/hi2";
import { Button, Dropdown } from "antd";
import { Tooltip } from "@chakra-ui/react";
import { Tag } from "antd";
import toast, { Toaster } from "react-hot-toast";

const ArchievedComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const isMobile = window.innerWidth < 768;
  console.log(data, "archievedData");

  const mutation = useMutation({
    mutationFn: async () => {
      setLoading(true);
      try {
        const response = await getArchievedDocuments();
        return response;
      } finally {
        setLoading(false);
      }
    },
    onSuccess: (responseData) => {
      setData(responseData?.data?.data);
    },
    onError: (error) => {
      console.error("API call failed:", error);
      toast.error("Failed to fetch archived documents");
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  // const mutation = useMutation({
  //   mutationFn: async () => await getEsignRequestByStatus("ARCHIEVED"),
  //   onSuccess: (responseData) => {
  //     setData(responseData.data);
  //   },
  //   onError: (error) => {
  //     console.error("API call failed:", error);
  //   },
  // });

  // useEffect(() => {
  //   // mutation.mutate();
  //   fetchArchievedData();
  // }, []);

  const limitReached = data?.[0]?.limitReached;

  const showStatus = (status) => {
    switch (status) {
      case "COMPLETED":
        return "Signed";
      case "EXPIRED":
        return "Expired";
      case "PENDING":
        return "Not Yet Signed";
      default:
        return "Unknown";
    }
  };

  const columns = [
    {
      title: "DOCUMENT NAME",
      width: 200,
      dataIndex: "documentName",
      fixed: isMobile ? "" :"left" ,
    },

    {
      title: "REFERENCE NUMBER",
      width: 180,
      dataIndex: "referenceNo",
    },
    {
      title: "NO OF RECIEVERS",
      width: 150,
      dataIndex: "noOfRecivers",
    },
    {
      title: "PENDING SIGNATURE",
      width: 180,
      dataIndex: "pendingSignatures",
    },
    {
      title: "RECIEVERS NAME",
      width: 200,
      dataIndex: "receiversName",
      render: (receivers) => {
        if (!receivers || receivers.length === 0) return "-";
        const firstReceivers = receivers[0];
        const remainingCount = receivers.length - 1;

        return remainingCount > 0 ? (
          <Tooltip
            hasArrow
            aria-label="Email List"
            placement="top"
            bg="gray.600"
            color="white"
            p={2}
            borderRadius="5px"
            label={
              <div style={{ textAlign: "left" }}>
                {receivers.map((receivers, i) => (
                  <div key={i}>{receivers || "-"}</div>
                ))}
              </div>
            }
          >
            <div>
              <p style={{ marginBottom: "0px" }}>{firstReceivers}</p>
              <p
                style={{
                  color: "blue",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                +{remainingCount} more
              </p>
            </div>
          </Tooltip>
        ) : (
          firstReceivers || "-"
        );
      },
    },

    {
      title: "EMAIL ID",
      width: 250,
      dataIndex: "email",
      render: (emails) => {
        if (!emails || emails.length === 0) return "-";
        const firstEmail = emails[0];
        const remainingCount = emails.length - 1;

        return remainingCount > 0 ? (
          <Tooltip
            hasArrow
            aria-label="Email List"
            placement="top"
            bg="gray.600"
            color="white"
            p={2}
            borderRadius="5px"
            label={
              <div style={{ textAlign: "left" }}>
                {emails.map((email, i) => (
                  <div key={i}>{email || "-"}</div>
                ))}
              </div>
            }
          >
            <div>
              <p style={{ marginBottom: "0px" }}>{firstEmail}</p>
              <p
                style={{
                  color: "blue",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                +{remainingCount} more
              </p>
            </div>
          </Tooltip>
        ) : (
          firstEmail || "-"
        );
      },
    },
    {
      title: "DOCUMENT",
      dataIndex: "documentLink",
      key: "documentLink",
      width: 150,
      render: (text) =>
        text ? (
          <Tooltip
            label="Download Document"
            hasArrow
            aria-label="Email List"
            placement="top"
            bg="gray.600"
            color="white"
            p={2}
            borderRadius="5px"
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                const link = document.createElement("a");
                link.href = text;
                link.setAttribute("download", "document.pdf");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <HiDocumentArrowDown
                style={{ fontSize: "22px", color: "#1890ff" }}
              />
            </Button>
          </Tooltip>
        ) : (
          "-"
        ),
    },

    {
      title: "STATUS",
      width: 180,
      dataIndex: "status",
      render: (status) => {
        let color = "";

        switch (status) {
          case "PENDING":
            color = "gold";
            break;
          case "COMPLETED":
          case "SIGNED":
            color = "green";
            break;
          case "EXPIRED":
            color = "red";
            break;
          default:
            color = "gray";
        }

        return (
          <Tag
            color={color}
            style={{
              padding: "5px 12px",
              borderRadius: "15px",
              fontWeight: "500",
              fontSize: "12px",
              textAlign: "center",
              minWidth: "120px",
            }}
          >
            {showStatus(status)}
          </Tag>
        );
      },
    },

    {
      title: "DATE",
      width: 230,
      dataIndex: "updatedAt",
    },
  ];

  const dataSource = data?.map((item, i) => ({
    key: i,
    documentName: item?.documentDetails?.documentName || "-",
    documentId: item?.documentDetails?.documentId || "-",
    referenceNo: item?.documentReferenceNumber || "-",
    noOfRecivers: item?.receivers?.length || 0,
    pendingSignatures:
      item?.receivers?.filter((receiver) => receiver.status !== "SIGNED")
        .length || 0,
    receiversName: item?.receivers?.map((item) => item.name) || [],
    email: item?.receivers?.map((item) => item.email) || [],
    documentLink: item?.editedDocumentFileUrl || "-",
    status: item?.status || "Unknown",
    updatedAt: item?.updatedAt
      ? moment(item.updatedAt).format("Do MMM YYYY, h:mm a")
      : "-",
    eSignRequestId: item?.eSignRequestId || "-",
    userId: item?.userId || "-",
  }));
  return (
    <div>
      <AntDesign
        dataSource={dataSource}
        columns={columns}
        title={"Archived Documents"}
        loading={loading}
        limitReached={limitReached}
      />
      <Toaster
              toastOptions={{
                duration: 4000,
                position: "top-right"
              }}
            />
    </div>
  );
};

export default ArchievedComponent;
