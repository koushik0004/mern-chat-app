import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import {
  VStack,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Button,
  Input,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';

export const Signup = () => {
  const [show, setShow] = useState(false);
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState('');
  const history = useHistory();
  const toast = useToast();
  const updateSignupForm = (evt) => {
    setSignupData((signup) => ({
      ...signup,
      [evt.target.name]: evt.target.value
    }));
  };
  const postDetails = (file) => {
    setLoading(true);
    if (file === undefined) {
      toast({
        title: 'Please select an Image!',
        description: 'Warning! no image selected',
        status: 'warning',
        duration: 9000,
        isClosable: true,
        position: 'bottom'
      });
      setLoading(false);
      return;
    }
    if (
      file.type !== 'image/jpeg' ||
      file.type !== 'image/jpg' ||
      file.type !== 'image/png'
    ) {
      const fileData = new FormData();
      fileData.append('file', file);
      fileData.append(
        'upload_preset',
        `${process.env.REACT_APP_CLOUDINARY_APPNAME}`
      );
      fileData.append('cloud_name', `${process.env.REACT_APP_CLOUDINARY_NAME}`);
      axios
        .post(`${process.env.REACT_APP_CLOUDINARY_UPLOAD}`, fileData)
        .then((res) => {
          // console.log(res.data);
          setPic(res.data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          toast({
            title: 'Error! Image uploading',
            description: 'Image upload was not successful',
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'bottom'
          });
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: 'Selected file not an Image!',
        description: 'Warning! no image selected',
        status: 'warning',
        duration: 9000,
        isClosable: true,
        position: 'bottom'
      });
      setLoading(false);
    }
    // console.log(file);
  };
  const submitHandler = async (evt) => {
    evt.preventDefault();
    const { name, email, password, passwordConfirm } = signupData;
    setLoading(true);
    if (!name || !email || !password || !passwordConfirm) {
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
    if (password !== passwordConfirm) {
      toast({
        title: 'Passwords Do Not Match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
      return;
    }
    console.log(signupData, pic);
    try {
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      };
      const { data } = await axios.post(
        '/api/user',
        {
          name,
          email,
          password,
          pic
        },
        config
      );
      console.log(data);
      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      history.push('/chats');
    } catch (err) {
      toast({
        title: 'Error Occurred!',
        description: err.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom'
      });
      setLoading(false);
    }
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
        {pic !== '' && (
          <div>
            <img src={pic} width="100" alt="uploaded file" />
          </div>
        )}
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
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};
