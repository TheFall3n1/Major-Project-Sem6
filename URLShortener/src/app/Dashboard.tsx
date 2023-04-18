import { Box, CircularProgress } from '@chakra-ui/react';
import { FunctionComponent as FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Navbar from '../common/components/Navbar';
import LinkService from '../services/link.service';
import TableComponent from './Table';

interface IProps {
  user: any;
}

const Dashboard: FC<IProps> = ({ user }) => {
  const { links, isLoading, ids } = useSelector((state: any) => ({
    links: state.links.links,
    isLoading: state.links.isLoading,
    ids: state.links.ids
  }));
  const dispatch = useDispatch();
  const linksService = LinkService.getInstance();

  useEffect(() => {
    if (isLoading) {
      dispatch(linksService.getLinks() as any);
    }
  }, [isLoading, dispatch]);

  return (
    <>
      <Navbar user={user} />

      {isLoading ? (
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'100vh'}
        >
          <CircularProgress size={10} isIndeterminate color="green.300" />
        </Box>
      ) : (
        <TableComponent data={[links, ids]} />
      )}
    </>
  );
};

export default Dashboard;
