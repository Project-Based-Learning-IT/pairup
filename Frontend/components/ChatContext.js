import React from 'react';

const ChatContext = React.createContext();
function useChat() {
  return useContext(ChatContext);
}

export {ChatContext, useChat};
