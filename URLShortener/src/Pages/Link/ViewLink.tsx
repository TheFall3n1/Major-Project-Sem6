import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Divider,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  chakra
} from '@chakra-ui/react';
import { FunctionComponent as FC, useEffect } from 'react';
import { FaCopy, FaAngleLeft } from 'react-icons/fa';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from 'chart.js';
import chartInfo from '../../common/lib/chartInfo';

import Navbar from '../../common/components/Navbar';
import LinkService, { IReferralLink } from '../../services/link.service';
import siteConfig from '../../../config/site.config';

interface IProps {
  user: any;
}

const CFaCopy = chakra(FaCopy);
const CFaAngleLeft = chakra(FaAngleLeft);

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ViewLink: FC<IProps> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const { link, isLoading } = useSelector(
    (state: any) => ({
      link: state.links.links[
        state.links.ids.findIndex((linkId: string) => linkId === id)
      ],
      isLoading: state.links.isLoading
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const linksService = LinkService.getInstance();

  useEffect(() => {
    if (isLoading) {
      dispatch(linksService.getLinks() as any);
    }
  }, [isLoading]);

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Clicks Distribution'
      }
    },
    scales: {
      y: [
        {
          ticks: {
            beginAtZero: true,
            precision: 0
          }
        }
      ]
    }
  };

  const labels = link ? chartInfo(link).labels : [];

  const data = {
    labels,
    datasets: [
      {
        label: 'Clicks',
        data: link ? chartInfo(link).data : [],
        borderColor: siteConfig.branding.colors.brand[100],
        backgroundColor: siteConfig.branding.colors.brand[100]
      }
    ]
  };

  return (
    <>
      <Navbar user={user} />

      <Box
        display={'flex'}
        p={10}
        flexDirection={'column'}
        alignItems={'center'}
        position={'relative'}
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
        <Text fontSize={'6xl'} fontWeight={'bold'} color={'brand.100'}>
          View Link
        </Text>

        {link ? (
          <>
            <Box
              px={40}
              py={8}
              width={'100%'}
              display={'flex'}
              alignItems={'center'}
              gap={5}
              justifyContent={'center'}
            >
              <Text fontSize={'md'} fontWeight={'bold'} color={'black'}>
                <Badge colorScheme="green" ml={2}>
                  document id: {id}
                </Badge>
              </Text>

              <Text fontSize={'md'} fontWeight={'bold'} color={'black'}>
                <Badge colorScheme="messenger" ml={2}>
                  link id: {link.id}
                </Badge>
              </Text>
              <Text fontSize={'md'} fontWeight={'bold'} color={'black'}>
                <Badge colorScheme="blue" ml={2}>
                  short link id: {link.linkId}
                </Badge>
              </Text>
            </Box>

            <Box px={40} py={8} width={'100%'}>
              <Text
                fontSize={'md'}
                width={'100%'}
                textAlign={'center'}
                pb={5}
                fontWeight={'bold'}
                color={'black'}
              >
                Link Information
              </Text>

              <Divider />

              <HStack
                display={'flex'}
                flexWrap={'wrap'}
                justifyContent={'center'}
                py={5}
                mt={5}
                flexDirection={'row'}
                gap={2}
              >
                <Text fontSize={'md'} fontWeight={'bold'} color={'black'}>
                  Total Clicks (unique):
                  <Badge colorScheme="green" ml={2}>
                    {link.clicks}
                  </Badge>
                </Text>

                <Text fontSize={'md'} fontWeight={'bold'} color={'black'}>
                  Original Link:
                  <Button
                    onClick={() => {
                      window.open(link.mainLink, '_blank');
                    }}
                    variant={'link'}
                    ml={2}
                    colorScheme={'blue'}
                  >
                    {link.mainLink}
                  </Button>
                </Text>

                <Text fontSize={'md'} fontWeight={'bold'} color={'black'}>
                  Short Link:
                  <Button
                    onClick={() => {
                      window.open(
                        `${window.location.origin}/${link.linkId}`,
                        '_blank'
                      );
                    }}
                    variant={'link'}
                    ml={2}
                    colorScheme={'blue'}
                  >
                    {window.location.origin}/{link.linkId}
                  </Button>
                </Text>

                <Text fontSize={'md'} fontWeight={'bold'} color={'black'}>
                  Users (unique):
                  <Badge colorScheme="orange" ml={2}>
                    {link.users.length}
                  </Badge>
                </Text>

                <Text fontSize={'md'} fontWeight={'bold'} color={'black'}>
                  Total Referrals (team):
                  <Badge colorScheme="green" ml={2}>
                    {link.referralLinks.length}
                  </Badge>
                </Text>
              </HStack>
            </Box>
            <Box px={30} py={8} width={'100%'}>
              <Text
                fontSize={'md'}
                width={'100%'}
                textAlign={'center'}
                pb={5}
                fontWeight={'bold'}
                color={'black'}
              >
                Referral Links
              </Text>

              <Divider />

              <HStack
                display={'flex'}
                flexWrap={'wrap'}
                justifyContent={'center'}
                py={5}
                mt={5}
                flexDirection={'row'}
                gap={2}
              >
                <TableContainer width={'100%'}>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>id</Th>
                        <Th>name</Th>
                        <Th>referral id</Th>
                        <Th>referral link</Th>
                        <Th>clicks</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {link.referralLinks.map(
                        (link: IReferralLink, index: number) => (
                          <Tr key={index}>
                            <Td>{link.id}</Td>
                            <Td>{link.name}</Td>
                            <Td>
                              <Badge colorScheme="blue">
                                {link.referralId}
                              </Badge>
                            </Td>
                            <Td
                              display={'flex'}
                              alignItems={'center'}
                              justifyContent={'space-between'}
                            >
                              {window.location.origin}/{link.referralId}
                              <Button
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    `${window.location.origin}/${link.referralId}`
                                  );
                                  toast.success('copied to clipboard!');
                                }}
                                variant={'solid'}
                                ml={4}
                                colorScheme={'blue'}
                                size={'xs'}
                                leftIcon={<CFaCopy />}
                              >
                                copy
                              </Button>
                            </Td>
                            <Td>
                              <Badge
                                colorScheme={link.clicks > 0 ? 'green' : 'red'}
                              >
                                {link.clicks}
                              </Badge>
                            </Td>
                          </Tr>
                        )
                      )}
                    </Tbody>
                    {/* <Tfoot>
                      <Tr>
                        <Th colSpan={2}>
                          <Text>
                            Showing {ids.length > 10 ? 10 : ids.length} of{' '}
                            {ids.length} entries
                          </Text>
                        </Th>
                        <Th
                          colSpan={3}
                          display={'flex'}
                          justifyContent={'flex-end'}
                          alignItems={'center'}
                          gap={2}
                        >
                          <Button
                            onClick={() => {
                              if (start > 0) {
                                setStart(start - 10);
                                setEnd(end - 10);
                              }
                            }}
                            colorScheme="blue"
                            disabled={start === 0}
                            _disabled={{ cursor: 'not-allowed', opacity: 0.5 }}
                            size="xs"
                            mr={2}
                            leftIcon={<CFaAngleLeft />}
                          >
                            Previous
                          </Button>

                          <Button
                            onClick={() => {
                              if (end < ids.length) {
                                setStart(start + 10);
                                setEnd(end + 10);
                              }
                            }}
                            colorScheme="blue"
                            disabled={end === ids.length}
                            size="xs"
                            mr={2}
                            rightIcon={<CFaAngleRight />}
                          >
                            Next
                          </Button>
                        </Th>
                      </Tr>
                    </Tfoot> */}
                  </Table>
                </TableContainer>
              </HStack>
            </Box>
          </>
        ) : isLoading ? (
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'50vh'}
          >
            <CircularProgress size={10} isIndeterminate color="brand.100" />
          </Box>
        ) : (
          !isLoading &&
          !link && (
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              height={'70vh'}
            >
              <Text fontSize={'6xl'} fontWeight={'bold'} color={'brand.100'}>
                No link found
              </Text>
            </Box>
          )
        )}
        <Box w={'100%'} minH={300}>
          <Line data={data} options={options} />
        </Box>
      </Box>
    </>
  );
};

export default ViewLink;
