import React, { useEffect, useState } from "react";
import message from "../dummy.json";
import getMateData from "./getMateData";
import { useRouter } from "next/router";
import { useAuth } from "../Auth";
import {
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
  collection,
  query,
  orderBy,
  onSnapshot,
  querySnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

import styled from "styled-components";
import { FiSend } from "react-icons/fi";
import data from "../dummy.json";

const ChatContent = (props) => {
  const router = useRouter();
  //current user
  const { curUser } = useAuth();
  const [loading, setLoading] = useState(false);

  //chat mate
  const [mate, setMate] = useState({});
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  console.log(props.chatId);

  useEffect(() => {
    setLoading(true);
    try {
      const messageRef = collection(db, "chats", props.chatId, "message");
      const q = query(messageRef, orderBy("createdAt", "asc"));
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        setMessages(
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            createdAt: doc.data().timestamp?.toDate().getTime(),
          }))
        );
      });

      console.log(messages);
      return unsubscribe;
    } catch (err) {}

    return () => {
      setLoading(false);
    };
  }, [props.chatId]);

  useEffect(() => {
    setLoading(true);
    try {
      if (props.chatId.length > 0) {
        getMateData(chatParse.users).then((data) => {
          setMate(data);
        });
      } else {
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [props.chatId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    //user active time
    const usersRef = doc(db, "users", curUser?.uid);
    setDoc(usersRef, { lastSeen: serverTimestamp() }, { merge: true });

    //meessage data
    const messageRef = collection(db, "chats", props.chatId, "message");
    await addDoc(messageRef, {
      createdAt: serverTimestamp(),
      message: input,
      user: curUser?.email,
    });

    //latest message
    const chatRef = doc(db, "chats", props.chatId);
    setDoc(
      chatRef,
      {
        latestMessage: input,
        createdAt: serverTimestamp(),
      },
      { merge: true }
    );
    setInput("");
  };
  return (
    <>
      <Container>
        <Header>
          <span onClick={() => router.push("/chat")}>back</span>
          <h3>{mate?.email}</h3>
        </Header>
        <MessageContainer>
          {message.map((mes) =>
            mes.id === curUser?.uid ? (
              <MyMessage key={mes.id}>{mes.message}</MyMessage>
            ) : (
              <Message key={mes.id}>{mes.message}</Message>
            )
          )}
        </MessageContainer>

        <InputContainer>
          <input
            value={input}
            type="text"
            placeholder="message..."
            onChange={(e) => setInput(e.target.value)}
          />
          <FiSend onClick={sendMessage} className="sendbtn" size="20" />
        </InputContainer>
      </Container>
    </>
  );
};

export default ChatContent;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  .sendbtn {
    margin-left: 1.5%;
    cursor: pointer;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.6em 0.5em;
  border-bottom: 1px solid #eee;
  text-align: left;
  background-color: #fff;

  span {
    cursor: pointer;
  }

  h3 {
    height: 20px;
    margin: 0;
  }

  div {
    font-size: 0.6em;
    margin: 0.5em 0;
  }
`;

const MessageContainer = styled.div`
  width: 100%;
  background-color: #eee;
  height: 90vh;
  display: flex;
  flex-direction: column;
`;
const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: sticky;
  bottom: 0;
  z-index: 100;

  input {
    width: 95%;
    padding: 0.9em 0.9em;
    border-radius: 8px;
  }
`;

const Message = styled.div`
  margin-left: auto;
  margin: 0.5em 0.5em;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 0.8em;
`;

const MyMessage = styled.div`
  margin: 0.5em 0.5em;
  margin-left: auto;
  background-color: #3f51b5;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 0.8em;
  color: #fff;
  text-align: left;
`;
