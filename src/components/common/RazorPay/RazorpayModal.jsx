import React, { useState, useEffect } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  Stack,
  Button,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import PricingCard from "../../subscription/PricingCard";
import {
  ContactUs,
  CreateOrder,
  RazorPay,
  loginWithPassword,
} from "../../../app/api/userApi";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@chakra-ui/react";
import { setUser } from "../../../app/reducers/userSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useMutation } from "react-query";

const RazorpayModal = ({
  isOpen,
  onClose,
  billingCycle,
  setBillingCycle,
  user,
  role,
  type,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  // const role = JSON.parse(localStorage.getItem("user"))?.role;
  const [submissionStatus, setSubmissionStatus] = useState("");
  const phoneNumber = JSON.parse(localStorage.getItem("user"))?.phoneNumber;
  console.log(phoneNumber, "phoneNumber");
  const email = JSON.parse(localStorage.getItem("user"))?.email;
  const firstName = JSON.parse(localStorage.getItem("user"))?.firstName;
  const middleName = JSON.parse(localStorage.getItem("user"))?.middleName;
  const lastName = JSON.parse(localStorage.getItem("user"))?.lastName;
  const paymentType = JSON.parse(
    localStorage.getItem("paymentType")
  )?.paymentType;
  const {
    isOpen: isContactOpen,
    onOpen: onContactOpen,
    onClose: onContactClose,
  } = useDisclosure();
  const {
    isOpen: isSuccessOpen,
    onOpen: onSuccessOpen,
    onClose: onSuccessClose,
  } = useDisclosure();
  const [contactForm, setContactForm] = useState({
    fullName: `${firstName} ${middleName} ${lastName}`,
    email: email,
    phone: phoneNumber,
    message: "",
  });

  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => console.log("Razorpay script loaded");
      document.body.appendChild(script);
    }
  }, []);

  const { mutate: loginUser, isLoading } = useMutation(loginWithPassword, {
    onSuccess: (data) => {
      const userData = data.data;

      console.log(userData, "Updated User Data after Payment");

      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setUser(userData));

      navigate("/documents");
    },
    onError: (error) => {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    },
  });

  const handlePayment = async (amount, plan) => {
    try {
      const type = plan === "free" ? "free" : "pro";

      if (type === "free") {
        // Free Plan Payload
        const freePlanPayload = {
          amount: 0, // Free plan should have 0 amount
          currency: "INR",
          email,
          fullName: `${firstName} ${middleName} ${lastName}`,
          phoneNumber,
          type: "free",
          package: billingCycle,
        };

        // Directly store free plan in backend
        const response = await CreateOrder(freePlanPayload);

        if (!response.data || !response.data.success) {
          toast.error(" Error activating Free plan.");
          return;
        }

        toast.success(" Free plan activated successfully!");

        // Ensure loginUser is called
        loginUser({ email, password: sessionStorage.getItem("userPassword") });

        navigate("/");
        return;
      }

      // Razorpay Options for Paid Plan (Pro)
      const options = {
        key: "rzp_test_VneipD1TZu0Xav",
        amount: amount * 100, // Convert to paise
        currency: "INR",
        name: "E-Sign",
        description: `Payment for ${plan} Plan`,
        handler: async function (paymentResponse) {
          try {
            // Only create order after successful payment
            const paidPayload = {
              amount,
              currency: "INR",
              email,
              fullName: `${firstName} ${middleName} ${lastName}`,
              phoneNumber,
              type: "pro",
              package: billingCycle,
              paymentId: paymentResponse.razorpay_payment_id, // Store payment details
            };

            const response = await CreateOrder(paidPayload);

            if (!response.data || !response.data.success) {
              toast.error("Error completing Pro plan activation.");
              return;
            }

            toast.success(" Pro plan activated successfully!");

            // Ensure loginUser is called after successful payment
            loginUser({
              email,
              password: sessionStorage.getItem("userPassword"),
            });

            navigate("/");
          } catch (error) {
            console.error(" Error completing payment:", error);
            toast.error("Error processing payment.");
          }
        },
        prefill: {
          name: `${firstName} ${middleName} ${lastName}`,
          email,
          contact: phoneNumber,
        },
        theme: { color: "#805AD5" },
      };

      // Open Razorpay Payment Gateway
      setTimeout(() => {
        const rzp = new window.Razorpay(options);
        rzp.open();
      }, 300);
    } catch (error) {
      console.error(" Error in payment:", error);
      toast.error("Error processing payment.");
    }
  };

  const handleContactSubmit = async () => {
    try {
      const response = await ContactUs(contactForm);
      console.log(response, "response");
      if (response.status === 201) {
        onContactClose();
        setSubmissionStatus(
          "Thank you for reaching out! Your message has been successfully submitted. We'll get back to you shortly. 😊"
        );

        onSuccessOpen();
        onClose();
      } else {
        toast.success("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error(" Error submitting contact form:", error);
      toast.success(" Error submitting contact form:", error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" trapFocus={false}>
        <ModalOverlay />
        <ModalContent>
          <Box
            bgGradient="linear(to-b, #F3ECFF, #FFFFFF)"
            borderRadius="xl"
            p={6}
          >
            <ModalHeader textAlign="center">Choose Your Plan</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6} maxH="80vh" overflowY="auto">
              <VStack spacing={4}>
                <Box
                  bg="white"
                  borderRadius="full"
                  p="4px"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  maxW="600px"
                  w={["95%", "80%", "600px"]}
                  h={["45px", "50px", "60px"]}
                  boxShadow="md"
                  position="relative"
                  cursor="pointer"
                  transition="all 0.3s ease"
                  onClick={() =>
                    setBillingCycle((prev) =>
                      prev === "monthly" ? "yearly" : "monthly"
                    )
                  }
                >
                  <Box
                    position="absolute"
                    left={
                      billingCycle === "monthly" ? "4px" : "calc(100% - 50%)"
                    }
                    w={["47%", "48%", "298px"]}
                    h={["38px", "45px", "52px"]}
                    borderRadius="full"
                    bgGradient="linear(to-r, #805AD5, #805AD5)"
                    transition="all 0.3s ease"
                  />
                  <Text
                    zIndex="1"
                    flex="1"
                    textAlign="center"
                    fontSize={["sm", "md", "lg"]}
                    fontWeight="bold"
                    color={billingCycle === "monthly" ? "white" : "gray.600"}
                    style={{ margin: "10px" }}
                  >
                    Monthly
                  </Text>
                  <Text
                    zIndex="1"
                    flex="1"
                    textAlign="center"
                    fontSize={["sm", "md", "lg"]}
                    fontWeight="bold"
                    color={billingCycle === "yearly" ? "white" : "gray.600"}
                    style={{ margin: "10px" }}
                  >
                    Yearly (Save 10%)
                  </Text>
                </Box>

                <Stack
                  spacing={6}
                  justify="center"
                  mt={6}
                  align="stretch"
                  direction={["column", "row"]}
                >
                  {/* Pricing Cards Rendering */}
                  {role === "CORPORATE_ADMIN" ? (
                    <>
                      {type && (type == "pro" || type == "free") ? (
                        ""
                      ) : (
                        <PricingCard
                          title="Free"
                          price={0}
                          features={[
                            "Create 5 documents/month",
                            "1 user",
                            "1 signature template",
                          ]}
                          onBuy={() =>
                            handlePayment(
                              billingCycle === "monthly" ? 0 : 0,
                              "free"
                            )
                          }
                          isCustomfree
                        />
                      )}
                      {type && type == "pro" ? (
                        ""
                      ) : (
                        <PricingCard
                          title="Pro"
                          price={billingCycle === "monthly" ? 2500 : 2250}
                          features={[
                            "Create 10 documents/month",
                            "Up to 10 users",
                            "Up to 4 signature templates",
                          ]}
                          onBuy={() =>
                            handlePayment(
                              billingCycle === "monthly" ? 2500 : 2250,
                              "Pro"
                            )
                          }
                        />
                      )}
                      <PricingCard
                        title="Enterprise"
                        price="Let's Talk!"
                        features={[
                          "Unlimited documents",
                          "Custom user limits",
                          "Advanced signature templates",
                          "Priority support",
                          "Contact support for pricing",
                        ]}
                        isCustom
                        onContactOpen={onContactOpen}
                      />
                    </>
                  ) : (
                    <>
                      {type && (type == "pro" || type == "free") ? (
                        ""
                      ) : (
                        <PricingCard
                          title="Free"
                          price={0}
                          features={[
                            "Create 5 documents/month",
                            "All customizations available",
                            "1 signature template",
                          ]}
                          onBuy={() =>
                            handlePayment(
                              billingCycle === "monthly" ? 0 : 0,
                              "free"
                            )
                          }
                          isCustomfree
                        />
                      )}
                      {type && type == "pro" ? (
                        ""
                      ) : (
                        <PricingCard
                          title="Pro"
                          price={billingCycle === "monthly" ? 3800 : 3420}
                          features={[
                            "Create 10 documents/month",
                            "All customizations available",
                            "Up to 2 signature templates",
                          ]}
                          onBuy={() =>
                            handlePayment(
                              billingCycle === "monthly" ? 3800 : 3420,
                              "Pro"
                            )
                          }
                        />
                      )}
                      <PricingCard
                        title="Enterprise"
                        price="Let's Talk!"
                        features={[
                          "Unlimited documents",
                          "Custom user limits",
                          "Advanced signature templates",
                          "Priority support",
                          "Contact support for pricing",
                        ]}
                        isCustom
                        onContactOpen={onContactOpen}
                      />
                    </>
                  )}
                </Stack>
              </VStack>
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>

      <Modal isOpen={isContactOpen} onClose={onContactClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Contact Us</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Input
                placeholder="Full Name"
                value={contactForm.fullName}
                onChange={(e) =>
                  setContactForm({ ...contactForm, fullName: e.target.value })
                }
              />
              <Input
                placeholder="Email"
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm({ ...contactForm, email: e.target.value })
                }
              />
              <Input
                placeholder="Phone Number"
                value={contactForm.phone}
                onChange={(e) =>
                  setContactForm({ ...contactForm, phone: e.target.value })
                }
              />
              <Textarea
                placeholder="Your Message"
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
              />
              <Button colorScheme="purple" onClick={handleContactSubmit}>
                Submit
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isSuccessOpen} onClose={onSuccessClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Success</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text color="green.500" fontSize="lg" textAlign="center">
              Thank you for reaching out! Your message has been successfully
              submitted. We'll get back to you shortly. 😊
            </Text>
            <Button
              colorScheme="purple"
              w="full"
              mt={4}
              onClick={onSuccessClose}
            >
              OK
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RazorpayModal;
