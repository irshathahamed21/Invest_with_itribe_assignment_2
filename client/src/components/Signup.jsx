import styled from "styled-components";
import {useState} from "react"


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
  
  display: flex;
  align-items: center;
  justify-content: center;

`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  margin:auto;
 
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Signup = () => {

const[username, setUsername] = useState()
const[email,setEmail] = useState()
const[password, setPassword] = useState()
const[message, setMessage] = useState()

let handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let res = await fetch("http://localhost:2500/shop/signup", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username: username,
        email: email,
        password:password,
      }),
    });
    let resJson = await res.json();
    console.log(resJson)
    if (res.status === 200) {
      setUsername("");
      setEmail("");
      setMessage("User created successfully. you will receive a welcome mail");
    } else {
      setMessage("Some error occured");
    }
  } catch (err) {
    console.log(err);
  }
};

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit = {handleSubmit}>
          <Input type = "text"  onChange={(e) => {setUsername(e.target.value)}} placeholder="username" />
          <Input type = "email" onChange={(e) => {setEmail(e.target.value)}} placeholder="email" />
          <Input type = "password" onChange={(e) => {setPassword(e.target.value)}} placeholder="password" />
          <Input type = "password" placeholder="confirm password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
      <div style = {{textAlign:"center"}}>{message}  </div>
    </Container>
  );
};

export default Signup;