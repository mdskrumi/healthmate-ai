import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Dictaphone = () => {
  const [summerize, setSummerize] = useState<string>("");
  const [speaker, setSpeaker] = useState<"Doctor" | "Patient" | "None">("None");
  const [message, setMessage] = useState<
    {
      speaker: "Doctor" | "Patient";
      message: string;
    }[]
  >([]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleSpeakerChange = (person: "Doctor" | "Patient") => {
    if (speaker !== "None") {
      setMessage((prev) => [
        ...prev,
        { speaker: speaker, message: transcript },
      ]);
    }
    SpeechRecognition.stopListening();
    if (person === speaker) {
      setSpeaker("None");
      resetTranscript();
    } else {
      setSpeaker(person);
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  const onConversationSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/summarize/summarizes",
        {
          method: "POST",
          body: JSON.stringify({ conversation: message }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log({ data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-10 p-10">
        <button
          onClick={() => handleSpeakerChange("Doctor")}
          className={`block max-w-sm p-6 border border-gray-200 rounded-3xl shadow ${
            speaker === "Doctor" ? "bg-green-300" : "bg-white hover:bg-gray-100"
          }`}
        >
          <h2 className="font-bold p-10">DOCTOR</h2>
        </button>
        <button
          onClick={() => handleSpeakerChange("Patient")}
          className={`block max-w-sm p-6 border border-gray-200 rounded-3xl shadow ${
            speaker === "Patient"
              ? "bg-green-300"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          <h2 className="font-bold p-10">PATIENT</h2>
        </button>
      </div>

      <div className="m-auto max-w-2xl w-[90vw] border-2 p-5">
        {message.map((m, i) => (
          <div
            key={i}
            className={`${m.speaker === "Doctor" ? "text-left" : "text-right"}`}
          >{`${m.speaker}: ${m.message}.`}</div>
        ))}
      </div>
      <div className="m-auto max-w-2xl w-[90vw] p-5">
        <button
          className="ml-auto block max-w-sm p-4 border border-gray-200 rounded-xl shadow hover:bg-gray-100"
          onClick={onConversationSubmit}
        >
          SUBMIT
        </button>
      </div>
      {summerize && (
        <div className="m-auto max-w-2xl w-[90vw] border-2 p-5">
          {summerize}
        </div>
      )}
    </div>
  );
};
export default Dictaphone;
