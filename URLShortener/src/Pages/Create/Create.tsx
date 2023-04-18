import { FunctionComponent as FC } from 'react';
import { useState, useEffect } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  chakra,
  Box,
  FormControl,
  InputRightElement,
  Text,
  HStack,
  InputLeftElement
} from '@chakra-ui/react';
import { FaCopy, FaLink, FaAngleLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LinkService from '../../services/link.service';

const CFaCopy = chakra(FaCopy);
const CFaLink = chakra(FaLink);
const CFaAngleLeft = chakra(FaAngleLeft);

const CreateURL: FC<{}> = () => {
  const [linkId, setlinkId] = useState<string>('');
  const [fullLink, setFullLink] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!fullLink) {
      toast.error('Please enter a link that you want to short');
      return;
    }
    const linkRegex = new RegExp(
      'https?://(?:w{1,3}.)?[^s.]+(?:.[a-z]+)*(?::d+)?(?![^<]*(?:</w+>|/?>))'
    );

    if (!linkRegex.exec(fullLink)) {
      toast.error('Please enter a valid link');
      return;
    }

    if (!linkId) {
      toast.error('Please enter a link id');
      return;
    }

    const linkService = LinkService.getInstance();

    linkService.createLink(fullLink, linkId, setSuccess);
  };

  const handleGenerate = () => {
    const id = Math.random().toString(36).substr(2, 4);
    setlinkId(id);
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
      <Button
        colorScheme="teal"
        variant="unstyled"
        pos={'absolute'}
        top={'20'}
        left={'20'}
        onClick={() => navigate('/')}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={2}
      >
        <CFaAngleLeft mt={0.5} />
        Home
      </Button>
      <Stack flexDir="column" justifyContent="center" alignItems="center">
        <Heading color="brand.100" size={'4xl'} mt={'20'} mb={'20'}>
          Create URL
        </Heading>
        <Box shadow={'lg'} minW={{ base: '90%', md: '468px' }}>
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              backgroundColor="whiteAlpha.900"
              boxShadow="lg"
              shadow={'lg'}
              p={8}
            >
              <FormControl>
                <Text fontSize="md" p={2} color="gray.700">
                  Full Link
                </Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CFaLink color="gray.700" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    value={fullLink}
                    placeholder="https://www.google.com"
                    onChange={(e) => setFullLink(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <Text fontSize="md" p={2} color="gray.700">
                  Short Link
                </Text>
                <InputGroup>
                  <Input
                    type="text"
                    value={window.location.href.replace('create', '')}
                    disabled
                  />
                  <Input
                    type="text"
                    placeholder="link id"
                    value={linkId}
                    onChange={(e) => setlinkId(e.target.value)}
                  />

                  <InputRightElement width="4.5rem" mr={2}>
                    <Button h="1.75rem" size="sm" onClick={handleGenerate}>
                      Generate
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <Text fontSize="md" p={2} color="gray.700">
                  Link preview
                </Text>

                <HStack justifyContent={'space-between'}>
                  <Text fontSize="lg" p={2} fontWeight="semibold" color="black">
                    {window.location.href.replace('create', '')}
                    {linkId}
                  </Text>

                  <Button
                    variant="solid"
                    leftIcon={<CFaCopy />}
                    colorScheme="blue"
                    size={'sm'}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        window.location.href.replace('create', '') + linkId
                      );
                      toast.success('Copied to clipboard');
                    }}
                  >
                    Copy
                  </Button>
                </HStack>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                backgroundColor={'brand.100'}
                color={'white'}
                width="full"
                _hover={{
                  backgroundColor: 'orange.500'
                }}
              >
                Create
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default CreateURL;
