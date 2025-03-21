import { UPLOAD_API } from "./utils";

export const uploadImageToS3 = async (formData) => {
    const response = await UPLOAD_API.post('/upload/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const uploadFileToS3 = async (formData) => {
    const response = await UPLOAD_API.post('/upload/file', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteFileFromS3 = async (fileUrl) => {
    const response = await UPLOAD_API.post('/upload/remove', { fileUrl });
    return response.data;
};