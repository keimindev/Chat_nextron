import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import getMateData from "./getMateData";

//chat list
const ChatList = (props) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mate, setMate] = useState();

  const enterChat = () => {
    console.log("enter chat");
    router.push(`/chat/${props.id}`);
  };

  useEffect(() => {
    try {
      setMounted(true);
      //info about chat mate
      if (props.users.length > 0) {
        getMateData(props.users).then((data) => {
          setMate(data);
        });
      }
    } catch (err) {}

    setMounted(false);
  }, []);

  console.log(mate, mate?.lastSeen);

  return (
    <>
      <Container onClick={enterChat}>
        <ChatContainer>
          <Info>
            <p>{mate?.email}</p>
          </Info>
          <Latest>{props.latestMessage}</Latest>
        </ChatContainer>
      </Container>
    </>
  );
};

export default ChatList;

const Container = styled.div``;
const ChatContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0.2em 0.9em;
  border-radius: 16px;
  margin: 0.2em 0.2em;
  cursor: pointer;
`;

const Info = styled.div`
  p:nth-child(1) {
    font-size: 0.9em;
    font-weight: 700;
  }
  p:nth-child(2) {
    font-size: 0.5em;
  }
`;
const Latest = styled.div`
  font-size: 0.9em;
`;
