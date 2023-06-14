import React, { useState, useEffect } from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { fetchPatinets } from "../api/patients";
import { getSummarizeOfPatient, ISummarize } from "../api/conversations";
import { SummaryCard } from "./SummaryCard";
import Loading from "./Loading";
import ErrorMessageComponent from "./ErrorMessageComponent";

interface PatientOptionType {
  id: number;
  inputValue?: string;
  name: string;
}

const filter = createFilterOptions<PatientOptionType>();

const SessionHistory = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [patient, setPatient] = React.useState<PatientOptionType | null>(null);
  const [patients, setPatients] = useState<PatientOptionType[]>([]);

  const [summarizes, setSummarizes] = useState<ISummarize[]>([]);

  useEffect(() => {
    setErrorMessage("");
    setIsLoading(true);
    fetchPatinets()
      .then((data) => {
        setPatients(data);
      })
      .catch((error) => {
        console.log("Error fetching patients", error);
        setErrorMessage("Something went wrong during fetching patients");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="flex flex-col">
        <div className="w-full">
          <Loading isLoading={isLoading} />
          <ErrorMessageComponent message={errorMessage} />
          <div className="pb-10">
            <div className="w-full pb-5">
              <h3>Please select a patient:</h3>
            </div>

            <Autocomplete
              value={patient}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  // ignore other
                } else if (newValue) {
                  setPatient(newValue);
                  setIsLoading(true);
                  setErrorMessage("");
                  getSummarizeOfPatient(newValue.id)
                    .then((data: { results?: ISummarize[] }) => {
                      console.log("summary res:", data);
                      if (data && data?.results) setSummarizes(data.results);
                    })
                    .catch((error) => {
                      console.log(
                        "Error in fetching summarize of patient:",
                        error
                      );
                      setErrorMessage(
                        "Something went wrong during fetching patient information"
                      );
                    })
                    .finally(() => {
                      setIsLoading(false);
                    });
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
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
          </div>
          <div className="w-2/3 ">
            {patient && (
              <div className="w-full pb-5 ">
                <p className="text-lg text-center">
                  Session history of {""}
                  <span className="text-blue-500">{patient.name}</span>
                </p>
              </div>
            )}
            {patient && patient.name && summarizes.length > 0 ? (
              summarizes.map((item) => {
                return (
                  <div key={item.id} className="py-5">
                    <SummaryCard
                      summarize={item.summarize}
                      created_at={item.created_at}
                    />
                  </div>
                );
              })
            ) : (
              <div className="h-32 border items-center justify-center py-10">
                <p className="items-center justify-center text-center text-gray-500">
                  No history found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionHistory;
