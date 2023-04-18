import { FunctionComponent as FC } from 'react';
import { useState, useEffect } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  FormControl,
  InputRightElement
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import AuthService from '../../services/auth.service';

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Auth: FC<{}> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const authService = AuthService.getInstance();

  const navigate = useNavigate();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!email || !password) return toast.error('Please fill in all fields!');

    authService.loginWithEmailAndPassword(email, password, setSuccess);
  };

  useEffect(() => {
    if (success) {
      navigate('/');
    }
  }, [success]);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      //   justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading color="brand.100" size={'4xl'} mt={'20'} mb={'36'}>
          Login Here
        </Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="lg"
              shadow={'lg'}
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email address"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="brand"
                width="full"
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Auth;
