import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { set, useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import {
  createCompanyUser,
  updateCompanyUser,
  CorporateUserCreation,
  updateCorporateUser,
  getAllCorporateUsers,
} from "../../../app/api/userApi";
import toast, { Toaster } from "react-hot-toast";

const Addusers = ({
  show,
  setShow,
  fetchCompanyUsers,
  fetchCorporateUsers,
  setUserData,
  userData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const corporateDetailsId = JSON.parse(
    localStorage.getItem("user")
  ).corporateDetailsId;

  const onSubmit = async (data) => {
    const payload = {
      phoneNumber: data.phone,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      corporateRoles: data.role,
    };
    if (!userData?.userId) {
      payload.corporateDetailsId = corporateDetailsId;
      payload.email = data.email;
    }
    // if (!userData?.userId) {
    //   payload.password = data.password;
    // }
    // if (userData?.userId) {
    //   payload.userId = userData.userId;
    // }
    try {
      const response = userData?.userId
        ? await updateCorporateUser(userData?.userId, payload)
        : await CorporateUserCreation(payload);
      if (!userData?.userId && response.status === true) {
        toast.success(response?.message);
        fetchCorporateUsers();
        setUserData(null);
        reset();
        setShow(false);
      } else if (response.data.status === true) {
        toast.success(response?.data?.message);
        fetchCorporateUsers();
        setUserData(null);
        reset();
        setShow(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCorporateUsers();
  }, []);

  console.log(userData, "userDatauserData");

  useEffect(() => {
    if (userData?.userId) {
      setValue("firstName", userData.firstName);
      setValue("middleName", userData.middleName);
      setValue("lastName", userData.lastName);
      setValue("email", userData.email);
      setValue("phone", userData.phoneNumber);
      setValue("role", userData.corporateRoles);
    }
  }, [userData]);

  return (
    <div>
      <Modal
        show={show}
        onHide={() => {
          reset();
          setShow(false);
          setUserData(null);
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              {userData?.userId ? "Edit" : "Add"} Users
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Form>
              <Form.Label className="mb-1" htmlFor="firstName">
                Fist Name
              </Form.Label>
              <Form.Control
                className="m-1"
                type="text"
                id="firstName"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <div className="text-danger text-small">
                  This field is required
                </div>
              )}
              <Form.Label className="mb-1" htmlFor="middleName">
                Middle name
              </Form.Label>
              <Form.Control
                className="m-1"
                type="text"
                id="middleName"
                {...register("middleName", { required: false })}
              />

              <Form.Label className="mb-1" htmlFor="inputLastName">
                Last name
              </Form.Label>
              <Form.Control
                className="m-1"
                type="text"
                id="inputLastName"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <div className="text-danger">This field is required</div>
              )}
              <Form.Label className="mb-1" htmlFor="inputEmail">
                Email
              </Form.Label>
              <Form.Control
                className="m-1"
                type="email"
                disabled={userData?.userId}
                id="inputEmail"
                {...register("email", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <div className="text-danger">{errors.email.message}</div>
              )}
              <Form.Label className="mb-1" htmlFor="inputPhone">
                Phone
              </Form.Label>
              <Form.Control
                className="m-1"
                type="phone"
                id="inputPhone"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid phone number",
                  },
                })}
              />
              {errors.phone && (
                <div className="text-danger">{errors.phone.message}</div>
              )}

              {/* Roles Dropdown */}
              <Form.Label className="mb-1" htmlFor="role">
                Role
              </Form.Label>
              <Form.Select
                className="m-1"
                id="role"
                {...register("role", { required: true })}
              >
                <option value="CREATOR">Creator</option>
                <option value="SIGNER">Signer</option>
              </Form.Select>
              {errors.role && (
                <div className="text-danger">This field is required</div>
              )}

              {/* {!userData?.userId && (
                <>
                  <Form.Label className="mb-1" htmlFor="password">
                    password
                  </Form.Label>
                  <Form.Control
                    className="m-1"
                    type="password"
                    id="password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                      minLength: {
                        value: 8,
                        message: "Password must have at least 8 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password.message}</div>
                  )}
                </>
              )} */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShow(false);
                reset();
                setUserData(null);
              }}
            >
              Close
            </Button>
            <Button variant="primary" className="action-aboutus" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default Addusers;
