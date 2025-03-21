import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Badge,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { ContactUs } from "../../../src/app/api/userApi";
import { CreateOrder, RazorPay } from "../../app/api/userApi";
import { useNavigate } from "react-router-dom";

const PricingPlans = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
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

  const role = JSON.parse(localStorage.getItem("user"))?.role;

  const phoneNumber = JSON.parse(localStorage.getItem("user"))?.phoneNumber;
  const email = JSON.parse(localStorage.getItem("user"))?.email;
  const firstName = JSON.parse(localStorage.getItem("user"))?.firstName;
  const middleName = JSON.parse(localStorage.getItem("user"))?.middleName;
  const lastName = JSON.parse(localStorage.getItem("user"))?.lastName;

  const [contactForm, setContactForm] = useState({
    fullName: `${firstName} ${middleName} ${lastName}`,
    email: email,
    phone: phoneNumber,
    message: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState("");

  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const HandleNavigate = () => {
    navigate("/dashboard");
  };

  // const handlePayment = (amount, plan) => {
  //   const options = {
  //     key: "rzp_test_HJG5Rtuy8Xh2NB",
  //     amount: amount * 100,
  //     currency: "INR",
  //     name: "E-Sign",
  //     description: `Payment for ${plan} Plan`,
  //     image: "https://zilla-esign.s3.us-east-2.amazonaws.com/1738923138134-images.png",
  //     handler: function (response) {
  //       alert(`✅ Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
  //     },
  //     prefill: {
  //       name: `${firstName} ${middleName} ${lastName}`,
  //       email: email,
  //       contact: phoneNumber,
  //     },
  //     theme: {
  //       color: "#805AD5",
  //     },
  //   };

  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  // };

  const handlePayment = async (amount, plan) => {
    try {
      const payload = {
        amount: amount,
        currency: "INR",
        email: email,
        fullName: `${firstName} ${middleName} ${lastName}`,
        phoneNumber: phoneNumber,
      };

      console.log("Sending payload =>", payload);

      const response = await CreateOrder(payload);
      console.log("Axios response =>", response);

      if (!response.data || !response.data.success) {
        alert("❌ Error creating Razorpay order.");
        return;
      }

      const { orderId, amount: orderAmount, currency } = response.data;

      const options = {
        key: "rzp_test_VneipD1TZu0Xav",
        amount: orderAmount * 100,
        currency: currency,
        order_id: orderId,
        name: "E-Sign",
        method: {
          upi: false,
          card: true,
          netbanking: true,
          wallet: true,
        },
        description: `Payment for ${plan} Plan`,
        image:
          "https://zilla-esign.s3.us-east-2.amazonaws.com/1738923138134-images.png",
        handler: async function (paymentResponse) {
          try {
            console.log("Closing Razorpay modal...");
            rzp.close();

            const verifyResponse = await RazorPay(paymentResponse);
            if (verifyResponse && verifyResponse.success) {
              alert(
                `✅ Payment Successful! Payment ID: ${paymentResponse.razorpay_payment_id}`
              );
              navigate("/");
            } else {
              alert("❌ Payment verification failed.");
            }
          } catch (error) {
            console.error("❌ Error verifying payment:", error);
            alert("❌ Payment verification failed due to an error.");
          }
        },
        prefill: {
          name: `${firstName} ${middleName} ${lastName}`,
          email: email,
          contact: phoneNumber,
        },
        theme: { color: "#805AD5" },
      };

      console.log("Opening Razorpay modal...");

      setTimeout(() => {
        const rzp = new window.Razorpay(options);
        rzp.open();
        console.log("Razorpay modal opened successfully.");

        // Focus back to input field (optional)
        document.getElementById("your-input-field-id")?.focus();
      }, 300);
    } catch (error) {
      console.error("❌ Error in payment:", error);
      alert("Error processing payment.");
    }
  };

  //   const handleContactSubmit = () => {
  //     setSubmissionStatus(
  //       "Thank you for reaching out! Your message has been successfully submitted. We'll get back to you shortly. 😊"
  //     );
  //     onContactClose();
  //     onSuccessOpen();
  //     onClose();
  //   };
  const handleContactSubmit = async () => {
    try {
      const response = await ContactUs(contactForm);

      if (response.status) {
        setSubmissionStatus(
          "✅ Thank you for reaching out! Your message has been successfully submitted. We'll get back to you shortly. 😊"
        );
        onContactClose();
        onSuccessOpen();
        onClose();
      } else {
        toast.success("❌ Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("❌ Error submitting contact form:", error);
      toast.success("❌ Error submitting contact form:", error);
    }
  };

  return (
    <Box
      bgGradient="linear(to-b, #F3ECFF, #FFFFFF)"
      minH="100vh"
      py={12}
      textAlign="center"
      mt={10}
    >
      {/* <Container maxW="container.lg">
        <VStack spacing={3}>
          <Heading fontSize={["xl", "2xl"]}>Choose your right plan!</Heading>
          <Text color="gray.600" fontSize={["sm", "md"]}>
            Select from best plans, ensuring a perfect match. Need more or less?
            Customize your subscription for a seamless fit!
          </Text>
          <Button colorScheme="purple" size="lg" onClick={onOpen}>
            Show Plans
          </Button>
        </VStack>
      </Container> */}

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
                      prev === "monthly" ? "quarterly" : "monthly"
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
                    color={billingCycle === "quarterly" ? "white" : "gray.600"}
                    style={{ margin: "10px" }}
                  >
                    Quarterly (Save 10%)
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
                      <PricingCard
                        title="Free"
                        price={0}
                        features={[
                          "Create 5 documents/month",
                          "1 user",
                          "1 signature template",
                        ]}
                        isCustomfree
                      />
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
                      <PricingCard
                        title="Free"
                        price={0}
                        features={[
                          "Create 5 documents/month",
                          "All customizations available",
                          "1 signature template",
                        ]}
                        isCustomfree
                      />
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
    </Box>
  );
};

const PricingCard = ({
  title,
  price,
  features,
  isCustom = false,
  onBuy,
  isCustomfree = false,
  onContactOpen,
}) => {
  const navigate = useNavigate();
  const HandleNavigate = () => {
    navigate("/");
  };

  return (
    <Box
      bgGradient="linear(to-b, #F3ECFF, #FFFFFF)"
      borderRadius="xl"
      boxShadow="lg"
      p={6}
      textAlign="center"
      maxW="md"
      w="full"
      minH="500px"
      display="flex"
      flexDirection="column"
      transition="all 0.4s ease"
      _hover={{
        bgGradient: "linear(to-b, #E0D4FF, #FFFFFF)",
        boxShadow: "2xl",
      }}
    >
      <Badge
        colorScheme={isCustom ? "gray" : "purple"}
        borderRadius="full"
        px={4}
        py={1}
        mb={3}
      >
        {title}
      </Badge>
      <Text color="gray.600" fontSize="sm">
        {isCustom
          ? "If these plans don’t fit, let’s create one that suits you!"
          : `Perfect for those who need assistance enhancing their website.`}
      </Text>
      <Heading size={isCustom ? "md" : "lg"} mt={2}>
        {price}
        {!isCustom && (
          <Text as="span" fontSize="sm" color="gray.500">
            {" "}
            /month
          </Text>
        )}
      </Heading>
      <VStack
        align="start"
        spacing={2}
        mt={4}
        fontSize="sm"
        color="gray.600"
        flex="1"
        width="100%"
      >
        {features.map((feature, index) => (
          <Box key={index} display="flex" alignItems="flex-start" width="100%">
            <Text as="span" mr={2} mt="2px" flexShrink={0}>
              ✔
            </Text>
            <Text
              flex="1"
              wordBreak="break-word"
              whiteSpace="normal"
              textAlign="left"
            >
              {feature}
            </Text>
          </Box>
        ))}
      </VStack>

      {!isCustom && !isCustomfree && (
        <Button colorScheme="gray" w="full" mt={4} onClick={onBuy}>
          Buy Now
        </Button>
      )}
      {!isCustom && isCustomfree && (
        <Button colorScheme="gray" w="full" mt={4} onClick={HandleNavigate}>
          Free
        </Button>
      )}

      {isCustom && (
        <Button colorScheme="purple" w="full" mt={4} onClick={onContactOpen}>
          Contact Us
        </Button>
      )}
    </Box>
  );
};

export default PricingPlans;
