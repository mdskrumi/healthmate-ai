import React from "react";
import { MicOff } from "@mui/icons-material";

import Lottie from "lottie-react";
import micWave from "../assets/mic-wave.json";

import "./style.css";

const ListeningComponent: React.FC<{
  isActive: boolean;
  speaker: string;
  height?: number;
  width?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ isActive, speaker, height = 50, width = 100, onClick }) => {
  return (
    <button
      className={`block max-w-sm p-6 border border-gray-200 rounded-3xl shadow ${
        speaker === "Patient" ? "bg-green-300" : "bg-white hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <h2 className="font-bold">{speaker}</h2>
      {isActive ? (
        <>
          <div className="lottie-id">
            <Lottie
              animationData={micWave}
              style={{
                height: "50px !important",
                width: "100px !important",
              }}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto">
          <MicOff color="disabled" />
          <p className="text-center items-center justify-center">
            Tap to speak
          </p>
        </div>
      )}
    </button>
  );
};

export default ListeningComponent;
