import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { createPatinet, fetchPatinets } from "../api/patients";

interface PatientOptionType {
  inputValue?: string;
  id?: number;
  name: string;
}

const filter = createFilterOptions<PatientOptionType>();

const NewSession = () => {
  const [value, setValue] = React.useState<PatientOptionType | null>(null);

  const [refreshPatients, setRefreshPatients] = useState(true);

  const [sessionStarted, setSessionStarted] = useState(false);

  const [patients, setPatients] = useState<PatientOptionType[]>([]);

  // const data = useFetchPatinets();

  const [summerize, setSummerize] = useState<string>("");
  const [speaker, setSpeaker] = useState<"Doctor" | "Patient" | "None">("None");
  const [message, setMessage] = useState<
    {
      speaker: "Doctor" | "Patient";
      message: string;
    }[]
  >([]);

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

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

  const handleSessionAction = () => {
    if (value && value.name) {
      if (sessionStarted) {
        setSessionStarted(!sessionStarted);
      } else {
        setSessionStarted(!sessionStarted);
      }
    } else {
      setSessionStarted(!sessionStarted);
    }
  };

  useEffect(() => {
    if (refreshPatients) {
      fetchPatinets()
        .then((data) => {
          setPatients(data);
          setRefreshPatients(false);
        })
        .catch((error) => {
          console.log("Error fetching patients", error);
        });
    }
  }, [refreshPatients]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <div className="flex flex-col">
        <div className="w-full">
          {!sessionStarted ? (
            <>
              <div className="w-full pb-5">
                <h3>Please select a patient:</h3>
              </div>

              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    setValue({
                      name: newValue,
                    });
                  } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    const newPatient = {
                      name: newValue.inputValue,
                    };
                    createPatinet(newPatient)
                      .then((data) => {
                        setRefreshPatients(true);
                      })
                      .catch((error) => {
                        console.log("Error creating new patient:", error);
                      });
                    setValue(newPatient);
                  } else {
                    setValue(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  const { inputValue } = params;
                  // Suggest the creation of a new value
                  const isExisting = options.some(
                    (option) => inputValue === option.name
                  );
                  if (inputValue !== "" && !isExisting) {
                    filtered.push({
                      inputValue,
                      name: `Add "${inputValue}"`,
                    });
                  }

                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={patients}
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.name;
                }}
                renderOption={(props, option) => (
                  <li {...props}>{option.name}</li>
                )}
                sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} label="Type patient name" />
                )}
              />
              <div className="pt-5 pb-5">
                <Button
                  variant="outlined"
                  onClick={handleSessionAction}
                  disabled={!Boolean(value && value.name)}
                >
                  {sessionStarted ? "Back" : "Start Session"}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="pt-2 pb-5">
                <Button
                  variant="text"
                  onClick={handleSessionAction}
                  startIcon={<ArrowBackIos />}
                  size="small"
                  color="secondary"
                >
                  {sessionStarted ? "Back" : "Start Session"}
                </Button>
              </div>
              {value && (
                <div className="w-full pb-5">
                  <p className="text-lg">
                    Session with{" "}
                    <span className="text-blue-500">{value.name}</span>
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {value && value.name && sessionStarted && (
        <>
          <div className="flex justify-center items-center gap-10 p-10">
            <button
              onClick={() => handleSpeakerChange("Doctor")}
              className={`block max-w-sm p-6 border border-gray-200 rounded-3xl shadow ${
                speaker === "Doctor"
                  ? "bg-green-300"
                  : "bg-white hover:bg-gray-100"
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
                className={`${
                  m.speaker === "Doctor" ? "text-left" : "text-right"
                }`}
              >{`${m.speaker}: ${m.message}.`}</div>
            ))}
          </div>
          <div className="m-auto text-right max-w-2xl w-[90vw] pt-5">
            <Button variant="outlined" onClick={onConversationSubmit}>
              SUBMIT
            </Button>
          </div>

          {summerize && (
            <div className="m-auto max-w-2xl w-[90vw] border-2 p-5">
              {summerize}
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default NewSession;
