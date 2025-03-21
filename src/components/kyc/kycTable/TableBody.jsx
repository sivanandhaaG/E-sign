import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { CiLink } from "react-icons/ci";

const TableBody = ({ tableData }) => {
  return (
    <tbody>
      {tableData?.map((data, index) => {
        return (
          <tr key={data?.id} className={`table-column`}>
            <td>
              <span className="column-text">{index + 1}</span>
            </td>
            <td>
              <span className="column-text">{data?.userid}</span>
            </td>
            <td>
              <span className="column-text">{data?.sessionID}</span>
            </td>
            <td>
              <span className="column-text">{data?.expairation} </span>
            </td>
            <td>
              <span className="column-text">{data?.selfi} </span>
            </td>
            <td>
              <span className="column-text">
                <a href={data?.fileUrl}>
                  <CiLink size={"20px"} />
                </a>
              </span>
            </td>
            <td>
              <Button variant="primary" size="sm">
                Resend
              </Button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

TableBody.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  tablecolumn: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default TableBody;
