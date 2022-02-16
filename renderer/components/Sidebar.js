import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import UserProfile from "./UserProfile";
import ChatList from "./ChatList";

import { db } from "../firebase";
import { useAuth } from "../Auth";
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import styled from "styled-components";

const Sidebar = () => {
  const { curUser } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [mate, setMate] = useState([]);
  const [chats, setChats] = useState([]);

  const fetchUserData = async () => {
    const userRef = collection(db, "users");
    const querySnapshot = await getDocs(userRef);
    setMate(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchUserData();
    //if you dont put it in, chat-list doesn't show up
    setMounted(true);
    try {
      const chatRef = collection(db, "chats");
      const q = query(chatRef, where("users", "array-contains", curUser?.uid));

      console.log("charref", chatRef, q);

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setChats(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
      return () => {
        unsubscribe;
      };
    } catch (err) {}

    setMounted(false);
  }, []);
  return (
    <>
      <Container>
        <Left>
          <UserProfile />
          <UserList mate={mate} />
        </Left>
        <Right>
          {chats.map((chat) => (
            <ChatList
              key={chat.id}
              id={chat.id}
              users={chat.users}
              latestMessage={chat.latestMessage}
            />
          ))}
        </Right>
      </Container>
    </>
  );
};

export default Sidebar;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const Left = styled.div`
  width: 20%;
  margin: 0;
`;
const Right = styled.div`
  width: 80%;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.1);
`;
