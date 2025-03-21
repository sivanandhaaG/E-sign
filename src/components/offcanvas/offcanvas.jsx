import {useState, useEffect} from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Row, Col, Button,Form} from 'react-bootstrap';

const OffcanvasComponent = ({ show, onHide, children }) => {

  const [selectedFilters, setSelectedFilters] = useState([]); // To store selected filter options
  const [finaldata, setFinalData] = useState([])
  const [showAll, setShowAll] = useState(false)

  const handleFilterChange = (label) => {
    // Check if the label is already in the selectedFilters array
    const isSelected = selectedFilters.includes(label);

    // If it's selected, remove it; otherwise, add it to the array
    if (isSelected) {
      setSelectedFilters(selectedFilters.filter((item) => item !== label));
    } else {
      setSelectedFilters([...selectedFilters, label]);
    }
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleApply = () => {
    // Create a copy of OffCanvasData to avoid modifying the original data
  const updatedData = [...OffCanvasData];

  // Loop through the filters and sub-filters
  updatedData.forEach((item) => {
    if (selectedFilters.includes(item.label)) {
      // Set the output property to true if the filter is selected
      item.output = true;
    } else {
      item.output = false;
    }

    // Check if there are sub-switches
    if (item.subswitch) {
      item.subswitch.forEach((subItem) => {
          // Set default sub switch as false if mail item of array is false.
        if(item.output === false && selectedFilters.includes(subItem.label)){
          subItem.output = false;
        }
        else if (selectedFilters.includes(subItem.label)) {
          // Set the output property of sub-switch to true if it is selected
          subItem.output = true;
        } else {
          subItem.output = false;
        }
      });
    }
    onHide()
  });

  

  console.log('Updated Data:', updatedData);
  setFinalData(updatedData)
  };
  
  console.log('Final Data:', finaldata)
  console.log(selectedFilters)

  const isMainItemSelected = (label) => {
    // Check if the main item is selected based on its label
    return selectedFilters.includes(label);
  };

  const displayedData = showAll ? OffCanvasData : OffCanvasData.slice(0, 6);
  
  
  return (
    <Offcanvas show={show} onHide={onHide} placement={'end'}>
      <Offcanvas.Header closeButton className='pb-0'>
        <Offcanvas.Title > <p className='page-title'> Advance Options </p> </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className='pt-0'>
        <p className='personal-setting-page-subtitle'> Apply filters to table data. </p>
        <Row>
          <Col xs={12} >
          {children}
            <p className='personal-setting-page-subtitle'> Role </p>

            <Form.Select
              size="sm"
              className='input-text mb-3'
            >
              <option value="">Select Saved Filter</option>
              <option value="Filter 1">Filter 1</option>
              <option value="Filter 2">Filter 2</option>
              <option value="Filter 3">Filter 3</option>
            </Form.Select>

            {displayedData.map((item) => (
                <div key={item.id}>
                  <Form.Check
                    className="personal-setting-page-title"
                    type="switch"
                    label={item.label}
                    checked={selectedFilters.includes(item.label)}
                    onChange={() => handleFilterChange(item.label)}
                  />
                  <hr className="mt-1 mb-1" />
                  {item.subswitch &&
                    item.subswitch.map((subItem) => (
                      <div key={subItem.id} className="px-4">
                        <Form.Check
                          type="switch"
                          className="personal-setting-page-title"
                          label={subItem.label}
                          checked={selectedFilters.includes(subItem.label)}
                          onChange={() => handleFilterChange(subItem.label)}
                          // disabled={!isMainItemSelected(item.label) || !item.output}
                          disabled={!isMainItemSelected(item.label)}
                        />
                        <hr className="mt-1 mb-1" />
                      </div>
                    ))}
                </div>
            ))}

            {!showAll && OffCanvasData.length > 6 && (
                  <p
                    className="more-filters"
                    onClick={toggleShowAll}
                  >
                    Show {OffCanvasData.length - displayedData.length} more 
                  </p>
            )}
            
          </Col>
        </Row>
        <Row className='mt-5'>
            <Col className='text-start'>
                <Button className='btn-outlne-indigo' variant="secondary" onClick={onHide}>
                    Save Filter
                </Button>
            </Col>
            <Col className='text-end'>
                <Button className='btn-outlne-indigo' variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button className='mx-2 btn-bg-indigo' variant="secondary" onClick={handleApply}>
                    Apply
                </Button>
            </Col>

        </Row>
       
        
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasComponent;


const OffCanvasData =[
  {id:1, label: 'Retry Attempts'},
  {id:2, label: 'Dont Allow user to edit name'},
  {id:3, label: 'Dont add user name in signature apperance'},
  {id:4, label: 'Require organization name in signature'},
  {id:5, label: 'Supporting Documents'},
  {id:6, label: 'Advance Authentications', subswitch:[
    {id:1, label:'Enforce Authentication'},
    {id:2, label:'Video Approval'},
    {id:3, label:'Send Raw Document URL With OTP'},
    {id:4, label:'Capture Photo'},
  ]},
  {id:7, label: 'Send email notification'},
  {id:8, label: 'Send phone notification'},
  {id:9, label: 'Custom URLs'},
  {id:10, label: 'Custom consent'},

]


