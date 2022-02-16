import React from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <Container>
        <p>
          <Link href="/signup">
            <span>Go to signup</span>
          </Link>
          <Link href="/login">
            <span>Go to login</span>
          </Link>
        </p>
      </Container>
    </React.Fragment>
  );
}

export default Home;

const Container = styled.div`
  width: 20em;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  text-align: center;
  p {
    display: flex;
    flex-direction: column;
    span {
      padding: 1em 1em;
      background-color: #757de8;
      margin: 0.5em;
      color: #fff;
      border-radius: 8px;
      cursor: pointer;
      &:hover {
        font-weight: 600;
      }
    }
  }
`;
