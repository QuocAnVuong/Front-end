import React, { useContext, useState } from "react";
import { UserContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

function EditProfileImg() {
  const { user, setUser } = useContext(UserContext);
  const [imagePreview, setImagePreview] = useState(user.ProfileImg);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const fetchData = async (e) => {
    const form = new FormData(e.target);
    console.log(e.target);
    console.log(form);
    try {
      const response = await fetch("https://progexbackend.onrender.com/writer/upload", {
        method: "POST",

        credentials: "include",
        body: new FormData(e.target),
      });
      if (response.ok) {
        console.log("Success");
        // Handle success
      } else {
        console.log("Failed");
        // Handle error
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem fetching the mock data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await fetchData(e);
    console.log(data);
    const newUser = user;
    newUser.ProfileImg = data.url;
    setUser(newUser);
    navigate("/user/profile");
  };

  return (
    <div
      className=" flex flex-col flex-grow items-center justify-center 
    px-[118px] xl:px-[147.5px] 2xl:px-[177px] 3xl:px-[226px] 
    gap-y-[15.5px] xl:gap-y-[19.5px] 2xl:gap-y-[23.5px] 3xl:gap-y-[30px]"
    >
      <form onSubmit={handleSubmit}>
        <div
          className="border border-[#322C2B] rounded-20px flex flex-col items-center justify-center 
        mb-[15.5px] xl:mb-[19.5px] 2xl:mb-[23.5px] 3xl:mb-[30px] 
        gap-y-[21px] xl:gap-y-[26px] 2xl:gap-y-[31px] 3xl:gap-y-[40px]
        px-[13px] xl:px-[16px] 2xl:px-[19.5px] 3xl:px-[25px] 
        py-[15.5px] xl:py-[19.5px] 2xl:py-[23.5px] 3xl:py-[30px]"
        >
          <p
            className="font-bold
          text-[29px] xl:text-[36.5px] 2xl:text-[44px] 3xl:text-[56px]"
          >
            Profile picture
          </p>
          <img
            src={imagePreview}
            alt=""
            className="w-[157px] xl:w-[196px] 2xl:w-[235px] 3xl:w-[300px] 
            h-[157px] xl:h-[196px] 2xl:h-[235px] 3xl:h-[300px] rounded-full"
          />
          <label
            htmlFor="Image"
            className="bg-[#322C2B] text-white flex items-center justify-center cursor-pointer truncate
            w-[106.5px] xl:w-[133px] 2xl:w-[160px] 3xl:w-[204px] 
            h-[20px] xl:h-[25px] 2xl:h-[30px] 3xl:h-[38px] 
            rounded-[1.5px] xl:rounded-[2px] 2xl:rounded-[2.5px] 3xl:rounded-[3px] 
            font-[8px] xl:font-[10.5px] 2xl:font-[12.5px] 3xl:font-[16px]
            text-[9.5px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px]"
            onClick={() => {
              document.querySelector(".input-field").click();
            }}
          >
            Upload New Picture
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              id="image"
              name="image"
              className="hidden input-field"
            />
          </label>
          <input name="purpose" value="2" className="hidden" readOnly />
        </div>
        <div
          className="flex items-center justify-center
         gap-x-[15.5px] xl:gap-x-[19.5px] 2xl:gap-x-[23.5px] 3xl:gap-x-[30px]"
        >
          <button
            className="bg-[#322C2B] text-white flex items-center justify-center cursor-pointer
          w-[76px] xl:w-[96px] 2xl:w-[115px] 3xl:w-[147px] 
          h-[30px] xl:h-[37.8px] 2xl:h-[45.5px] 3xl:h-[58px] 
          rounded-[3px] xl:rounded-[4px] 2xl:rounded-[5px] 3xl:rounded-[6px] 
          text-[9.5px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px]"
          >
            Save
          </button>
          <div
            className="bg-[#CECECE] flex items-center justify-center cursor-pointer
          w-[76px] xl:w-[96px] 2xl:w-[115px] 3xl:w-[147px] 
          h-[30px] xl:h-[37.8px] 2xl:h-[45.5px] 3xl:h-[58px] 
          rounded-[3px] xl:rounded-[4px] 2xl:rounded-[5px] 3xl:rounded-[6px] 
          text-[9.5px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px]"
            onClick={() => {
              navigate("/user/profile");
            }}
          >
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditProfileImg;
