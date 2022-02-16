import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import router, { useRouter } from "next/router";
import styled from "styled-components";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDisplayName } from "next/dist/shared/lib/utils";

const signup = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  //create account
  const createAccount = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pw)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.push("/login");
      })
      .catch((error) => {
        setErr(error.message);
      });
  };

  return (
    <>
      <Head>
        <title>MyChat - Signup</title>
      </Head>
      <Container>
        <Title>SignUp</Title>
        <Signupbox>
          <Line>
            <p>Nickname</p>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="please enter your name"
            />
          </Line>
          <Line>
            <p>Email</p>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="please enter your email"
            />
          </Line>
          <Line>
            <p>Password</p>
            <input
              type="password"
              onChange={(e) => setPw(e.target.value)}
              placeholder="please enter your password"
            />
          </Line>
          <Lastline>
            <span>계정이 있으신가요? </span>
            <Link href="/login">
              <span>Login</span>
            </Link>
          </Lastline>
          <button onClick={createAccount}>SignUp</button>
        </Signupbox>
      </Container>
    </>
  );
};

export default signup;
// #3f51b5 #757de8 #757de8
const Container = styled.div`
  width: 400px;
  background-color: #757de8;
  padding: 20px 30px;
  border-radius: 16px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  button {
    padding: 10px 10px;
    background-color: #3f51b5;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
  }
`;
const Title = styled.div`
  font-size: 34px;
  font-weight: 600;
  text-align: center;

  margin-bottom: 30px;
`;
const Signupbox = styled.div``;
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
