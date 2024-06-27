import React, { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import {
  AIContext,
  IngredientContext,
  FlavorContext,
  StyleContext,
} from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

function ChatAI() {
  const { fromSearch } = useContext(AIContext);
  const { ingredients } = useContext(IngredientContext);
  const { flavors } = useContext(FlavorContext);
  const { styles } = useContext(StyleContext);
  //const [loading, setLoading] = useState(true);
  //const [chatID, setChatID] = useState(undefined);
  const [chat, setChat] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!fromSearch) {
      navigate("/");
    } else {
      const fetchAIData = async () => {
        const requestBody = {
          Flavour: flavors,
          Style: styles,
          IngredientID: ingredients,
        };
        try {
          const response = await fetch(
            "https://progexbackend.onrender.com/user/chat-ai",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestBody),
            }
          );
          //setLoading(true);
          const data = await response.json();
          console.log(data);
          const newChat = [...chat, { role: "AI", value: data.response }];
          setChat(newChat);
          //setChatID(data.chatID);
          //setLoading(false);
        } catch (error) {
          console.error("There was a problem fetching the mock data:", error);
        }
      };
      fetchAIData();
    }
  }, [chat, flavors, fromSearch, ingredients, navigate, styles]);

  return (
    <div className="w-screen h-screen flex flex-col">
      <img
        src="img/Landing-page.png"
        alt=""
        className="w-full h-full fixed top-0 left-0 -z-10"
      />
      <NavBar />
      <div className="flex-grow w-full flex items-end justify-center">
        <div className="h-full w-1/2 pt-[30px] flex flex-col gap-y-[50px]">
          {chat.map((chatUser, id) => (
            <div key={id} className="w-1/2 bg-white rounded-lg p-[5px]">
              {chatUser.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatAI;
