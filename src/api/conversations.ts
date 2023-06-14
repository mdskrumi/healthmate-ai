import { API_URL_CONVERSATIONS } from "./config";

export interface ISendConversation {
  patient: number;
  conversation: IMessage[];
}

export interface IMessage {
  speaker: "Doctor" | "Patient";
  message: string;
}

export interface ISummarize {
  id: number;
  conversation: IConversation[];
  summarize: string;
  created_at: string;
  updated_at?: string;
}

export interface IConversation {
  speaker: string;
  message: string;
}

export const sendConversation = async (data: ISendConversation) => {
  try {
    const response = await fetch(API_URL_CONVERSATIONS, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (err) {
    console.log(err);
    throw Error("Error during conversation submitting");
  }
};

export const getSummarizeList = async () => {
  try {
    const response = await fetch(API_URL_CONVERSATIONS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();

    console.log({ jsonResponse });
    return jsonResponse;
  } catch (err) {
    console.log(err);
  }
};

export const getSummarizeOfPatient = async (patinet: number) => {
  try {
    const response = await fetch(`${API_URL_CONVERSATIONS}${patinet}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();

    console.log({ jsonResponse });
    if (jsonResponse && jsonResponse?.data) {
      return jsonResponse.data;
    }
    return null;
  } catch (err) {
    console.log(err);
  }
};
