import { FunctionComponent as FC } from 'react';
import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  HStack,
  IconButton,
  Image,
  useDisclosure,
  useMediaQuery,
  VStack,
  Badge
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import AuthService from '../../services/auth.service';

import siteConfig from '../../../config/site.config';
import { useNavigate } from 'react-router-dom';

interface IProps {
  user: any;
}

const Navbar: FC<IProps> = ({ user }) => {
  const [isLessThan768] = useMediaQuery('(max-width: 768px)');

  const authService = AuthService.getInstance();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      py={2}
      px={8}
      boxShadow={'lg'}
    >
      <HStack>
        <Image src={siteConfig.branding.logo} w={50} h={50} />
        <Heading size={'md'} color={'brand.100'}>
          Url Shortener
        </Heading>
      </HStack>
      {!isLessThan768 ? (
        <Center>
          <HStack>
            <p>
              Welcome, <span style={{ fontWeight: 'bold' }}>user</span>{' '}
            </p>
            <Badge colorScheme="purple">{user?.email}</Badge>
            <Button
              bg={'brand.100'}
              color={'white'}
              _hover={{ opacity: 0.8 }}
              _active={{ bg: 'brand.100', opacity: 0.9 }}
              onClick={() => navigate('/link/create')}
            >
              Create Link
            </Button>
            <Button
              onClick={() => {
                authService.logout();
              }}
              variant={'outline'}
            >
              Logout
            </Button>
          </HStack>
        </Center>
      ) : (
        <>
          <IconButton
            onClick={onOpen}
            aria-label={'Open Menu'}
            icon={<FiMenu />}
            variant={'outline'}
          />
          <Drawer isOpen={isOpen} placement={'right'} onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody>
                <VStack>
                  <Button
                    variant={'unstyled'}
                    _hover={{ opacity: 0.8 }}
                    _active={{ bg: 'brand.100', opacity: 0.9 }}
                  >
                    Create Link
                  </Button>
                  <Button variant={'unstyled'}>Logout</Button>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </Box>
  );
};

export default Navbar;
