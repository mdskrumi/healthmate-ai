export const API_BASE_URL =
  process.env.REACT_APP_FRONTEND_BASE_API_URL || "http://localhost:8000/";

export const API_URL_PATIENTS = `${API_BASE_URL}patient/patients/`;
export const API_URL_CONVERSATIONS = `${API_BASE_URL}summarize/summarizes/`;
