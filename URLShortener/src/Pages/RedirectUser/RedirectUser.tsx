import { Box, Text } from '@chakra-ui/react';
import { FunctionComponent as FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LinkService from '../../services/link.service';

interface IProps {}

const RedirectUser: FC<IProps> = ({}) => {
  const { id } = useParams<{ id: string }>();
  const linkService = LinkService.getInstance();

  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await linkService.getLinkById(id as string);
      if (data) {
        setSuccess(true);
        setIsLoading(false);
        setData(data);
      } else {
        setSuccess(false);
        setIsLoading(false);
      }
    };
    if (id) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (data) {
      const url = data.data?.mainLink;
      const a = document.createElement('a');
      a.href = url;
      a.click();
    }
  }, [data]);

  if (!isLoading && !success) {
    return (
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        height={'100vh'}
      >
        <Text fontSize={'2xl'} fontWeight={'bold'} color={'brand.100'}>
          Invalid Link
        </Text>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        height={'100vh'}
      >
        <Text fontSize={'2xl'} fontWeight={'bold'} color={'brand.100'}>
          Finding Link...
        </Text>
      </Box>
    );
  }

  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100vh'}
    >
      <Text fontSize={'2xl'} fontWeight={'bold'} color={'brand.100'}>
        Redirecting...
      </Text>
    </Box>
  );
};

export default RedirectUser;
