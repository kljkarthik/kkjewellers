import API from './api';

export const submitEnquiry = async (enquiryData) => {
  const response = await API.post('/enquiries', enquiryData);
  return response.data;
};

export const bookAppointment = async (appointmentData) => {
  const response = await API.post('/appointments', appointmentData);
  return response.data;
};
