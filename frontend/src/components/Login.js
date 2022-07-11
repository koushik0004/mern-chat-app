import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';

export const Login = () => {
  const [show, setShow] = useState(false);
  const [loginForm, setLoginForm] = useState({
    loginEmail: '',
    loginPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const updateLoginForm = (evt) => {
    console.log(evt.target.value);
    setLoginForm((loginData) => ({
      ...loginData,
      [evt.target.name]: evt.target.value
    }));
  };
  const submitHandler = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    const { loginEmail, loginPassword } = loginForm;
    if (!loginEmail || !loginPassword) {
      toast({
        title: 'Please Fill all the Fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
      setLoading(false);
      return;
    }
    // console.log(loginForm);
    try {
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      };

      const { data } = await axios.post(
        '/api/user/login',
        { email: loginEmail, password: loginPassword },
        config
      );
      console.log(JSON.stringify(data));
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      history.push('/chats');
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error Occurred!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
      setLoading(false);
    }
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
          onClick={() =>
            setLoginForm((login) => ({
              ...login,
              loginEmail: `${process.env.REACT_APP_GUEST_UER_EMAIL}`,
              loginPassword: `${process.env.REACT_APP_GUEST_UER_LOGIN}`
            }))
          }
        >
          Get Guest User Credentials
        </Button>
      </VStack>
    </div>
  );
};
