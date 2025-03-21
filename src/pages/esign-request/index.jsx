import React, { useState, useEffect } from "react";
import EsignRequest from "./EsignRequest";
import { useQuery } from "react-query";
import { getESignRequests } from "../../app/api/userApi";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Text,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";

export default function Index() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [securityCode, setSecurityCode] = useState("");
  const [apiSecurityCode, setApiSecurityCode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [isSigned, setIsSigned] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [active, setActive] = useState(1);

  const {
    data: eSignRequests,
    isLoading,
    isError,
    error,
  } = useQuery(
    ["eSignRequests", id, searchParams.get("receiverId")],
    async () => {
      if (!id) throw new Error("Missing eSignRequestId");

      const res = await getESignRequests(
        id,
        searchParams.get("receiverId"),
        ""
      );
      const eSignData = res?.data?.eSignRequest;

      if (eSignData) {
        const receiver = eSignData?.receivers?.find(
          (r) => r.receiverId === searchParams.get("receiverId")
        );

        if (receiver?.status === "SIGNED") {
          setIsSigned(true);
          setHasSigned(true);
        }

        setMarkers(res?.data?.markers || []);
        setActive(res?.data?.markers?.[0]?.pageNumber || 1);

        if (eSignData?.securityEnabled) {
          setApiSecurityCode(eSignData?.securityCode || "");
          onOpen();
        } else {
          setIsAuthenticated(true);
        }
      }

      return res?.data;
    },
    {
      staleTime: 1000 * 60 * 5,
      enabled: !!id,
      retry: false,
    }
  );

  useEffect(() => {
    setIsSubmitEnabled(
      securityCode.trim() === apiSecurityCode.trim() && securityCode !== ""
    );
  }, [securityCode, apiSecurityCode]);

  const handleSubmit = () => {
    if (isSubmitEnabled) {
      setIsAuthenticated(true);
      onClose();
    }
  };

  return (
    <>
      {isLoading && <Spinner size="xl" color="blue.500" />}

      {isError && error?.response?.status ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h1 style={{ color: "red", fontSize: "1.5rem", textAlign: "center" }}>
            {error?.response?.data?.message || "Error"}
          </h1>
        </div>
      ) : (
        <>
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Security Verification Required</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text mb={3}>
                  For your security, please enter the verification code sent to
                  your mobile. This step ensures that only authorized users can
                  access the document.
                </Text>
                <Input
                  placeholder="Enter Security Code"
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                  mb={3}
                />
                <Button
                  colorScheme="blue"
                  onClick={handleSubmit}
                  isDisabled={!isSubmitEnabled}
                  width="100%"
                >
                  Submit
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>

          {isAuthenticated && (
            <EsignRequest
              eSignRequests={eSignRequests}
              markers={markers}
              isSigned={isSigned}
              hasSigned={hasSigned}
              active={active}
              isLoading={isLoading}
              error={error}
              isError={isError}
            />
          )}
        </>
      )}
    </>
  );
}
