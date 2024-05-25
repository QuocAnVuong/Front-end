import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useParams } from "react-router-dom";
import { LoginContext, UserContext } from "../../context/ContextProvider";

function Recipe() {
  const { articleID } = useParams();
  const { user, setUser } = useContext(UserContext);
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const [loadArticle, setLoadArticle] = useState(true);
  const [loadIngredient, setLoadIngredient] = useState(true);
  const [loadInit, setLoadInit] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState(null);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [loadLike, setLoadLike] = useState(true);
  const [liked, setLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const response = await fetch("http://localhost:3000/init", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        setLoadInit(true);
        const data = await response.json();
        if (data.message === null || data.message !== "Token not found") {
          setUser(data);
          setIsLogin(true);
        }
        setLoadInit(false);
      } catch (error) {
        console.error(
          "There was a problem fetching the init data in Recipe.js:",
          error
        );
      }
    };

    const fetchLikeData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/user/get-liked-article",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        setLoadLike(true);
        setLiked(false);
        const data = await response.json();
        console.log(data);
        if (data & (data.length > 0)) {
          const data2 = data.filter((item) => item.ArticleID === articleID);
          if (data2 & (data2.length > 0)) {
            setLiked(true);
            console.log("User has liked this post");
          } else {
            console.log("User has not liked this post");
          }
        } else {
          console.log("User has not liked this post");
        }
        setLoadLike(false);
      } catch (error) {
        console.error(
          "There was a problem fetching the like data in Recipe.js:",
          error
        );
      }
    };

    if (!isLogin) {
      fetchMockData();
      fetchLikeData();
    } else {
      setLoadInit(false);
    }
  }, [setUser, setIsLogin, isLogin, user, articleID]);

  useEffect(() => {
    const fetchMockData = async () => {
      try {
        const requestBody = {
          ArticleID: articleID,
        };
        const response = await fetch(
          "http://localhost:3000/user/get-one-article",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );
        setLoadArticle(true);
        const data = await response.json();
        setRecipe(data[0]);
        setLoadArticle(false);
      } catch (error) {
        console.error(
          "There was a problem fetching the article data in Recipe.js:",
          error
        );
      }
    };

    const fetchIngredients = async () => {
      try {
        const response = await fetch("http://localhost:3000/get-everything", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setLoadIngredient(true);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setIngredientsList(data.data.ingredients);
        setLoadIngredient(false);
      } catch (error) {
        console.error(
          "There was a problem fetching the ingredient data in Recipe.js:",
          error
        );
      }
    };
    fetchMockData();
    fetchIngredients();
  }, [articleID]);

  useEffect(() => {
    if (!loadArticle && !loadIngredient && !loadInit && !loadLike) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [loadArticle, loadIngredient, loadInit, loadLike]);

  const getIngredientByID = (id) => {
    const res = ingredientsList.filter((ingredient) => {
      return ingredient.IngredientID === id;
    });
    return res[0].IngredientName;
  };

  const getDay = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  };

  const handleLike = () => {
    const fetchUserLikeData = async () => {
      try {
        setIsLiking(true);
        console.log(articleID);
        const requestBody = {
          ArticleID: articleID,
        };
        const response = await fetch(
          "http://localhost:3000/user/like-article",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(requestBody),
          }
        );
        const data = await response.json();
        console.log(data);
        setLiked(true);
      } catch (error) {
        console.error(
          "There was a problem fetching the user like data in Recipe.js:",
          error
        );
      }
    };
    fetchUserLikeData();
  };

  return (
    <div>
      <NavBar />
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="w-[700px] text-[#322C2B]">
            <div className="flex items-center justify-between">
              <p className="font-bold text-[72px]">{recipe.Title}</p>
              <img
                src={
                  liked ? "/img/bookmark-yellow.png" : "/img/bookmark-white.png"
                }
                alt=""
                className="w-[50px] h-[50px]"
                onClick={() => {
                  if (!isLiking) {
                    handleLike();
                  }
                }}
              />
            </div>
            <div className="font-normal text-[18px] mt-[25px]">
              Short description: <span>{recipe.Description}</span>
            </div>
            <div className="flex items-center font-normal text-[16px] gap-x-[26px]">
              <div>
                Submitted by{" "}
                <span className="font-bold cursor-pointer">
                  {recipe.UserID}
                </span>
              </div>
              <div>|</div>
              <div>Published on {getDay(recipe.PublicationDate)}</div>
            </div>
            <img
              src={recipe.Image}
              alt="3People"
              className="w-full mt-[30px]"
            />
            <div className="border border-[#322C2B] w-full rounded-[8px] my-[30px] p-[20px]">
              <div className="bg-[#AF8260] w-full border-none rounded-t-[8px] h-[32px] mb-[30px]" />
              <div className="flex items-center justify-between w-full">
                <div className="flex mr-[50px] ">
                  <img
                    src="/img/clock.png"
                    alt=""
                    className="w-[30px] h-[30px]"
                  />
                  <div className="text-[#404040] font-medium text-[24px] ml-[30px]">
                    {recipe.Duration} minutes
                  </div>
                </div>
                <div className="flex">
                  <img
                    src="/img/user.png"
                    alt=""
                    className="w-[30px] h-[30px]"
                  />
                  <div className="text-[#404040] font-medium text-[24px] ml-[30px]">
                    {recipe.Serving} people
                  </div>
                </div>
              </div>
            </div>
            <p className="font-bold text-[56px] mb-[25px] ">Ingredients</p>
            <ul className="list-disc mb-[25px]">
              {recipe.IngredientID.map((ingredient, id) => (
                <li
                  key={id}
                  className="font-normal text-[#404040] text-[24px] ml-[30px]"
                >
                  {getIngredientByID(ingredient)}
                </li>
              ))}
            </ul>
            <p className="font-bold text-[56px] mb-[25px]">Directions</p>
            <article className="font-normal text-[24px]">
              {recipe.Content}
            </article>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recipe;
