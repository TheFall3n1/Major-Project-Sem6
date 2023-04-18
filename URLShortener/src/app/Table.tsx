import {
  Box,
  TableContainer,
  Text,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Button,
  chakra,
  Badge
} from '@chakra-ui/react';
import { FunctionComponent as FC, useState } from 'react';
import {
  FaEdit,
  FaEye,
  FaTrashAlt,
  FaAngleLeft,
  FaAngleRight
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ILink } from '../services/link.service';

interface IProps {
  data: any[];
}

const CFaEdit = chakra(FaEdit);
const CFaEye = chakra(FaEye);
const CFaTrashAlt = chakra(FaTrashAlt);
const CFaAngleLeft = chakra(FaAngleLeft);
const CFaAngleRight = chakra(FaAngleRight);

const TableComponent: FC<IProps> = ({ data }) => {
  const [links, ids] = data;
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(10);

  const navigate = useNavigate();

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      p={10}
    >
      <Text
        fontSize={'6xl'}
        fontWeight={'bold'}
        color={'brand.100'}
        textAlign={'center'}
      >
        Links
      </Text>

      <TableContainer width={'100%'} p={20}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>original link</Th>
              <Th>short link</Th>
              <Th>clicks</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {links.slice(start, end).map((link: ILink, index: number) => (
              <Tr key={index}>
                <Td>{link.id}</Td>
                <Td>{link.mainLink}</Td>
                <Td>
                  {window.location.origin}/{link.linkId}
                </Td>
                <Td>
                  <Badge colorScheme={link.clicks > 0 ? 'green' : 'red'}>
                    {link.clicks}
                  </Badge>
                </Td>
                <Td>
                  <Button
                    colorScheme="green"
                    leftIcon={<CFaEye />}
                    size="xs"
                    variant={'link'}
                    mr={2}
                    onClick={() => navigate(`/link/${ids[index]}/view`)}
                  >
                    view
                  </Button>

                  <Button
                    colorScheme="blue"
                    variant={'link'}
                    size="xs"
                    mr={2}
                    leftIcon={<CFaEdit />}
                  >
                    Edit
                  </Button>

                  <Button
                    leftIcon={<CFaTrashAlt />}
                    variant={'link'}
                    colorScheme="red"
                    size="xs"
                    mr={2}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th colSpan={2}>
                <Text>
                  Showing {ids.length > 10 ? 10 : ids.length} of {ids.length}{' '}
                  entries
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
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
