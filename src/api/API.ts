import { axiosInstance } from './axiosInstances';

export const addData = async (endpoint: string, requestBody?: object) => {
  try {
    const result = await axiosInstance.post(endpoint, requestBody);
    return result;
  } catch (error: any) {
    return error;
  }
};

export const updateData = async (endpoint: string, requestBody?: object) => {
  try {
    const result = await axiosInstance.patch(endpoint, requestBody);
    return result;
  } catch (error: any) {
    return error;
  }
};

export const deleteData = async (endpoint: string) => {
  try {
    const result = await axiosInstance.delete(endpoint);
    return result;
  } catch (error: any) {
    return error;
  }
};

export const getData = async (url: string) => {
  try {
    let result = await axiosInstance.get(url);
    return result.data;
  } catch (error:any) {
    return error.response;
  }
};
