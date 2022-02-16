import React from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import styled from "styled-components";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "../Auth";

const UserProfile = () => {
  const router = useRouter();
  const { curUser } = useAuth();
  console.log("curUser", curUser);

  const logout = () => {
    auth.signOut();
    router.push("home");
  };
  return (
    <>
      <Container>
        <Title>
          <IoLogOutOutline size={24} className="icon" onClick={logout} />
        </Title>
        <Box>
          <h2>Hello,</h2>
          <h3>{curUser?.email}</h3>
        </Box>
      </Container>
    </>
  );
};

export default UserProfile;

const Container = styled.div`
  height: 20vh;
  padding: 1em 1em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  background-color: #757de8;
`;

const Title = styled.div`
  display: flex;
  justify-content: end;

  .icon {
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  }
`;

const Box = styled.div``;
