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
    try {
      const response = await fetch("http://localhost:3000/writer/upload", {
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
    <div className=" flex flex-col flex-grow items-center justify-center px-[226px] gap-y-[30px]">
      <form onSubmit={handleSubmit}>
        <div className="px-[25px] py-[30px] border border-[#322C2B] rounded-20px gap-y-[40px] flex flex-col items-center justify-center mb-[30px]">
          <p className="font-bold text-[56px]">Profile picture</p>
          <img
            src={imagePreview}
            alt=""
            className="w-[300px] h-[300px] rounded-full"
          />
          <label
            htmlFor="Image"
            className="w-[204px] h-[38px] bg-[#322C2B] text-white rounded-[3px] font-[16px] flex items-center justify-center cursor-pointer"
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
        <div className="flex gap-x-[30px] items-center justify-center">
          <button className="w-[147px] h-[58px] rounded-[6px] bg-[#322C2B] text-white text-[18px] flex items-center justify-center">
            Save
          </button>
          <div
            className="w-[147px] h-[58px] rounded-[6px] bg-[#CECECE] text-[18px] flex items-center justify-center"
            onClick={() => {
              navigate("/user/profile");
            }}
          >
            Cancel
          </div>
        </div>
      </form>
      {/*<label
        htmlFor="Image"
        className="w-[204px] h-[38px] bg-black text-white rounded-[3px] font-[16px]"
      >
        Upload New Picture
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          id="Image"
          className="hidden"
        />
      </label>*/}
    </div>
  );
}

export default EditProfileImg;
