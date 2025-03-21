import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import TarshIcon from "../../../../assets/images/users/trash.svg";
import EditIcon from "../../../../assets/images/users/edit.svg";

const TableBody = ({ tableData, edituser, deleteUserHandler,user }) => {
  return (
    <tbody>
      {tableData?.map((data, index) => {
        return (
          <tr className="table-column " key={data?.id}>
            <td className="table-column" >
              <div className="d-flex gap-2 align-items-center">
                <span className="column-text" style={{width:"100%",textAlign:"center"}}>{index + 1}</span>
              </div>
            </td>
            <td className="table-column">
              <div className="d-flex gap-2 align-items-center">
                <span className="column-text">
                  {data?.firstName + " " + data?.lastName}{" "}
                </span>
              </div>
            </td>
            <td className="table-column">
              <div className="column-text">{data?.email}</div>
            </td>
            <td className="table-column">
              <div className="column-text">{data?.phoneNumber}</div>
            </td>
            <td className="table-column">
              <div className="column-text">{data?.role}</div>
            </td>
            <td className="p-0">
              <div className="column-text">
                <Button
                  variant="text"
                  size="lg"
                  onClick={() => {
                    edituser(data);
                  }}
                >
                  <img
                    height={"20px"}
                    width={"20px"}
                    src={EditIcon}
                    alt="TarshIcon"
                  />
                </Button>
               
                <Button
                  variant="text"
                  size="lg"
                  disabled={data?.role === "ADMIN" ? true : false}
                  onClick={() => deleteUserHandler(data?.userId)}
                >
                  <img
                    height={"20px"}
                    width={"20px"}
                    src={TarshIcon}
                    alt="TarshIcon"
                  />
                </Button>
      
              </div>
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
  edituser: PropTypes.func,
  deleteUserHandler: PropTypes.func,
};
export default TableBody;
