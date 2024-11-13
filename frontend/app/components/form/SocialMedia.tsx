import FormButton from "./FormButton";
import React, { useContext } from "react";
import { ResumeContext } from "@/providers/Resume";

const SocialMedia = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext);

  // social media
  const handleSocialMedia = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newSocialMedia = [...resumeData.socialMedia];
    (newSocialMedia[index] as any)[e.target.name] = e.target.value.replace(
      "https://",
      ""
    );
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };

  const addSocialMedia = () => {
    setResumeData({
      ...resumeData,
      socialMedia: [...resumeData.socialMedia, { socialMedia: "", link: "" }],
    });
  };

  const removeSocialMedia = () => {
    const newSocialMedia = [...resumeData.socialMedia];
    newSocialMedia.pop();
    setResumeData({ ...resumeData, socialMedia: newSocialMedia });
  };

  return (
    <div className="flex relative flex-col gap-2 -m-3 px-6 py-4 pb-8 my-14 border-2 border-black border-dashed">
      <h2 className="input-title">Social Media</h2>
      {resumeData &&
        resumeData.socialMedia &&
        resumeData?.socialMedia?.map((socialMedia, index) => (
          <div key={index} className="flex flex-wrap">
            <input
              type="text"
              placeholder="Social Media"
              name="socialMedia"
              className="other-input w-[30%] border-r-0"
              value={socialMedia?.socialMedia}
              onChange={(e) => handleSocialMedia(e, index)}
            />
            <input
              type="text"
              placeholder="Link"
              name="link"
              className="other-input w-[65%]"
              value={socialMedia.link}
              onChange={(e) => handleSocialMedia(e, index)}
            />
          </div>
        ))}
      <FormButton
        size={resumeData && resumeData.socialMedia?.length}
        add={addSocialMedia}
        remove={removeSocialMedia}
      />
    </div>
  );
};

export default SocialMedia;
