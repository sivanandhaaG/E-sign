import { USER_API } from "./utils";

export const fetchAllDesignations = async (formData) => {
    const response = await USER_API.get('/designation', formData);
    return response.data;
};

export const fetchAllCompanyTypes = async (data) => {
    const response = await USER_API.get('/company-type', data);
    return response.data;
};

