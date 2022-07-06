import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { useState } from 'react';

export const Login = () => {
  const [show, setShow] = useState(false);
  const [loginForm, setLoginForm] = useState({});
  const [loading, setLoading] = useState(false);

  const updateLoginForm = (evt) => {
    console.log(evt.target.value);
    setLoginForm((loginData) => ({
      ...loginData,
      [evt.target.name]: evt.target.value
    }));
  };
  const submitHandler = (evt) => {
    evt.preventDefault();
    setLoading(true);
    console.log(loginForm);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      <VStack spacing="10px">
        <FormControl id="login-email" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            name="loginEmail"
            value={loginForm?.loginEmail || ''}
            type="email"
            placeholder="Enter Your Email Address"
            onChange={(e) => updateLoginForm(e)}
          />
        </FormControl>
        <FormControl id="login-password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              name="loginPassword"
              value={loginForm?.loginPassword || ''}
              onChange={(e) => updateLoginForm(e)}
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Login
        </Button>
        <Button
          variant="solid"
          colorScheme="red"
          width="100%"
          onClick={() => {
            setLoginForm({
              loginEmail: 'guest@example.com',
              loginPassword: '123456'
            });
          }}
        >
          Get Guest User Credentials
        </Button>
      </VStack>
    </div>
  );
};
