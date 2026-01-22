"use client"

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";


type JobSelectContextType = {
    jobSelect: string;
    setJobSelect: Dispatch<SetStateAction<string>>;
  };

  export const JobSelectContext = createContext<JobSelectContextType>({
    jobSelect: "",
    setJobSelect: () => {},
  });

export const JobSelectContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [jobSelect, setJobSelect] = useState("");
    return (
        <JobSelectContext.Provider value={{ jobSelect, setJobSelect }}>
            {children}
        </JobSelectContext.Provider>
    );
};

export const useJobSelectContext = () => {
    return useContext(JobSelectContext);
};