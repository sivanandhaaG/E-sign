import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import styles from "./CorporateDetailsForm.module.css";
import {
  getUserCorporateProfile,
  updateCorporateProfile,
} from "../../app/api/userApi";
import { useMutation, useQuery } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import "./CorporateDetailsForm.css"; // Custom styling for UI adjustments

function CorporateProfileForm() {
  const [profileData, setProfileData] = useState({
    username: "",
    website: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle changes from the rich text editor
  const handleBioChange = (value) => {
    setProfileData((prevData) => ({ ...prevData, bio: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleCorporateProfileUpdate(profileData);
  };

  const { refetch: refetchUserCorporateProfile } = useQuery(
    "corporate-profile",
    getUserCorporateProfile,
    {
      onSuccess: (data) => {
        if (data.data) {
          setProfileData(data.data);
        }
      },
    }
  );

  const {
    mutate: handleCorporateProfileUpdate,
    isLoading: isUpdatingCorporateProfile,
  } = useMutation(updateCorporateProfile, {
    onSuccess: (data) => {
      toast.success("Corporate Profile Updated Successfully");
    },
    onError: (error) => {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <Form className={styles.container} onSubmit={handleFormSubmit}>
      {/* Username Input */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="username" className="signup-label">
          Username
        </Form.Label>
        <InputGroup>
          <InputGroup.Text className="text-secondary bg-white">
            zillaesign.com/
          </InputGroup.Text>
          <Form.Control
            type="text"
            id="username"
            name="username"
            value={profileData.username}
            onChange={handleChange}
            placeholder="Enter a unique username"
            required
          />
        </InputGroup>
      </Form.Group>

      {/* Website Input */}
      <Form.Group className="mb-3">
        <Form.Label htmlFor="website" className="signup-label">
          Website
        </Form.Label>
        <InputGroup>
          <InputGroup.Text className="text-secondary bg-white">
            http://
          </InputGroup.Text>
          <Form.Control
            type="text"
            id="website"
            name="website"
            value={profileData.website}
            onChange={handleChange}
            placeholder="Enter company website"
            required
          />
        </InputGroup>
      </Form.Group>

      {/* Bio with Rich Text Editor */}
      <Form.Group>
        <Form.Label htmlFor="bio" className="signup-label">
          Bio
        </Form.Label>
        <ReactQuill
          theme="snow"
          value={profileData.bio}
          onChange={handleBioChange}
          className="bio-editor"
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["blockquote", "link"],
              ["clean"], // Remove formatting button
            ],
          }}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "list",
            "bullet",
            "blockquote",
            "link",
          ]}
        />
      </Form.Group>

      {/* Buttons */}
      <div className="py-4 d-flex justify-content-end">
        <Button
          size="md"
          className="mx-2 "
          style={{
            color: "black",
            backgroundColor: "white",
            border: "1px solid #C4C4C4",
          }}
          variant="outline-secondary"
          onClick={refetchUserCorporateProfile}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          size="md"
          className="btn btn-bg-indigo mx-2"
          style={{ backgroundColor: "#4F46E5", color: "white" }}
          disabled={isUpdatingCorporateProfile}
        >
          Save Changes
        </Button>
      </div>
    </Form>
  );
}

export default CorporateProfileForm;
