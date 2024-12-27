"use client";

import { useEffect } from "react";

const SerenityChat = () => {
  const initChat = () => {
    //@ts-ignore
    const chat = new AIHubChat("aihub-chat", {
      apiKey: "0ad5d88e-21fa-43c2-aeca-6cad99b189f8",
      agentCode: "carla",
      baseURL: "https://api.serenitystar.ai/api",
    });
    chat.init();
  };

  useEffect(() => {
    initChat();
  }, []);

  return null;
};

export default SerenityChat;