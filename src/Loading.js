import React from "react";
import styled from "styled-components";

export default function Loading() {
  return (
    <StyledLoading>Loading...</StyledLoading>
  )
}

const StyledLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
`;

