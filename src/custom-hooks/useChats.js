import React from 'react';
import uuid from 'uuid';
import { getFromDatabase, saveToDatabase } from '../database';

const useChats = (userId) => {
  const [currentChat, setCurrentChat] = React.useState(null);
  const [myActiveChats, setMyActiveChats] = React.useState([]);
  const [currentChatMessages, setCurrentChatMessages] = React.useState([]);

  React.useEffect(() => {
    getFromDatabase(`/${userId}/chats`, res => {
      setMyActiveChats(Object.keys(res));
    });
  
    getFromDatabase(`/chats/${currentChat}/messages`, res => {
      setCurrentChatMessages(Object.values(res));
    });
  }, [currentChat, userId]);

  const sendMessage = (chatName, body) => {
    const messageId = uuid();
    saveToDatabase(`/chats/${chatName}/messages/${messageId}`, {
      body, sender: userId, created: new Date().toISOString(),
    })
  };

  const createChat = (recipient, chatName) => {
    const fullChatName = `${chatName}-${uuid()}`;
    saveToDatabase(`/${recipient}/chats/${fullChatName}`, fullChatName);
    saveToDatabase(`/${userId}/chats/${fullChatName}`, fullChatName);
    saveToDatabase(`/chats/${fullChatName}/messages`, {});
    setCurrentChat(fullChatName);
  }

  return {
    sendMessage,
    createChat,
    currentChat,
    myActiveChats,
    currentChatMessages,
    setCurrentChat
  };
};

export default useChats;


