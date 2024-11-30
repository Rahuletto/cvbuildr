import React, { useContext, useEffect, useRef, useState } from "react";
import { ResumeContext } from "@/providers/Resume";
const PersonalInformation = () => {
  const { resumeData, handleProfilePicture, handleChange } =
    useContext(ResumeContext);

  const fileBtn = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState(resumeData.profilePicture);

  useEffect(() => {
    setProfileImage(resumeData.profilePicture);
  }, [resumeData]);

  return (
    <div className="flex flex-col gap">
      <div
        style={{
          backgroundImage: `url(${profileImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-[100px] w-[100px] rounded-full bg-black bg-opacity-50 border-2 border-black mb-3"
        onClick={() => {
          fileBtn.current?.click();
        }}
      />
      <input
        type="file"
        ref={fileBtn}
        name="profileImage"
        accept="image/*"
        className="hidden"
        onChange={handleProfilePicture}
        placeholder="Profile Picture"
      />
      <input
          type="text"
          placeholder="Full Name"
          name="name"
          className="pi max-w-[50%]"
          value={resumeData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Job Title"
          name="position"
          className="pi"
          value={resumeData.position}
          onChange={handleChange}
        />
      <div className="flex gap-2 w-full">
        
        <input
          type="text"
          placeholder="Phone number"
          name="number"
          className="pi"
          value={resumeData.number}
          onChange={handleChange}
          minLength={10}
          maxLength={15}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="pi"
          value={resumeData.email}
          onChange={handleChange}
        />
        
      </div>
      <input
          type="text"
          placeholder="Address"
          name="address"
          className="pi"
          value={resumeData.address}
          onChange={handleChange}
        />
    </div>
  );
};

export default PersonalInformation;
