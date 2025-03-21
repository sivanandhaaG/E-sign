import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Button, Card } from "react-bootstrap";

const KycTable = () => {
  return (
    <Card>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <span>User ID</span>
              </Th>
              <Th>
                <div>Session ID</div>
              </Th>
              <Th>
                <div>Expiration</div>
              </Th>
              <Th>
                <div>Selfi</div>
              </Th>
              <Th>
                <div>Priority</div>
              </Th>
              <Th>
                <div>Link</div>
              </Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {[1, 2, 3, 4, 5].map((user) => (
              <Tr key={user}>
                <Td>UserID</Td>
                <Td>Session ID</Td>
                <Td>Expiration</Td>
                <Td>Selfi</Td>
                <Td>Priority</Td>
                <Td>Link</Td>
                <Td />
                <Td />
                <Td />
                <Td />
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Td />
              <Td />
              <Td />
              <Td />
              <Td />

              <Td>
                <div className="d-flex justify-content-end align-items-center px-3 mb-3">
                  <Button className="btn-bg-white mx-1">Previous</Button>
                  <Button className="btn-bg-white mx-1">Next</Button>
                </div>
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default KycTable;
