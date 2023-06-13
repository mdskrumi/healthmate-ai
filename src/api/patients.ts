import { API_URL_PATIENTS } from "./config";

export const fetchPatinets = async () => {
  try {
    const response = await fetch(API_URL_PATIENTS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonPatinets = await response.json();
    if (jsonPatinets?.data?.results) {
      return jsonPatinets?.data?.results;
    }
    return [];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw Error("Error fetching data");
  }
};

export const createPatinet = async (data: { name: string }) => {
  try {
    const response = await fetch(API_URL_PATIENTS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const jsonPatinets = await response.json();
    if (jsonPatinets?.name) {
      return jsonPatinets;
    }
    return null;
  } catch (error) {
    console.error("Error creating patient:", error);
    throw Error("Error creating patient");
  }
};
