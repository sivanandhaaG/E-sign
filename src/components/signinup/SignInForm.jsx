import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { loginWithPassword, forgetverifytoken } from "../../app/api/userApi";
import { setUser } from "../../app/reducers/userSlice";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import RazorpayModal from "../common/RazorPay/RazorpayModal";
import "./signup.css";
import { useDisclosure } from "@chakra-ui/react";
import RazorpayPage from "../common/RazorPay/Subscription";

function  SignInForm() {
  const [formData, setFormData] = useState({
    email: localStorage.getItem("useremail") || "",
    password: "",
  });

  const [userRole, setUserRole] = useState("");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalType, setModalType] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [paymentType, setPaymentType]= useState("");
 
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.paymentType) {
      setPaymentType(storedUser.paymentType);
    }
  }, [paymentType]); 
  
  const { mutate, isLoading } = useMutation(loginWithPassword, {
    onSuccess: (data) => {
      toast.success("Successfully Logged In");
      
      const userData = data.data;
      console.log(userData, "userData");
  
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setUser(userData));
  
      const updatedPaymentType = userData?.paymentType;
      setPaymentType(updatedPaymentType);
      console.log(updatedPaymentType, "Updated paymentType");
  
      if (!updatedPaymentType) {
        localStorage.setItem("showPaymentModal", "true");
        navigate("/subscribtion");
      } else {
        navigate("/documents");
      }
    },
    onError: (error) => {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    },
  });
  

  // const { mutate, isLoading } = useMutation(loginWithPassword, {
  //   onSuccess: (data) => {
  //     toast.success("Successfully Logged In");
  //     const userData = data.data;
  //     console.log(userData, "userData");
  //     setUserRole(userData?.role);
  //     localStorage.setItem("user", JSON.stringify(userData));
  //     dispatch(setUser(userData));

  //     if (!userData?.paymentType) {
  //       localStorage.setItem("showPaymentModal", "true");
  //     }

  //     if(paymentType) {
  //       navigate("/documents");
  //     }
  //     else {
  //       navigate("/subscribtion");
  //     }
  //   },
  //   onError: (error) => {
  //     if (error.response?.data?.message) {
  //       toast.error(error.response.data.message);
  //     }
  //   },
  // });

  // const { mutate, isLoading } = useMutation(loginWithPassword, {
  //   onSuccess: (data) => {
  //     toast.success("Successfully Logged In");
  
  //     const userData = data?.data;
  //     console.log(userData, "userData");
  
  //     if (!userData.paymentType) {
  //       userData.paymentType = ""; 
  //     }
  
  //     localStorage.setItem("user", JSON.stringify(userData));
  
  //     dispatch(setUser(userData));

  //     if (!userData.paymentType) {
  //       localStorage.setItem("showPaymentModal", "true");
  //     }
  
  //     navigate("/subscribtion");
  //   },
  //   onError: (error) => {
  //     if (error.response?.data?.message) {
  //       toast.error(error.response.data.message);
  //     }
  //   },
  // });
  
  const { mutate: verifyToken, isLoading: verifying } = useMutation(
    forgetverifytoken,
    {
      onSuccess: (data) => {
        if (data?.data?.reset_token) {
          setFormData((prevData) => ({
            ...prevData,
            reset_token: data.data.reset_token,
          }));
          toast.success("Token verified successfully");
        }
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Invalid reset token");
      },
    }
  );
  const handlepop = () => {
    setModalType();
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  
    if (name === "password") {
      sessionStorage.setItem("userPassword", value);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>
            <span className="signup-label"> Email </span>
            <span className="signup-label-mandatory"> * </span>{" "}
          </Form.Label>

          <Form.Control
            type="email"
            placeholder="Enter Email Id"
            className="signup-placeholder"
            name="email"
            autoComplete="off"
            // value={formData.email}
            onChange={handleChange}
            required
            style={{ maxWidth: "60%" }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            <span className="signup-label"> Password </span>
            <span className="signup-label-mandatory"> * </span>{" "}
          </Form.Label>
          <Form.Control
            className="signup-placeholder"
            type="password"
            placeholder="Enter Password"
            name="password"
            autoComplete="off"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ maxWidth: "60%" }}
          />
        </Form.Group>

        <div className="d-flex justify-content-between mt-2">
          <a href="/forgot-password" className="forgot-password">
            Forgot Password?{" "}
            <span className="resetLink">Click here to Reset</span>
          </a>
        </div>

        <Button
          disabled={isLoading}
          type="submit"
          size="md"
          className="mx-0 my-4 py-2 btn-bg-indigo"
        >
          Submit
        </Button>
      </Form>


    </>
  );
}

export default SignInForm;
