import React, { useContext, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./SearchResult.css";
import { useState } from "react";
import FoodTag from "../../components/FoodTag/FoodTag";
//import { useNavigate } from "react-router-dom";
//import { AIContext } from "../../context/ContextProvider";
import {
  IngredientContext,
  StyleContext,
  LoginContext,
  UserContext,
  CourseContext,
  SearchContext,
  ServingContext,
} from "../../context/ContextProvider";

function SearchResult() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const { ingredients, setIngredients } = useContext(IngredientContext);
  //const { flavors, setFlavors } = useContext(FlavorContext);
  const { courses, setCourses } = useContext(CourseContext);
  const { styles, setStyles } = useContext(StyleContext);
  const [ingredientsList, setIngredientsList] = useState([]);
  //const [flavorsList, setFlavorsList] = useState([]);
  const [stylesList, setStylesList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [loadEverything, setLoadEverything] = useState(true);
  const [loadInit, setLoadInit] = useState(true);
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);
  //const navigate = useNavigate();
  //const [chatAI, setChatAi] = useState(false);
  //const { setFromSearch } = useContext(AIContext);
  const { selectedOption, setSelectedOption } = useContext(SearchContext);
  const { serving, setServing } = useContext(ServingContext);
  const options = ["Least Ingredients", "Popularity", "Shortest Duration"];

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const response = await fetch(
          "https://progexbackend.onrender.com/init",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        setLoadInit(true);
        const data = await response.json();
        if (data.message === null || data.message !== "Token not found") {
          setUser(data);
          setIsLogin(true);
        }
        setLoadInit(false);
      } catch (error) {
        console.error("There was a problem fetching the mock data:", error);
      }
    };
    if (!isLogin) {
      fetchMockData();
    } else {
      setLoadInit(false);
    }
  }, [setUser, setIsLogin, isLogin, user]);

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const response = await fetch(
          "https://progexbackend.onrender.com/get-everything",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setLoadEverything(true);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setIngredientsList(data.data.ingredients);
        //setFlavorsList(data.data.flavours);
        setCoursesList(data.data.course);
        setStylesList(data.data.styles);
        setLoadEverything(false);
      } catch (error) {
        console.error("There was a problem fetching the mock data:", error);
      }
    };
    fetchMockData();
  }, []);

  useEffect(() => {
    if (!loadEverything && !loadInit) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [loadEverything, loadInit]);

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
    if (!ingredients.includes(id)) {
      const tempIngredients = [...ingredients, id];
      setIngredients(tempIngredients);
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

  function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
  }

  //Choosing Flavor
  const handleCourseChange = (value) => {
    if (value !== "None") {
      const valueNumber = parseInt(value, 10);
      if (!courses.includes(value)) {
        const tempCourse = [...courses, valueNumber];
        setCourses(tempCourse);
      }
    }
    selectElement("course", "None");
  };
  const getCourseByID = (id) => {
    const res = coursesList.filter((course) => {
      return course.id === id;
    });
    return res[0].course;
  };

  /*
  //Choosing Flavor
  const handleFlavorChange = (value) => {
    if (value !== "None") {
      const valueNumber = parseInt(value, 10);
      if (!flavors.includes(value)) {
        const tempFlavor = [...flavors, valueNumber];
        setFlavors(tempFlavor);
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
      if (!styles.includes(value)) {
        const tempStyle = [...styles, valueNumber];
        setStyles(tempStyle);
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

  const handleDeleteIngredients = (value) => {
    const tempIngredients = ingredients.filter((ingredient) => {
      return ingredient !== value;
    });
    setIngredients(tempIngredients);
  };

  const handleDeleteCourse = (value) => {
    const tempCourse = courses.filter((course) => {
      return course !== value;
    });
    setCourses(tempCourse);
  };

  /*
  const handleDeleteFlavors = (value) => {
    const tempFlavor = flavors.filter((flavor) => {
      return flavor !== value;
    });
    setFlavors(tempFlavor);
  };
  */
  const handleDeleteStyles = (value) => {
    const tempStyle = styles.filter((style) => {
      return style !== value;
    });
    setStyles(tempStyle);
  };

  const handleSubmit = () => {
    /*if (!chatAI) navigate("/search-result");
    else {
      setFromSearch(true);
      navigate("/chatAI");
    }*/
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };
  const handleChangeServing = (e) => {
    const { value } = e.target;
    setServing(value);
  };

  //lg:1024 xl:1280 2xl:1536
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <p
        className="font-bold 
      text-[33.5px] xl:text-[42px] 2xl:text-[50px] 3xl:text-[64px] 
      mt-[21.9px] xl:mt-[27.5px] 2xl:mt-[33px] 3xl:mt-[42px] 
      mb-[32px] xl:mb-[41px] 2xl:mb-[49px] 3xl:mb-[63px] 
      text-center"
      >
        Let's Craft Your Dish
      </p>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div
          className="flex-grow-1 flex justify-center h-full
      gap-x-[30px] xl:gap-x-[37px] 2xl:gap-x-[44.5px] 3xl:gap-x-[57px]"
        >
          <div
            className="border-4 border-b-0
        rounded-t-[10px] xl:rounded-t-[13px] 2xl:rounded-t-[15.5px] 3xl:rounded-t-[20px] 
        border-[#803D3B] 
        w-[473px] xl:w-[592px] 2xl:w-[710px] 3xl:w-[907px] 
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
            <form>
              <div>
                <div
                  className=" relative 
              w-[418.5px] xl:w-[523px] 2xl:w-[628px] 3xl:w-[801px] 
              h-[38px] xl:h-[47.5px] 2xl:h-[57px] 3xl:h-[73px]  
              flex items-center 
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
                w-[423px] xl:w-[529px] 2xl:w-[635px] 3xl:w-[810px] 
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
              <div
                className="relative 
            w-[418px] xl:w-[523px] 2xl:w-[627px] 3xl:w-[801px] 
            h-[38px] xl:h-[47px] 2xl:h-[57px] 3xl:h-[73px] 
            mb-[35px] xl:mb-[44px] 2xl:mb-[52.5px] 3xl:mb-[67px]"
              >
                <select
                  name="course"
                  id="course"
                  className="border border-[#000] 
                rounded-[10.5px] xl:rounded-[13px] 2xl:rounded-[15px] 3xl:rounded-[20px] 
                w-[420px] xl:w-[524px] 2xl:w-[629px] 3xl:w-[803px] 
                h-[38px] xl:h-[47.5px] 2xl:h-[57px] 3xl:h-[73px] 
                text-center 
                text-[18px] xl:text-[22px] 2xl:text-[26.5px] 3xl:text-[34px] 
                font-light cursor-pointer 
                pr-[33px] xl:pr-[41px] 2xl:pr-[50px] 3xl:pr-[64px]"
                  onChange={(e) => handleCourseChange(e.target.value)}
                >
                  <option value="None">Select your preferred courses</option>
                  {coursesList.map((course) => (
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
            w-[418.5px] xl:w-[523px] 2xl:w-[628px] 3xl:w-[801px] 
            h-[38px] xl:h-[47px] 2xl:h-[57px] 3xl:h-[73px] 
            mb-[35px] xl:mb-[44px] 2xl:mb-[52.5px] 3xl:mb-[67px]"
              >
                <select
                  name="type"
                  id="type"
                  className="border border-[#000] 
                rounded-[10.5px] xl:rounded-[13px] 2xl:rounded-[15px] 3xl:rounded-[20px] 
                w-[420px] xl:w-[524px] 2xl:w-[629px] 3xl:w-[803px] 
                h-[38px] xl:h-[47.5px] 2xl:h-[57px] 3xl:h-[73px] 
                text-center 
                text-[18px] xl:text-[22px] 2xl:text-[26.5px] 3xl:text-[34px]  
                font-light cursor-pointer 
                pr-[33px] xl:pr-[41px] 2xl:pr-[50px] 3xl:pr-[64px]"
                  onChange={(e) => handleStyleChange(e.target.value)}
                >
                  <option value="None">Choose your style of dish</option>
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
              <div className="mb-[15px]">
                <h2
                  className="
                text-[10px] xl:text-[16px] 2xl:text-[20px] 3xl:text-[30px] 
                font-semibold text-center mb-[10px]"
                >
                  Search by
                </h2>
                <div className="w-full flex gap-x-3 mb-3">
                  {options.map((option, index) => (
                    <div
                      key={index}
                      className="flex gap-x-3 justify-center items-center"
                    >
                      <div
                        className={`w-[20px] xl:w-[26px] 2xl:w-[30px] 3xl:w-[40px]
                      h-[20px] xl:h-[26px] 2xl:h-[30px] 3xl:h-[40px]
                      border-[2px] border-black cursor-pointer`}
                        onClick={() => handleOptionClick(index)}
                      >
                        {selectedOption === index ? (
                          <img
                            src="/img/Check.png"
                            alt=""
                            className="w-[20px] xl:w-[26px] 2xl:w-[30px] 3xl:w-[40px]
                      h-[20px] xl:h-[26px] 2xl:h-[30px] 3xl:h-[40px]"
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                      <p>{option}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-x-3 justify-center items-center">
                  <div
                    className={`w-[20px] xl:w-[26px] 2xl:w-[30px] 3xl:w-[40px]
                      h-[20px] xl:h-[26px] 2xl:h-[30px] 3xl:h-[40px]
                      border-[2px] border-black cursor-pointer`}
                    onClick={() => handleOptionClick(3)}
                  >
                    {selectedOption === 3 ? (
                      <img
                        src="/img/Check.png"
                        alt=""
                        className="w-[20px] xl:w-[26px] 2xl:w-[30px] 3xl:w-[40px]
                      h-[20px] xl:h-[26px] 2xl:h-[30px] 3xl:h-[40px]"
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <p>Serving</p>
                  <input
                    type="number"
                    id="Serving"
                    name="Serving"
                    placeholder={0}
                    value={serving}
                    onChange={handleChangeServing}
                    className="border-[2.5px] w-[70px]
                  bg-opacity-75 focus:outline-none
                    h-[31px] xl:h-[39px] 2xl:h-[47px] 3xl:h-[60px]
                    p-[10.5px] xl:p-[13px] 2xl:p-[15.5px] 3xl:p-[20px] 
                    rounded-[4px] xl:rounded-[5px] 2xl:rounded-[6px] 3xl:rounded-[8px]"
                  />
                </div>
              </div>
              {/*
                <div
                  className="flex items-center 
            mb-[35px] xl:mb-[44px] 2xl:mb-[52.5px] 3xl:mb-[67px]"
                >
                  <input
                    type="checkbox"
                    id="vegetarian"
                    name="vegetarian"
                    checked={chatAI}
                    onChange={() => setChatAi(!chatAI)}
                    className="cursor-pointer
                h-[18px] xl:h-[22px] 2xl:h-[26.5px] 3xl:h-[34px] 
                w-[18px] xl:w-[22px] 2xl:w-[26.5px] 3xl:w-[34px] 
                mr-[15.5px] xl:mr-[19.5px] 2xl:mr-[23.5px] 3xl:mr-[30px]"
                  />
                  <label
                    htmlFor="vegetarian"
                    className="
                text-[18px] xl:text-[22px] 2xl:text-[26.5px] 3xl:text-[34px] 
                font-light cursor-pointer"
                  >
                    Use AI
                  </label>
                </div>
              */}
            </form>
          </div>
          <div
            className="border-4 border-b-0 h-full 
        rounded-t-[10.5px] xl:rounded-t-[13px] 2xl:rounded-t-[15.5px] 3xl:rounded-t-[20px] 
        border-[#803D3B] 
        w-[473px] xl:w-[592px] 2xl:w-[710px] 3xl:w-[907px] 
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
                Ingredients:
              </p>
              <div className="grid grid-cols-3">
                {ingredients.map((ingredient, id) => (
                  <FoodTag
                    key={ingredient}
                    value={getIngredientByID(ingredient)}
                    id={ingredient}
                    handleDelete={handleDeleteIngredients}
                  />
                ))}
              </div>
              <hr
                className="border-2 border-[#E4C59E] 
            mb-[10.5px] xl:mb-[13px] 2xl:mb-[15.5px] 3xl:mb-[20px]"
              />
            </div>
            <div>
              <p
                className="font-bold 
            text-[22px] xl:text-[27.5px] 2xl:text-[33px] 3xl:text-[42px] 
            text-center 
            mb-[10.5px] xl:mb-[13px] 2xl:mb-[15.5px] 3xl:mb-5 
            mt-[31px] xl:mt-[39px] 2xl:mt-[47px] 3xl:mt-[60px]"
              >
                Preferred Courses
              </p>
              <div className="grid grid-cols-3">
                {courses.map((course) => (
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
              <div className="grid grid-cols-3">
                {styles.map((style) => (
                  <FoodTag
                    key={style}
                    value={getStyleByID(style)}
                    id={style}
                    handleDelete={handleDeleteStyles}
                  />
                ))}
              </div>
              {/* Link to another page*/}
              <div
                className="font-bold 
            text-[9.5px] xl:text-[11.5px] 2xl:text-[14px] 3xl:text-[18px] 
            w-[103px] xl:w-[128.5px] 2xl:w-[154px] 3xl:w-[197px] 
            h-[30px] xl:h-[37px] 2xl:h-[45.5px] 3xl:h-[58px] 
            bg-[#322C2B] text-white text-center 
            pt-[9.5px] xl:pt-[11.5px] 2xl:pt-[14px] 3xl:pt-[18px] 
            rounded-[3px] xl:rounded-[4px] 2xl:rounded-[5px] 3xl:rounded-[6px] 
            absolute bottom-0 right-0 cursor-pointer"
                onClick={handleSubmit}
              >
                Cook now {"->"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchResult;
