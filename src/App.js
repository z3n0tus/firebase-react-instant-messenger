import React from 'react';
import useAuth from './custom-hooks/useAuth';
import useChats from './custom-hooks/useChats';
import Connect from './components/Connect';
import ChatWindow from './components/ChatWindow';
import CreateChat from './components/CreateChat';
import ActiveChats from './components/ActiveChats';

import './App.css';

const App = () => {
  const [userId, users, connect] = useAuth();
  const {
    myActiveChats,
    setCurrentChat,
    createChat,
    sendMessage,
    currentChat,
    currentChatMessages,
  } = useChats(userId);

  return (
    <div className="App">
      { !userId ? <Connect connect={connect} /> : (
        <>
          <p style={{ color: 'green' }}>Connected as: {userId}</p>
          <ActiveChats setCurrentChat={setCurrentChat} myActiveChats={myActiveChats} />
          <CreateChat createChat={createChat} users={users.filter(user => user !== userId)} />
          { currentChat && <ChatWindow sendMessage={sendMessage} currentChat={currentChat} messages={currentChatMessages} /> }
        </>
      )}
    </div> 
  );
}

export default App;


