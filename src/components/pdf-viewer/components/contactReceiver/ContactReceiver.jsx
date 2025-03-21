import React, { useEffect, useState, useCallback } from "react";
import { Table, Pagination, Card, Form } from "react-bootstrap";
import { GetContactReceiverList, TaggleStatus } from "../../../../app/api/userApi";

function ContactReceiver() {
  // Holds the data fetched from the API
  const [tableList, setTableList] = useState([]);

  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // For switch toggles (on/off) for each row
  const [toggles, setToggles] = useState([]);

  // Fetch the company users data
  const fetchCompanyUsers = useCallback(async () => {
    try {
      const response = await GetContactReceiverList();
      if (response.status) {
        console.log(response.data.data, "responsetale");
        setTableList(response.data.data); // Save the fetched data
      }
    } catch (error) {
      console.error("Error fetching contact list:", error);
    }
  }, []);

  // On component mount, call the API
  useEffect(() => {
    fetchCompanyUsers();
  }, [fetchCompanyUsers]);

  /**
   * Whenever tableList changes, create a toggles array.
   * Each toggle is true if item.status === "completed", else false.
   */
  useEffect(() => {
    if (tableList.length > 0) {
      const initialToggles = tableList.map((item) => item.status === "completed");
      setToggles(initialToggles);
    }
  }, [tableList]);

  // Pagination calculations
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = tableList.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(tableList.length / itemsPerPage);

  // Pagination handlers
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Build pagination items
  const paginationItems = [];
  for (let page = 1; page <= totalPages; page++) {
    paginationItems.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  /**
   * Handle toggles for each row’s switch
   * rowIndex => index in `toggles`
   * itemId   => the _id from the fetched data
   */
  const handleToggle = (rowIndex, itemId) => {
    setToggles((prev) => {
      const updated = [...prev];
      const oldValue = updated[rowIndex];
      const newValue = !oldValue; // flip the switch state
      updated[rowIndex] = newValue;

      // If toggled ON => call the API
      if (newValue) {
        console.log("Switch turned ON for _id:", itemId);
        TaggleStatus(itemId)
          .then((res) => {
            console.log("Toggle status success:", res);
            // Optionally refetch or update tableList if needed
          })
          .catch((error) => {
            console.error("Toggle status error:", error);
            // Optionally revert the switch if API call fails
            updated[rowIndex] = false;
          });
      }

      return updated;
    });
  };

  return (
    <Card
      style={{
        margin: "30px",
        borderRadius: "12px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Card.Body style={{ padding: "20px" }}>
        <h4 className="mb-4">Contacts List</h4>

        <Table striped bordered hover responsive>
          <thead style={{ backgroundColor: "#f0f0f0" }}>
            <tr>
              <th>Full Name</th>
              <th>Email ID</th>
              <th>Preferred Contact Number</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, idx) => {
                // The global index in tableList
                const globalIndex = firstItemIndex + idx;

                return (
                  <tr key={item._id || globalIndex} style={{ fontSize: "13px", height: "40px" }}>
                    <td>{item.fullName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.status}</td>
                    <td>
                      <Form.Check
                        type="switch"
                        disabled={toggles[globalIndex] === true}
                        id={`custom-switch-${globalIndex}`}
                        checked={toggles[globalIndex] || false}
                        onChange={() => handleToggle(globalIndex, item._id)}
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Pagination controls */}
        {tableList.length > itemsPerPage && (
          <div className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev onClick={handlePrev} disabled={currentPage === 1} />
              {paginationItems}
              <Pagination.Next onClick={handleNext} disabled={currentPage === totalPages} />
            </Pagination>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default ContactReceiver;
