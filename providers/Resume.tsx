import DefaultResumeData from "@/app/components/utility/DefaultResumeData";
import { ResumeForm } from "@/types/FormData";
import { ChangeEvent, ChangeEventHandler, createContext } from "react";

interface ResumeContextType {
  resumeData: ResumeForm;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeForm>>;
  handleProfilePicture: (e: any) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const ResumeContext = createContext<ResumeContextType>({
  resumeData: DefaultResumeData,
  setResumeData: () => {},
  handleProfilePicture: () => {},
  handleChange: () => {},
});
