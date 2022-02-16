import React, { useState, useEffect, useRef } from "react";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuth } from "../Auth";
import styled from "styled-components";

function UserList({ mate }) {
  const id = useRef(null);
  console.log(mate);
  const [chat, setChat] = useState([]);
  const { curUser } = useAuth();

  //user list except current user
  const list = mate.filter((m) => m.email !== curUser?.email);

  //crate chat
  const createChat = async (id) => {
    const chatRef = collection(db, "chats");
    const q = query(chatRef, where("users", "array-contains", curUser?.uid));
    const querySnapshot = await getDocs(q);

    const chatAlreadyExist = (mate_id) =>
      !!querySnapshot?.docs.find(
        (chat) => chat.data().users.find((user) => user === mate_id)?.length > 0
      );
    console.log("create chat", mate);

    if (!chatAlreadyExist(id)) {
      addDoc(chatRef, { users: [curUser?.uid, id] });
    } else {
      console.log("chat aready exists");
    }
  };

  return (
    <>
      <Container>
        <Title>Users</Title>
        {list.map((m) => (
          <List key={m.id} ref={id} onClick={() => createChat(m.id)}>
            {m.email}
          </List>
        ))}
      </Container>
    </>
  );
}

export default UserList;

const Container = styled.div`
  height: 80vh;
  background-color: #9ca1f0;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.1em;
  padding: 0.3em 0.3em;
`;
const List = styled.div`
  padding: 1em 0.5em;
  cursor: pointer;
`;
