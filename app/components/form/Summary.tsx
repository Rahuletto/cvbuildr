import React, { useContext } from "react";
import { ResumeContext } from "@/providers/Resume"
const Summary = () => {
  const { resumeData, handleChange } = useContext(ResumeContext);
  return (
    <div className="flex flex-col gap-2 my-6">
      <h2 className="input-title">Summary</h2>
      <div className="grid-4">
        <textarea
          placeholder="Summary"
          name="summary"
          className="w-full other-input h-40"
          value={resumeData.summary}
          onChange={handleChange}
          maxLength={500}
        />
      </div>
    </div>
  );
};

export default Summary;
