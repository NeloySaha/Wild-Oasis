import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { Link } from "react-router-dom";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const SignUpText = styled.div`
  justify-self: center;
  font-size: 1.2rem;
  font-weight: 400;
  display: flex;
  gap: 0.6rem;
  color: var(--color-grey-500);
`;

const StyledLink = styled(Link)`
  &:link,
  &:visited {
    color: var(--color-brand-500);
    font-weight: 600;
    transition: all 0.3s;
  }
  &:hover {
    color: var(--color-brand-300);
  }
`;

function Login() {
  return (
    <>
      <LoginLayout>
        <Logo />
        <Heading as="h4">Sign in to your account</Heading>
        <LoginForm />
        <SignUpText>
          <p>Don&apos;t have an account?</p>
          <StyledLink to="/signup">Sign up</StyledLink>
        </SignUpText>
      </LoginLayout>
    </>
  );
}

export default Login;
