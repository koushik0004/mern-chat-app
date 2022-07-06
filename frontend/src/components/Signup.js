import { useState } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import {
  VStack,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Button,
  Input
} from '@chakra-ui/react';

export const Signup = () => {
  const [show, setShow] = useState(false);
  const [signupData, setSignupData] = useState({});
  const updateSignupForm = (evt) => {
    setSignupData((signup) => ({
      ...signup,
      [evt.target.name]: evt.target.value
    }));
  };
  const postDetails = (file) => {
    console.log(file);
  };
  const submitHandler = (evt) => {
    evt.preventDefault();
    console.log(setSignupData);
  };
  return (
    <VStack spacing={5} align="stretch">
      <FormControl isRequired>
        <FormLabel htmlFor="name">User Name</FormLabel>
        <Input
          id="name"
          type="text"
          name="name"
          value={signupData?.name || ''}
          onChange={(evt) => updateSignupForm(evt)}
        />
        <FormHelperText>User full name</FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="email">Email Address</FormLabel>
        <Input
          name="email"
          id="email"
          type="email"
          onChange={(evt) => updateSignupForm(evt)}
          value={signupData?.email || ''}
        />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            name="password"
            type={show ? 'text' : 'password'}
            placeholder="Enter Password"
            onChange={(evt) => updateSignupForm(evt)}
            value={signupData?.password || ''}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="passwordConfirm" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          name="passwordConfirm"
          type={show ? 'text' : 'password'}
          placeholder="Confirm password"
          onChange={(evt) => updateSignupForm(evt)}
          value={signupData?.passwordConfirm || ''}
        />
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};
