import React, { useEffect } from 'react';
import axios from 'axios';

export const Chats = () => {
  const fetchChats = async () => {
    const res = await axios.get('/api/chats');
    const chatData = res.data;
    console.log(chatData);
  };
  useEffect(() => {
    fetchChats();
  }, []);
  return <div>Chats</div>;
};
