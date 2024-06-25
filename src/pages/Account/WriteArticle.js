import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/ContextProvider";
import IngredientTag from "../../components/IngredientTag/IngredientTag";
import { useNavigate } from "react-router-dom";
import FoodTag from "../../components/FoodTag/FoodTag";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ActiveContext } from "./UserMainPage";

function WriteArticle() {
  const initialState = {
    Title: "",
    Description: "",
    Image: "",
    Duration: 0,
    Serving: 0,
    Content: "",
    Flavour: [],
    IngredientID: [],
    Quantity: [],
    Style: [],
    Course: [],
  };
  const publicationDate = new Date();
  const [articleValues, setArticleValue] = useState(initialState);
  const { user } = useContext(UserContext);
  const userID = user.UserID;
  const [ingredientsList, setIngredientsList] = useState([]);
  //const [flavorsList, setFlavorsList] = useState([]);
  const [stylesList, setStylesList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const [imagePreview, setImagePreview] = useState(articleValues.Image);
  const navigate = useNavigate();
  const { setActiveMenuItem } = useContext(ActiveContext);

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const response = await fetch("http://localhost:3000/get-everything", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setLoading(true);
        const data = await response.json();
        setIngredientsList(data.data.ingredients);
        //setFlavorsList(data.data.flavours);
        setCourseList(data.data.course);
        setStylesList(data.data.styles);
        setLoading(false);
      } catch (error) {
        console.error(
          "There was a problem fetching the everything data:",
          error
        );
      }
    };
    fetchMockData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleValue({ ...articleValues, [name]: value });
  };
  const fetchImageData = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/writer/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("There was a problem fetching the data:", error);
    }
  };
  const fetchArticleData = async () => {
    console.log(articleValues);
    try {
      const response = await fetch("http://localhost:3000/writer/add-article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(articleValues),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem fetching the data:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const fileInput = document.getElementById("image"); // Access the file input by its ID
    if (fileInput.files.length > 0) {
      formData.append("image", fileInput.files[0]); // Append the file to FormData
    }
    formData.append("purpose", 2);

    const imageFetch = await fetchImageData(formData);
    setArticleValue({
      ...articleValues,
      Image: imageFetch.url,
    });
  };
  useEffect(() => {
    const sendData = async () => {
      const data = await fetchArticleData();
      setActiveMenuItem("Your article");
      navigate("/user/article");
    };
    if (articleValues.Image !== "") sendData();
  }, [articleValues.Image]);

  //For the search function
  const checkData = (value) => {
    const tempResult = ingredientsList.filter((ingredient) => {
      return (
        value &&
        ingredient &&
        ingredient.IngredientName &&
        ingredient.IngredientName.toLowerCase().includes(value.toLowerCase())
      );
    });
    setResult(tempResult);
  };
  const handleSearchChange = (value) => {
    setSearch(value);
    checkData(value);
  };

  //Choosing ingredient in search
  const handleClickSearch = (id) => {
    if (!articleValues.IngredientID.includes(id)) {
      const tempIngredients = [...articleValues.IngredientID, id];
      const tempQuantity = [...articleValues.Quantity, ""];
      setArticleValue({
        ...articleValues,
        IngredientID: tempIngredients,
        Quantity: tempQuantity,
      });
    }
    setSearch("");
    checkData("");
  };
  const getIngredientByID = (id) => {
    const res = ingredientsList.filter((ingredient) => {
      return ingredient.IngredientID === id;
    });
    return res[0].IngredientName;
  };
  const onChangeQuantity = (ingredientValue, newQuantity) => {
    const index = articleValues.IngredientID.indexOf(ingredientValue);
    if (index !== -1) {
      const newQuantityArray = [...articleValues.Quantity];
      newQuantityArray[index] = newQuantity;
      setArticleValue({ ...articleValues, Quantity: newQuantityArray });
    }
  };
  const removeIngredient = (ingredientValue) => {
    const index = articleValues.IngredientID.indexOf(ingredientValue);
    if (index !== -1) {
      const newIngredientsArray = articleValues.IngredientID.filter(
        (_, i) => i !== index
      );
      const newQuantityArray = articleValues.Quantity.filter(
        (_, i) => i !== index
      );
      setArticleValue({
        ...articleValues,
        IngredientID: newIngredientsArray,
        Quantity: newQuantityArray,
      });
    }
  };

  function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
  }

  //ChoosingCourse
  const handleCourseChange = (value) => {
    if (value !== "None") {
      const valueNumber = parseInt(value, 10);
      if (!articleValues.Course.includes(valueNumber)) {
        const tempCourse = [...articleValues.Course, valueNumber];
        setArticleValue({ ...articleValues, Course: tempCourse });
      }
    }
    selectElement("course", "None");
  };
  const getCourseByID = (id) => {
    const res = courseList.filter((course) => {
      return course.id === id;
    });
    return res[0].course;
  };

  /*
  //Choosing Flavor
  const handleFlavorChange = (value) => {
    if (value !== "None") {
      const valueNumber = parseInt(value, 10);
      if (!articleValues.Flavour.includes(valueNumber)) {
        const tempFlavor = [...articleValues.Flavour, valueNumber];
        setArticleValue({ ...articleValues, Flavour: tempFlavor });
      }
    }
    selectElement("flavor", "None");
  };
  const getFlavorByID = (id) => {
    const res = flavorsList.filter((flavor) => {
      return flavor.FlavourID === id;
    });
    return res[0].Flavour;
  };*/
  //Choosing Style
  const handleStyleChange = (value) => {
    if (value !== "None") {
      const valueNumber = parseInt(value, 10);
      if (!articleValues.Style.includes(valueNumber)) {
        const tempStyle = [...articleValues.Style, valueNumber];
        setArticleValue({ ...articleValues, Style: tempStyle });
      }
    }
    selectElement("type", "None");
  };
  const getStyleByID = (id) => {
    const res = stylesList.filter((style) => {
      return style.id === id;
    });
    return res[0].StyleName;
  };

  const handleDeleteCourse = (value) => {
    const tempCourse = articleValues.Course.filter((course) => {
      return course !== value;
    });
    setArticleValue({ ...articleValues, Course: tempCourse });
  };
  /*
  const handleDeleteFlavors = (value) => {
    const tempFlavor = articleValues.Flavour.filter((flavor) => {
      return flavor !== value;
    });
    setArticleValue({ ...articleValues, Flavour: tempFlavor });
  };*/

  const handleDeleteStyles = (value) => {
    const tempStyle = articleValues.Style.filter((style) => {
      return style !== value;
    });
    setArticleValue({ ...articleValues, Style: tempStyle });
  };

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
  const getDay = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  };

  /*useEffect(() => {
    console.log(articleValues);
  }, [articleValues]);*/

  useEffect(() => {
    console.log(articleValues.Content);
  }, [articleValues.Content]);

  return (
    <form
      className="flex flex-col flex-grow items-center justify-center 
px-[118px] xl:px-[147.5px] 2xl:px-[177px] 3xl:px-[226px]
gap-y-[13px] xl:gap-y-[16px] 2xl:gap-y-[19.5px] 3xl:gap-y-[25px] 
"
      onSubmit={handleSubmit}
    >
      <div
        className="text-[12.5px] xl:text-[15px] 2xl:text-[19px] 3xl:text-[24px]
          mt-[15.5px] xl:mt-[19.5px] 2xl:mt-[23.5px] 3xl:mt-[30px]
          mb-[15.5px] xl:mb-[19.5px] 2xl:mb-[23.5px] 3xl:mb-[30px]
          w-full
          "
      >
        <input
          type="text"
          id="Title"
          name="Title"
          placeholder="Enter your title"
          value={articleValues.Title}
          onChange={handleChange}
          className="w-full border-[2.5px]
              border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none
              h-[31px] xl:h-[39px] 2xl:h-[47px] 3xl:h-[60px]
              p-[10.5px] xl:p-[13px] 2xl:p-[15.5px] 3xl:p-[20px] 
              rounded-[4px] xl:rounded-[5px] 2xl:rounded-[6px] 3xl:rounded-[8px]"
          required
        />
      </div>
      <div className="w-full">
        <div
          className=" relative 
              w-full
              h-[38px] xl:h-[47.5px] 2xl:h-[57px] 3xl:h-[73px]  
              flex items-center justify-center
              p-[7px] xl:p-[9px] 2xl:p-[11px] 3xl:p-[14px] 
              rounded-[10.5px] xl:rounded-[13px] 2xl:rounded-[15.5px] 3xl:rounded-[20px] 
              border border-[#000] 
              mb-[35px] xl:mb-[44px] 2xl:mb-[52.5px] 3xl:mb-[67px]"
        >
          <img
            src={require("../../img/Search.png")}
            alt=""
            className="ml-[10.5px] xl:ml-[13px] 2xl:ml-[15.5px] 3xl:ml-[20px] 
                  mr-[33px] xl:mr-[41px] 2xl:mr-[49px] 3xl:mr-[63px]
                  w-[52px] xl:w-[65px] 2xl:w-[78px] 3xl:w-auto
                  "
          />
          <input
            type="search"
            className="text-[18px] xl:text-[22px] 2xl:text-[26.5px] 3xl:text-[34px] 
                  font-light justify-center border-none bg-transparent focus:outline-none"
            placeholder="Add your ingredients"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          <div
            className="absolute 
                top-[38px] xl:top-[47.5px] 2xl:top-[57px] 3xl:top-[73px] 
                left-[-2.5px] xl:left-[-3px] 2xl:left-[-4px] 3xl:left-[-5px] 
                z-10 text-center 
                w-full
                text-[18px] xl:text-[22px] 2xl:text-[26.5px] 3xl:text-[34px]
                bg-white opacity-100"
          >
            <ul>
              {result.map((result) => (
                <li
                  key={result.IngredientID}
                  className="border border-t-0 border-[#3f3f3] hover:bg-[#b4b1b1]"
                  onClick={() => handleClickSearch(result.IngredientID)}
                >
                  {result.IngredientName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full gap-y-3 flex flex-col ">
        {articleValues.IngredientID.map((ingredient, position) => (
          <IngredientTag
            ingredientValue={getIngredientByID(ingredient)}
            id={ingredient}
            handleDelete={removeIngredient}
            onchangeQuantity={onChangeQuantity}
          />
        ))}
      </div>
      <div
        className="w-full flex justify-center
        gap-x-[13px] xl:gap-x-[16px] 2xl:gap-x-[19.5px] 3xl:gap-x-[25px]"
      >
        <div
          className="border-4
        rounded-[10px] xl:rounded-[13px] 2xl:rounded-[15.5px] 3xl:rounded-[20px] 
        border-[#803D3B] 
        flex-1
        px-[29px] xl:px-[36px] 2xl:px-[43px] 3xl:px-[55px]"
        >
          <p
            className="font-bold 
          text-[22px] xl:text-[27.5px] 2xl:text-[33px] 3xl:text-[42px] 
          text-center 
          mt-[28px] xl:mt-[34.5px] 2xl:mt-[41.5px] 3xl:mt-[53px] 
          mb-[30px] xl:mb-[37px] 2xl:mb-[44.5px] 3xl:mb-[57px]"
          >
            Dish Preference
          </p>
          <div>
            <div
              className="relative 
            w-full
            h-[38px] xl:h-[47px] 2xl:h-[57px] 3xl:h-[73px] 
            mb-[35px] xl:mb-[44px] 2xl:mb-[52.5px] 3xl:mb-[67px]"
            >
              <select
                name="course"
                id="course"
                className="border border-[#000] 
                rounded-[10.5px] xl:rounded-[13px] 2xl:rounded-[15px] 3xl:rounded-[20px] 
                w-full 
                h-[38px] xl:h-[47.5px] 2xl:h-[57px] 3xl:h-[73px] 
                text-center 
                text-[18px] xl:text-[22px] 2xl:text-[26.5px] 3xl:text-[34px] 
                font-light cursor-pointer 
                pr-[33px] xl:pr-[41px] 2xl:pr-[50px] 3xl:pr-[64px]"
                onChange={(e) => handleCourseChange(e.target.value)}
              >
                <option value="None">Select Course</option>
                {courseList.map((course) => (
                  <option value={course.id} key={course.id}>
                    {course.course}
                  </option>
                ))}
              </select>
              <span
                className="block bg-white h-5/6 
              w-[33.5px] xl:w-[42px] 2xl:w-[50px] 3xl:w-16 
              absolute top-1 right-1 
              rounded-[10.5px] xl:rounded-[13px] 2xl:rounded-[15.5px] 3xl:rounded-[20px]
              pointer-events-none custom-arrow"
              ></span>
            </div>
            <div
              className="relative 
            w-full
            h-[38px] xl:h-[47px] 2xl:h-[57px] 3xl:h-[73px] 
            mb-[35px] xl:mb-[44px] 2xl:mb-[52.5px] 3xl:mb-[67px]"
            >
              <select
                name="type"
                id="type"
                className="border border-[#000] 
                rounded-[10.5px] xl:rounded-[13px] 2xl:rounded-[15px] 3xl:rounded-[20px] 
                w-full
                h-[38px] xl:h-[47.5px] 2xl:h-[57px] 3xl:h-[73px] 
                text-center 
                text-[18px] xl:text-[22px] 2xl:text-[26.5px] 3xl:text-[34px]  
                font-light cursor-pointer 
                pr-[33px] xl:pr-[41px] 2xl:pr-[50px] 3xl:pr-[64px]"
                onChange={(e) => handleStyleChange(e.target.value)}
              >
                <option value="None">Choose Dish Style</option>
                {stylesList.map((style) => (
                  <option value={style.id} key={style.id}>
                    {style.StyleName}
                  </option>
                ))}
              </select>
              <span
                className="block bg-white h-5/6 
              w-[33.5px] xl:w-[42px] 2xl:w-[50px] 3xl:w-16 
              absolute top-1 right-1 
              rounded-[10.5px] xl:rounded-[13px] 2xl:rounded-[15.5px] 3xl:rounded-[20px] 
              pointer-events-none custom-arrow"
              ></span>
            </div>
          </div>
        </div>
        <div
          className="border-4 h-full 
        rounded-[10.5px] xl:rounded-[13px] 2xl:rounded-[15.5px] 3xl:rounded-[20px] 
        border-[#803D3B] 
        flex-1 
        px-[37px] xl:px-[46px] 2xl:px-[55.5px] 3xl:px-[71px]"
        >
          <div>
            <p
              className="font-bold 
            text-[22px] xl:text-[27.5px] 2xl:text-[33px] 3xl:text-[42px] 
            text-center 
            mb-[10.5px] xl:mb-[13px] 2xl:mb-[15.5px] 3xl:mb-5 
            mt-[31px] xl:mt-[39px] 2xl:mt-[47px] 3xl:mt-[60px]"
            >
              Flavor
            </p>
            <div className="grid grid-cols-2">
              {articleValues.Course.map((course) => (
                <FoodTag
                  key={course}
                  value={getCourseByID(course)}
                  id={course}
                  handleDelete={handleDeleteCourse}
                />
              ))}
            </div>
            <hr
              className="border-2 border-[#E4C59E] 
            mb-[10.5px] xl:mb-[13px] 2xl:mb-[15.5px] 3xl:mb-[20px]"
            />
          </div>
          <div
            className="relative 
          pb-[15.5px] xl:pb-[19.5px] 2xl:pb-[23.5px] 3xl:pb-[30px] 
          mb-[15.5px] xl:mb-[19.5px] 2xl:mb-[23.5px] 3xl:mb-[30px] "
          >
            <p
              className="font-bold 
            text-[22px] xl:text-[27.5px] 2xl:text-[33px] 3xl:text-[42px] 
            text-center 
            mb-[10.5px] xl:mb-[13px] 2xl:mb-[15.5px] 3xl:mb-5 
            mt-[31px] xl:mt-[39px] 2xl:mt-[47px] 3xl:mt-[60px]"
            >
              Style of Dish:
            </p>
            <div className="grid grid-cols-2">
              {articleValues.Style.map((style) => (
                <FoodTag
                  key={style}
                  value={getStyleByID(style)}
                  id={style}
                  handleDelete={handleDeleteStyles}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className="text-[12.5px] xl:text-[15px] 2xl:text-[19px] 3xl:text-[24px]
          mb-[15.5px] xl:mb-[19.5px] 2xl:mb-[23.5px] 3xl:mb-[30px]
          w-full
          "
      >
        <textarea
          id="Description"
          name="Description"
          placeholder="Write your Short description"
          value={articleValues.Description}
          onChange={handleChange}
          className="w-full border-[2.5px]
              border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none
              h-[93px] xl:h-[117px] 2xl:h-[141px] 3xl:h-[180px]
              p-[10.5px] xl:p-[13px] 2xl:p-[15.5px] 3xl:p-[20px] 
              rounded-[4px] xl:rounded-[5px] 2xl:rounded-[6px] 3xl:rounded-[8px]"
        />
      </div>
      <div className="flex justify-center items-center gap-x-7">
        <p>Display Image: </p>
        <input
          type="file"
          className="cursor-pointer"
          onChange={handleImageChange}
          accept="image/*"
          id="image"
          name="image"
          required
        />
      </div>
      <div
        className="text-[12.5px] xl:text-[15px] 2xl:text-[19px] 3xl:text-[24px]
          mb-[15.5px] xl:mb-[19.5px] 2xl:mb-[23.5px] 3xl:mb-[30px]
          w-full
          "
      >
        <p
          className="mb-[6px] xl:mb-[8px] 2xl:mb-[9.5px] 3xl:mb-[12px] 
        text-[10px] xl:text-[16px] 2xl:text-[20px] 3xl:text-[30px] 
        text-center font-semibold"
        >
          Number of Serving of your Dish
        </p>
        <input
          type="number"
          id="Serving"
          name="Serving"
          placeholder={0}
          value={articleValues.Serving}
          onChange={handleChange}
          className="w-full border-[2.5px]
              border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none
              h-[31px] xl:h-[39px] 2xl:h-[47px] 3xl:h-[60px]
              p-[10.5px] xl:p-[13px] 2xl:p-[15.5px] 3xl:p-[20px] 
              rounded-[4px] xl:rounded-[5px] 2xl:rounded-[6px] 3xl:rounded-[8px]"
        />
      </div>
      <div
        className="text-[12.5px] xl:text-[15px] 2xl:text-[19px] 3xl:text-[24px]
          mb-[15.5px] xl:mb-[19.5px] 2xl:mb-[23.5px] 3xl:mb-[30px]
          w-full
          "
      >
        <p
          className="mb-[6px] xl:mb-[8px] 2xl:mb-[9.5px] 3xl:mb-[12px] 
        text-[10px] xl:text-[16px] 2xl:text-[20px] 3xl:text-[30px] 
        text-center font-semibold"
        >
          Cooking Duration in Minutes
        </p>
        <input
          type="number"
          id="Duration"
          name="Duration"
          placeholder={0}
          value={articleValues.Duration}
          onChange={handleChange}
          className="w-full border-[2.5px]
              border-[#803D3B] bg-[#F5F5DC] bg-opacity-75 focus:outline-none
              h-[31px] xl:h-[39px] 2xl:h-[47px] 3xl:h-[60px]
              p-[10.5px] xl:p-[13px] 2xl:p-[15.5px] 3xl:p-[20px] 
              rounded-[4px] xl:rounded-[5px] 2xl:rounded-[6px] 3xl:rounded-[8px]"
        />
      </div>
      <p className="text-[20px] xl:text-[32px] 2xl:text-[40px] 3xl:text-[60px] font-bold">
        Here is your preview Page
      </p>
      <div className="w-full border-[2.5px] border-[#803D3B] flex">
        <textarea
          id="Content"
          name="Content"
          value={articleValues.Content}
          onChange={handleChange}
          className="flex-1 border-r-[1.25px] border-[#803D3B] outline-none px-[15px] h-full"
          placeholder="Write your article by markdown"
        />
        <div className="flex-1 max-w-md border-l-[1.25px] border-[#803D3B] px-[15px]">
          <div className="flex items-center justify-center">
            <div className="w-full text-[#322C2B]">
              <div className="flex items-center justify-between">
                <p className="font-bold text-[30px]">{articleValues.Title}</p>
                <img
                  src="/img/bookmark-white.png"
                  alt=""
                  className="w-[25px] h-[25px]"
                />
              </div>
              <div className="font-normal text-[9px] mt-[12.5px]">
                Short description: <span>{articleValues.Description}</span>
              </div>
              <div className="flex items-center font-normal text-[8px] gap-x-[13px]">
                <div>
                  Submitted by <span className="font-bold">{userID}</span>
                </div>
                <div>|</div>
                <div>Published on {getDay(publicationDate)}</div>
              </div>
              <img
                src={imagePreview}
                alt="Please add your image in here"
                className="w-full mt-[15px]"
              />
              <div className="border border-[#322C2B] w-full rounded-[8px] my-[15px] p-[10px]">
                <div className="bg-[#AF8260] w-full border-none rounded-t-[8px] h-[16px] mb-[15px]" />
                <div className="flex items-center justify-between w-full">
                  <div className="flex mr-[25px] ">
                    <img
                      src="/img/clock.png"
                      alt=""
                      className="w-[15px] h-[15px]"
                    />
                    <div className="text-[#404040] font-medium text-[12px] ml-[15px]">
                      {articleValues.Duration} minutes
                    </div>
                  </div>
                  <div className="flex">
                    <img
                      src="/img/user.png"
                      alt=""
                      className="w-[15px] h-[15px]"
                    />
                    <div className="text-[#404040] font-medium text-[12px] ml-[15px]">
                      {articleValues.Serving} people
                    </div>
                  </div>
                </div>
              </div>
              <p className="font-bold text-[28px] mb-[12.5px] ">Ingredients</p>
              <ul className="list-disc mb-[12.5px]">
                {articleValues.IngredientID.map((ingredient, id) => (
                  <li
                    key={id}
                    className="font-normal text-[#404040] text-[12px] ml-[15px]"
                  >
                    {getIngredientByID(ingredient)}
                  </li>
                ))}
              </ul>
              <p className="font-bold text-[28px] mb-[12.5px]">Directions</p>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className="break-words markdown ol"
                children={articleValues.Content}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mb-[15px]">
        <button
          className="bg-[#322C2B] text-white flex items-center justify-center cursor-pointer
          w-[76px] xl:w-[96px] 2xl:w-[115px] 3xl:w-[147px] 
          h-[30px] xl:h-[37.8px] 2xl:h-[45.5px] 3xl:h-[58px] 
          rounded-[3px] xl:rounded-[4px] 2xl:rounded-[5px] 3xl:rounded-[6px] 
          text-[9.5px] xl:text-[12px] 2xl:text-[14px] 3xl:text-[18px]
          mr-[15.5px] xl:mr-[19.5px] 2xl:mr-[23.5px] 3xl:mr-[30px]"
        >
          Add new Article
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
  );
}

export default WriteArticle;
