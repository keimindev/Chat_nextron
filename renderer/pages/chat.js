import React from "react";
import Head from "next/head";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";

const chat = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Container>
        <Sidebar />
      </Container>
    </>
  );
};

export default chat;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
