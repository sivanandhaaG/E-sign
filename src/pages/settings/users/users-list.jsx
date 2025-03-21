import toast, { Toaster } from "react-hot-toast";
import Tablecomponet from "./userTable/Tablecomponet";
import {
  deleteCompanyUser,
  getAllCompanyUsers,
  getAllCorporateUsers,
  deleteCorporateUser,
} from "../../../app/api/userApi";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import Addusers from "./add-users";
import TarshIcon from "../../../assets/images/users/trash.svg";
import EditIcon from "../../../assets/images/users/edit.svg";
import AntDesign from "../../../components/common/antDesignTable/AntTable";
import { Dropdown } from "antd";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [users, setUsers] = useState([]);
  console.log(users, "userssss");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const companyID = JSON.parse(localStorage.getItem("user"))?.companyId;
  const role = JSON.parse(localStorage.getItem("user")).role;
  const paymentType = JSON.parse(localStorage.getItem("user")).paymentType;
  const [userData, setUserData] = useState(null);
  const [usersLimit, setUsersLimit] = useState(false);

  console.log(userData, "userDatas");
  const corporateDetailsId = JSON.parse(
    localStorage.getItem("user")
  )?.corporateDetailsId;
  console.log(corporateDetailsId, "corporateDetailsId");

  const fetchCompanyUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllCompanyUsers(companyID, "");
      if (response.status === 200) {
        setUsers(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchCorporateUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllCorporateUsers({
        corporateDetailsId: corporateDetailsId,
      });
      if (response.status === 200) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (corporateDetailsId) {
      fetchCorporateUsers();
    }
    if (companyID) fetchCompanyUsers();
  }, []);

  useEffect(() => {
    const usersLimits = {
      INDIVIDUAL_USER: { free: 0, pro: 0 },
      CORPORATE_ADMIN: { free: 1, pro: 10 },
      CORPORATE_USER: { free: 0, pro: 0 },
    };

    if (users.length >= (usersLimits[role]?.[paymentType] || 1)) {
      setUsersLimit(true);
    } else {
      setUsersLimit(false);
    }
  }, [users.length]);

  const edituser = (user) => {
    setUserData(user);
    setShow(true);
  };
  const deleteUserHandler = async (userId) => {
    try {
      const res = await deleteCorporateUser(userId);
      if (res.status === 200) {
        fetchCorporateUsers();

        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
      console.log(error);
    }
  };


  const columns = [
    {
      title: "NAME",
      width: 180,
      dataIndex: "name",
      fixed: "left",
    },
    {
      title: "EMAIL",
      width: 150,
      dataIndex: "email",
    },
    {
      title: "PHONE NUMBER",
      width: 180,
      dataIndex: "phoneNumber",
    },
    {
      title: "ROLE",
      width: 230,
      dataIndex: "role",
    },

    {
      title: "ACTION",
      key: "operation",
      fixed: "right",
      width: 100,
      align: "center",
      render: (_, record) => (
        console.log(record, "recordeee"),
        (
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        edituser(record);
                      }}
                    >
                      <img
                        height={"20px"}
                        width={"20px"}
                        src={EditIcon}
                        alt="TarshIcon"
                      />
                    </a>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <a
                      disabled={record?.role === "ADMIN" ? true : false}
                      onClick={() => deleteUserHandler(record?.userId)}
                    >
                      <img
                        height={"20px"}
                        width={"20px"}
                        src={TarshIcon}
                        alt="TarshIcon"
                      />
                    </a>
                  ),
                },
              ],
            }}
            placement="bottomRight"
            arrow={{
              pointAtCenter: true,
            }}
          >
            <Button>
              <PiDotsThreeOutlineVerticalLight size={20} />
            </Button>
          </Dropdown>
        )
      ),
    },
  ];

  const dataSource = users?.map((item, i) => ({
    key: i,
    name: item.firstName + " " + item.middleName + " " + item.lastName,
    firstName: item.firstName,
    middleName: item.middleName,
    lastName: item.lastName,
    email: item.email,
    phoneNumber: item.phoneNumber,
    role: item.role,
    userId: item.userId,
    corporateRoles: item.corporateRoles,
  }));

  return (
    <div>
      <AntDesign
        dataSource={dataSource}
        columns={columns}
        title={"User List"}
        loading={loading}
        addNewUser={
          <Button
            className="d-flex align-items-center text-nowrap action-aboutus h-100 mx-4"
            onClick={() => {
              setShow(!show);
            }}
            size=""
            disabled={usersLimit}
          >
            <IoMdAdd size={20} /> Add New User
          </Button>
        }
      />

      {/* <Tablecomponet
        tablecolumn={column}
        tableData={currentData}
        user={true}
        tableName={"User"}
        subheading={"User"}
        deleteUserHandler={deleteUserHandler}
        addAction={
          <Button
            className="d-flex align-items-center text-nowrap action-aboutus h-100 mx-4"
            onClick={() => {
              setShow(!show);
            }}
            size="sm"
          >
            <IoMdAdd size={20} /> Add New User
          </Button>
        }
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
        edituser={edituser}
      /> */}
      <Addusers
        userData={userData}
        setUserData={setUserData}
        show={show}
        setShow={setShow}
        fetchCompanyUsers={fetchCompanyUsers}
        fetchCorporateUsers={fetchCorporateUsers}
      />
    </div>
  );
};

export default UsersList;
const column = [
  {
    header: "Name",
    filter: false,
  },
  {
    header: "Email",
    filter: false,
  },
  {
    header: "Phone",
    filter: false,
  },
  {
    header: "Role",
    filter: false,
  },
];
