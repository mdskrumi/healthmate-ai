import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { createPatinet, fetchPatinets } from "../api/patients";
import { sendConversation } from "../api/conversations";
import Loading from "./Loading";
import ErrorMessageComponent from "./ErrorMessageComponent";
import ListeningComponent from "./ListeningComponent";

import Image from "../assets/bg.png";

interface PatientOptionType {
  inputValue?: string;
  id?: number;
  name: string;
}

const filter = createFilterOptions<PatientOptionType>();

const NewSession = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [patient, setPatient] = React.useState<PatientOptionType | null>(null);

  const [refreshPatients, setRefreshPatients] = useState(true);

  const [sessionStarted, setSessionStarted] = useState(false);

  const [patients, setPatients] = useState<PatientOptionType[]>([]);

  const [summerize, setSummerize] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  useEffect(() => {
    if (isRecording) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      setMessage((prev) => prev + transcript);
      SpeechRecognition.stopListening();
      resetTranscript();
    }
  }, [isRecording, transcript, resetTranscript]);

  console.log(message);

  const onConversationSubmit = async () => {
    try {
      setIsLoading(true);
      if (!patient?.id) {
        return;
      }
      const response = await sendConversation({
        conversation: { message },
        patient: patient.id,
      });

      console.log("response at onConversationSubmit", response);
      setSummerize(response.summarize);
      setErrorMessage("");
    } catch (err) {
      console.log(err);
      setErrorMessage("Something went wrong during submit conversation.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSessionAction = () => {
    if (patient && patient.name) {
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
      setIsLoading(true);
      fetchPatinets()
        .then((data) => {
          setPatients(data);
          setRefreshPatients(false);
          setErrorMessage("");
        })
        .catch((error) => {
          console.log("Error fetching patients", error);
          setErrorMessage(
            "Something went wrong during fetching patients information."
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [refreshPatients]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <div className="flex flex-col">
        <Loading isLoading={isLoading} />
        <ErrorMessageComponent message={errorMessage} />
        {!sessionStarted ? (
          <div className="fixed h-[calc(100vh-64px)] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 content-center items-center">
              <div className="">
                <div>
                  <h2 className="mb-2 font-bold">Healthmate AI</h2>
                  <p className="mb-5 max-w-sm">
                    Bringing Efficiency to Healthcare Consultations & Let AI
                    Handle the Summarization, While You Focus on Care.
                  </p>
                </div>
                <div className="w-full pb-2">
                  <label className="text-sm font-medium">
                    Enter patient name for starting the session
                  </label>
                </div>

                <Autocomplete
                  value={patient}
                  onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                      setPatient({
                        name: newValue,
                      });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new patient from the user input
                      const newPatient = {
                        name: newValue.inputValue,
                      };
                      setIsLoading(true);
                      createPatinet(newPatient)
                        .then((data) => {
                          setRefreshPatients(true);
                          setPatient(data);
                          setErrorMessage("");
                        })
                        .catch((error) => {
                          console.log("Error creating new patient:", error);
                        })
                        .finally(() => {
                          setIsLoading(false);
                        });
                    } else {
                      setPatient(newValue);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new patient
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
                    <TextField {...params} label="Patient name" />
                  )}
                />
                <div className="pt-5 pb-5">
                  <Button
                    variant="contained"
                    onClick={handleSessionAction}
                    disabled={!Boolean(patient && patient.name)}
                  >
                    {sessionStarted ? "Back" : "Start Session"}
                  </Button>
                </div>
              </div>
              <div className="w-full">
                <img src={Image} alt="mic" />
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {patient && patient.name && sessionStarted && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
          <div className="w-full pb-5">
            <p className="text-2xl">
              Session with <span className="text-blue-500">{patient.name}</span>
            </p>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-2xl">Conversation between Doctor and Patient</p>
          </div>
          <div className="flex justify-center items-center gap-10 p-10">
            <ListeningComponent
              isActive={isRecording}
              speaker={isRecording ? "Recording" : "Record"}
              onClick={() => toggleRecording()}
            />
          </div>

          <div className="m-auto text-right max-w-2xl w-[90vw] pt-5">
            <Button variant="outlined" onClick={onConversationSubmit}>
              SUBMIT
            </Button>
          </div>

          {summerize && (
            <div
              className="m-auto max-w-2xl w-[90vw] border-2 p-5"
              dangerouslySetInnerHTML={{ __html: summerize }}
            >
              {/* {summerize} */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default NewSession;
