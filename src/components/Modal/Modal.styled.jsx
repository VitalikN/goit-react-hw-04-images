import styled from '@emotion/styled';

export const Box = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`;
export const ModalContent = styled.div`
  max-width: calc(100vw - 110px);
  max-height: calc(100vh - 150px);
  margin: 20px;
`;
