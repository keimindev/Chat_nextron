import React from "react";
import ChatContent from "../../components/ChatContent";
import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs, orderBy } from "firebase/firestore";

import styled from "styled-components";
import { useRouter } from "next/router";

const ChatBox = ({ chat, message }) => {
  const router = useRouter();
  const id = router.query;
  console.log(id);
  return (
    <Container>
      <ChatContainer>
        <ChatContent chat={chat} chatId={id} messageprops={message} />
      </ChatContainer>
    </Container>
  );
};

export default ChatBox;

export const getServerProps = async (context) => {
  console.log(context);
  //message data in chat collection
  const messageRef = collection(db, "chats", context.query.id, "message");
  const q = query(messageRef, orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);
  const messages = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    createdAt: doc.data().timestamp?.toDate().getTime(),
  }));
  //chat collection data
  const docRef = doc(db, "chats", context.query.id);
  const docSnap = await getDoc(docRef);
  console.log(docRef, docSnap);
  return {
    props: {
      chat: JSON.stringify(docSnap.data()),
      id: context.query.id,
      message: JSON.stringify(messages),
    },
  };
};

const Container = styled.div`
  display: flex;
  background-color: #eee;
  width: 100%;
`;

const ChatContainer = styled.div`
  width: 100%;
`;
