import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";

const login = () => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [pw, setPw] = useState();
  const [err, setErr] = useState();

  const submit = () => {
    try {
      signInWithEmailAndPassword(auth, email, pw);
      router.push("/chat");
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>MyChat - Login</title>
      </Head>
      <Container>
        <Title>Login</Title>
        <Loginbox>
          <Line>
            <p>Email</p>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Please enter your email"
            />
          </Line>
          <Line>
            <p>Password</p>
            <input
              type="password"
              onChange={(e) => setPw(e.target.value)}
              placeholder="Please enter password"
            />
          </Line>
          <Lastline>
            <span>계정이 없으신가요? </span>
            <Link href="/signup">
              <span>Signup</span>
            </Link>
          </Lastline>
          <Btn>
            <button onClick={submit}>Login</button>
          </Btn>
        </Loginbox>
      </Container>
    </>
  );
};

export default login;

const Container = styled.div`
  width: 400px;
  background-color: #757de8;
  padding: 20px 30px;
  border-radius: 16px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Title = styled.div`
  font-size: 34px;
  font-weight: 600;
  text-align: center;

  margin-bottom: 30px;
`;
const Loginbox = styled.div``;
const Line = styled.div`
  display: flex;
  flex-direction: row;

  margin: 5px auto;
  p {
    width: 100px;
    margin: 0;
  }
  input {
    width: 250px;
    height: 30px;
    border-radius: 8px;
    padding: 8px 10px;
    background-color: rgba(255, 255, 255, 0.6);
  }
`;

const Lastline = styled.div`
  display: flex;
  justify-content: end;
  padding-right: 0px;
  span {
    margin: 0 5px;
  }
  span:last-child {
    color: gold;
    cursor: pointer;
  }
`;

const Btn = styled.div`
  width: 100px;
  margin: 0 auto;
  button {
    width: 90px;
    padding: 10px 10px;
    margin: 10px 5px;
    background-color: #3f51b5;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
  }
`;
