import styled from "styled-components";

const CustomButton = styled.button`
  padding: 10px;
  background: #c8ab06;
  color: white;
  font-size: 17px;
  border: 1px solid grey;
  border-left: none;
  cursor: pointer;
  border-radius: 0px 10px 10px 0px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  &:disabled {
    background-color: #7f8c8d; /* Use a different color for the disabled state */
    color: #bdc3c7; /* Adjust text color for better visibility */
    cursor: not-allowed;
  }
`;

const Button = (props) => {
  return <CustomButton {...props} />;
};
export default Button;
