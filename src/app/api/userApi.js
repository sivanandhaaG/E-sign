import { USER_API } from "./utils";
// import { useSelector } from "react-redux";

// const user = useSelector((state) => state.user.user);

export const registerIndividual = async (formData) => {
  const response = await USER_API.post(
    "customer/v1/auth/signup-individual",
    formData
  );
  return response.data;
};

export const registerCorporate = async (formData) => {
  const response = await USER_API.post(
    "customer/v1/auth/signup-corporate",
    formData
  );
  return response.data;
};

export const verifyOTP = async (data) => {
  const response = await USER_API.post("/auth/verify-otp", data);
  return response.data;
};

export const loginWithPassword = async (data) => {
  const response = await USER_API.post("/auth/login-with-password", data);
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await USER_API.post(
    "customer/v1/auth/forgot-password",
    data
  );
  return response.data;
};

export const resendforgotPassword = async (data) => {
  const response = await USER_API.post(
    "customer/v1/auth/resend-forgot-password",
    data
  );
  return response.data;
};
export const forgetverifytoken = async (data) => {
  const response = await USER_API.post(
    "customer/v1/auth/verify-forgot-password-link",
    data
  );
  return response.data;
};
export const changePassword = async (data) => {
  const response = await USER_API.post(
    "customer/v1/auth/change-first-login-password",
    data
  );
  return response.data;
};
export const forgetPassword = async (data) => {
  const response = await USER_API.post("customer/v1/auth/reset-password", data);
  return response.data;
};
export const verifytoken = async (data) => {
  const response = await USER_API.post(
    "/customer/v1/auth/verify-first-login-password-link",
    data
  );
  return response.data;
};
export const getUserProfileDetails = async () => {
  const response = await USER_API.get("/user/profile");
  return response.data;
};

export const getUserCorporateDetails = async () => {
  const response = await USER_API.get("/user/corporate/details");
  return response.data;
};

export const getUserCorporateProfile = async () => {
  const response = await USER_API.get("/user/corporate/profile");
  return response.data;
};

export const updateUserProfileDetails = async (data) => {
  const response = await USER_API.put("/user/profile", data);
  return response.data;
};

export const updateCorporateDetails = async (data) => {
  const response = await USER_API.put("/user/corporate/details", data);
  return response.data;
};

export const updateCorporateProfile = async (data) => {
  const response = await USER_API.put("/user/corporate/profile", data);
  return response.data;
};

export const getUserSignature = async () => {
  const response = await USER_API.get("/user/signature");
  return response.data;
};

export const saveUserSignature = async (data) => {
  const response = await USER_API.post("/user/signature", data);
  return response.data;
};

export const createESignRequest = async (data) => {
  const response = await USER_API.post("/user/e-sign/request", data);
  return response.data;
};

export const resendESignRequest = async (data) => {
  const response = await USER_API.post("/user/resend-esign-request", data);
  return response.data;
};

export const sendNewESignRequest = async (data) => {
  const response = await USER_API.post(
    "/e-sign-request/send-reciver-new-request",
    data
  );
  return response.data;
};

export const getESignRequests = async (id, receiverId, ip) => {
  const response = await USER_API.get(
    `/e-sign-request/${id}?receiverId=${receiverId}&ip=${ip}`
  );
  return response.data;
};
export const getESignRequestsId = async (id) => {
  const response = await USER_API.get(
    `/public/e-sign-requestId?eSignRequestId=${id}`
  );
  return response.data;
};

export const getAllEsignRequest = async () => {
  const response = await USER_API.get("user/e-sign-request");
  return response.data;
};

// export const getSentDocuments = async () => {
//   const response = await USER_API.get("user/documents/sent");
//   return response.data;
// };
export const getSentDocuments = async () => {
  const response = await USER_API.get("user/e-sign-request?status=PENDING");
  return response.data;
};

export const getReceivedDocuments = async () => {
  const response = await USER_API.get("user/documents/received");
  return response.data;
};

export const getEsignRequestByStatus = async (status) => {
  const response = await USER_API.get(`user/e-sign-request?status=${status}`);
  return response.data;
};

export const getAllDocuments = async () => {
  const response = await USER_API.get("user/documents");
  return response.data;
};

export const fillESignRequest = async (data) => {
  const response = await USER_API.post("/e-sign-request/fill", data);
  return response.data;
};

export const fillDemoSignup = async (data) => {
  const response = await USER_API.post("/demo-sign-up", data);
  return response.data;
};

export const getAllCompanyUsers = (id, query) => {
  return USER_API.get(`/company-user/${id}/users?${query}`);
};

export const getAllCorporateUsers = (data) => {
  return USER_API.post("/user/all-corporate-user/details", data);
};

export const ContactUs = (data) => {
  return USER_API.post("/user/contact/admin", data);
};
export const createCompanyUser = (id, data) => {
  return USER_API.post(`/company-user/${id}/users`, data);
};

export const updateCompanyUser = (id, data) => {
  return USER_API.put(`/company-user/${id}/users/${data?.userId}`, data);
};

export const updateCorporateUser = (id, data) => {
  return USER_API.post(`/customer/v1/auth/update-corporate-user/${id}`, data);
};
export const deleteCorporateUser = (id) => {
  return USER_API.post(`/user/delete-corporate/profile/${id}`);
};
export const deleteCompanyUser = (id, userId) => {
  return USER_API.delete(`/company-user/${id}/users/${userId}`);
};

export const getDocumentDetailsId = (id) => {
  return USER_API.get(`/user/getdocuments/${id}`);
};

export const archieveDocument = (documentId, userId) => {
  return USER_API.post(`/user/archiveDocument/${documentId}/${userId}`);
};

export const getArchievedDocuments = () => {
  return USER_API.get("/user/getarchiveDocument");
};
// Folder APIs

export const CreateFolders = async (payload) => {
  const response = await USER_API?.post("/folder/createfolders", payload);
  return response?.data;
};

export const ViewDetails = async (id) => {
  return USER_API?.get(`e-sign-request/getdocumentdetails/${id}`);
};

// Get Folder List
export const GetFolderListDropDown = async (storedLoginUserID) => {
  return await USER_API?.get(`/folder/getfoldersbyuser/${storedLoginUserID}`);
};

export const GetFolderList = async (storedLoginUserID) => {
  const response = await USER_API?.get(
    `/folder/getfoldersbyuser/${storedLoginUserID}`
  );
  return response?.data;
};

export const EditFolder = async (payload) => {
  const folderId = localStorage.getItem("folderId"); // Get the latest folderId

  if (!folderId) {
    console.error("No folderId found in localStorage");
    return null;
  }

  try {
    const response = await USER_API?.put(
      `/folder/editfolder/${folderId}`,
      payload
    );
    return response?.data;
  } catch (error) {
    console.error("Error editing folder:", error);
    throw error;
  }
};

// Delete Folder

export const DeleteFolder = async (payload) => {
  const DeletefolderId = localStorage?.getItem("deletefolderId"); // Get the latest folderId

  if (!DeletefolderId) {
    console.error("No folderId found in localStorage");
    return null;
  }

  try {
    const response = await USER_API?.post(
      `/folder/deletefolder/${DeletefolderId}`,
      payload
    );
    return response?.data;
  } catch (error) {
    console?.error("Error deleting folder:", error);
    throw error;
  }
};

// addtofolder

export const AddToFolder = async (payload) => {
  const response = await USER_API?.post("/folder/addtofolder", payload);
  return response?.data;
};

// Get Document List by Folder /api/folder/getdocumentbyid

export const GetDocumentListByFolder = async (folderId = null) => {
  const storedFolderId = folderId || localStorage.getItem("FolderDetailID"); // Use passed ID or fallback to localStorage
  if (!storedFolderId) {
    console.error("No FolderDetailID found in localStorage.");
    return null;
  }

  try {
    const response = await USER_API.get(
      `/folder/getdocumentbyid/${storedFolderId}`
    );
    console.log("API Response:", response?.data); // Log response
    return response?.data;
  } catch (error) {
    console.error("Error fetching document list:", error);
    return null;
  }
};

// api/user/signature getSignatureDetails

export const getSignatureDetails = async (payload) => {
  const response = await USER_API.post("/user/signature-upload", payload);
  return response.data;
};

// /api/user/update-profile-pic/:userId

export const AddRecipient = async (payload) => {
  const response = await USER_API.post(`/user/e-sign/add-to-request`, payload);
  return response.data;
};

export const updateProfilePic = async (storedLoginUserID, payload) => {
  const response = await USER_API.post(
    `/user/update-profile-pic/${storedLoginUserID}`,
    payload
  );
  return response.data;
};

// /api/user/in-app-change-password

export const inAppChangePassword = async (payload) => {
  const response = await USER_API.post(`/user/in-app-change-password`, payload);
  return response.data;
};

// signup-corporate-user

export const CorporateUserCreation = async (payload) => {
  const response = await USER_API.post(
    `/customer/v1/auth/signup-corporate-user`,
    payload
  );
  return response.data;
};

//  /api/user/signature-delete/:signatureId/:userId

export const DeleteSign = (signatureID, storedLoginUserID) => {
  return USER_API.post(
    `/user/signature-delete/${signatureID}/${storedLoginUserID}`
  );
};

// GetContactReceiverList
export const GetContactReceiverList = () => {
  return USER_API.get("/user/get-contact/admin");
};

// /user/contact/:id/toggle-status

export const TaggleStatus = (id) => {
  return USER_API.put(`/user/contact/${id}/toggle-status`);
};

// /razorpay/create-order

export const CreateOrder = (payload) => {
  console.log(payload, "wqds");
  return USER_API.post(`/razorpay/create-order`, payload);
};

// /razorpay/verify-payment

export const RazorPay = (data) => {
  return USER_API.post(`/razorpay/verify-payment`, data);
};

//get plan and transaction details

export const TransactionAndPlan = (data) => {
  return USER_API.get(`/razorpay/payment-details?email=${data}`);
};
