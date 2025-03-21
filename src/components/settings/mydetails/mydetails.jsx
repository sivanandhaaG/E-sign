import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import HrDivider from '../../../assets/images/general/hrdivider.png';
import UploadIcon from '../../../assets/images/general/fileupload.png';
import SampleAvatar from '../../../assets/images/general/Avatar.png';
import DeleteIcon from '../../../assets/images/general/delete.png';
import Form from 'react-bootstrap/Form';
import { Editor } from '@tinymce/tinymce-react';
import './mydetails.css';
import toast, { Toaster } from "react-hot-toast";

const TINYKEY = import.meta.env.VITE_APP_TINT_MCE;
const MAX_COUNT = 10;

const SettingsMyDetails = ({ initialValue }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedName, setSelectedName] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);

  const [value, setValue] = useState(initialValue ?? []);
  const editorRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedName(file.name);
    setSelectedSize(file.size);
    console.log(event.target.files[0]);
    // Additional validation logic
  };

  //   const handleUploadFiles = files => {
  //     const uploaded = [...uploadedFiles];
  //     console.log(uploadedFiles)
  //     let limitExceeded =false;
  //         files.some((file) => {
  //             if (uploaded.findIndex((f) => f.name === file.name) === -1) {
  //                 uploaded.push(file);
  //                 if (uploaded.length === MAX_COUNT) setFileLimit(true);
  //                 if (uploaded.length > MAX_COUNT) {
  //                     alert(`Allowed Maximum only ${MAX_COUNT} files`)
  //                     setFileLimit(false);
  //                     limitExceeded = true;
  //                     return true;
  //                 }
  //             }
  //         })
  //         if (!limitExceeded) setUploadedFiles(uploaded)
  //  }

  const handleUploadFiles = (files) => {
    if (uploadedFiles.length + files.length <= MAX_COUNT) {
      setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
    } else {
      toast.error(`Allowed Maximum only ${MAX_COUNT} files`);
      setFileLimit(true);
    }
  };

  console.log(uploadedFiles);

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  const deleteFile = (file) => {
    const updatedFiles = uploadedFiles.filter(
      (uploadedFile) => uploadedFile !== file
    );

    // Update the state with the new array of files
    setUploadedFiles(updatedFiles);
    console.log(updatedFiles);
  };

  return (
    <Container fluid>
      <Row>
        <Col md={9} sm={12} className='px-0'>
          <p className='page-subtitle mt-2'> Personal Profile </p>
          <p className='page-subtitle-content'>
            {' '}
            Update your photo and personal details here.{' '}
          </p>
        </Col>
        <Col md={3} sm={12} className='text-end'>
          <Button size='md' className='mx-2 my-1 btn-bg-white'>
            {' '}
            Cancel{' '}
          </Button>
          <Button size='md' className='mx-2 my-1 btn-bg-indigo'>
            {' '}
            Save{' '}
          </Button>
        </Col>
        <Col md={12} className='px-0 pt-0 my-0'>
          <img src={HrDivider} alt='' />
        </Col>
      </Row>

      <Row className='py-2'>
        <Col md={3} sm={12} className='px-0 py-0'>
          <p className='input-titles'> Name </p>
        </Col>
        <Col md={3} sm={6} className='px-1 py-2'>
          <Form.Control
            size='sm'
            className='input-text'
            type='text'
            placeholder='First Name'
          />
        </Col>
        <Col md={3} sm={6} className='px-1 py-2'>
          <Form.Control
            size='sm'
            className='input-text'
            type='text'
            placeholder='Last Name'
          />
        </Col>
        <Col md={12} className='px-0 pt-0 my-0'>
          <img src={HrDivider} alt='' />
        </Col>
      </Row>

      <Row className='py-1'>
        <Col md={3} sm={12} className='px-0 py-0'>
          <p className='input-titles'> Email Address </p>
        </Col>
        <Col md={6} sm={12} className='px-1 py-2'>
          <Form.Control
            size='sm'
            className='input-text'
            type='email'
            placeholder='E-Mail Address'
          />
        </Col>
        <Col md={12} className='px-0 pt-0 my-0'>
          <img src={HrDivider} alt='' />
        </Col>
      </Row>

      <Row className='py-1'>
        <Col md={3} sm={12} className='px-0 py-0'>
          <p className='input-titles mb-0'> Your Photo </p>
          <p className='page-subtitle-content mt-0'>
            {' '}
            This will be displayed on your profile.{' '}
          </p>
        </Col>
        <Col md={1} xs={3}>
          <img className='w-100 mt-1' src={SampleAvatar} alt='upload' />
        </Col>
        <Col md={5} xs={9} className='px-1 py-2'>
          <div className='custom-parent input-text'>
            <div className='custom-file-upload'>
              <img src={UploadIcon} alt='upload' />
              <p className='page-subtitle-content mb-0 text-center file-text-color'>
                {selectedName || 'Click to Upload or drag and drop'}
              </p>
              <p className='page-subtitle-content mt-0 text-center'>
                SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
              <Form.Control
                type='file'
                accept='image/png, image/gif, image/jpeg, image/svg, image/jpg'
                onChange={handleFileChange}
              />
            </div>
          </div>
        </Col>
        <Col md={12} className='px-0 pt-0 my-0'>
          <img src={HrDivider} alt='' />
        </Col>
      </Row>

      <Row className='py-1'>
        <Col md={3} sm={12} className='px-0 py-0'>
          <p className='input-titles'> Role </p>
        </Col>
        <Col md={6} sm={12} className='px-1 py-2'>
          <Form.Control
            size='sm'
            className='input-text'
            type='text'
            placeholder='Role'
          />
        </Col>
        <Col md={12} className='px-0 pt-0 my-0'>
          <img src={HrDivider} alt='' />
        </Col>
      </Row>

      <Row className='py-1'>
        <Col md={3} sm={12} className='px-0 py-0'>
          <p className='input-titles'> Country </p>
        </Col>
        <Col md={6} sm={12} className='px-1 py-2'>
          <Form.Select size='sm' className='input-text'>
            <option> India </option>
            <option> Germany </option>
            <option> USA </option>
            <option> Japan </option>
            <option> Canada </option>
          </Form.Select>
        </Col>
        <Col md={12} className='px-0 pt-0 my-0'>
          <img src={HrDivider} alt='' />
        </Col>
      </Row>

      <Row className='py-1'>
        <Col md={3} sm={12} className='px-0 py-0'>
          <p className='input-titles'> Time Zone </p>
        </Col>
        <Col md={6} sm={12} className='px-1 py-2'>
          <Form.Select size='sm' className='input-text'>
            <option> Indian Standard Time (IST) UTC+05:30 </option>
            <option> Germany </option>
            <option> USA </option>
            <option> Japan </option>
            <option> Canada </option>
          </Form.Select>
        </Col>
        <Col md={12} className='px-0 pt-0 my-0'>
          <img src={HrDivider} alt='' />
        </Col>
      </Row>

      <Row className='py-1'>
        <Col md={3} sm={12} className='px-0 py-0'>
          <p className='input-titles mb-0'> Bio </p>
          <p className='page-subtitle-content mt-0'>
            {' '}
            Write a short introduction.{' '}
          </p>
        </Col>
        <Col md={6} sm={12} className='px-1 py-2'>
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            apiKey={TINYKEY}
            value={value}
            onEditorChange={(newValue, editor) => {
              setValue(newValue);
              console.log(newValue);
            }}
            init={{
              height: 250,
              selector: 'textarea#open-source-plugins',
              plugins:
                'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
              menubar: false,
              toolbar:
                'undo redo | fullscreen link bold alignleft alignright aligncenter | align blocks fontfamily fontsize | numlist bullist | image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl',
              toolbar_sticky: true,
              image_advtab: true,
              quickbars_selection_toolbar:
                'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
              toolbar_mode: 'sliding',
              contextmenu: 'link image table',
              content_style:
                'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
            }}
          />
        </Col>
        <Col md={12} className='px-0 pt-0 my-0'>
          <img src={HrDivider} alt='' />
        </Col>
      </Row>

      <Row className='py-1'>
        <Col md={3} sm={12} className='px-0 py-0'>
          <p className='input-titles mb-0'> Portfolio Projects </p>
          <p className='page-subtitle-content mt-0'>
            {' '}
            Share a few snippets of your work.{' '}
          </p>
        </Col>
        <Col md={6} sm={12} className='px-1 py-2'>
          <div className='custom-parent input-text'>
            <div className='custom-file-upload'>
              <img src={UploadIcon} alt='upload' />
              <p className='page-subtitle-content mb-0 text-center file-text-color'>
                Click to Upload or drag and drop
              </p>
              <p
                className='page-subtitle-content mt-0 text-center'
                disabled={fileLimit}
              >
                PDF, SVG, PNG, JPG or GIF (max. 800x400px or 5MB)
              </p>
              <Form.Control
                id='fileUpload'
                type='file'
                multiple
                accept='application/pdf, image/png, image/gif, image/jpeg, image/svg, image/jpg'
                onChange={handleFileEvent}
              />
            </div>
          </div>

          <div className='custom-uploaded-files-list mt-3'>
            {uploadedFiles.map((file, index) => (
              <Card className='my-2'>
                <Card.Body className='py-2'>
                  <Row className='d-flex justify-content-center align-items-center mb-0'>
                    <Col xs={10} className=''>
                      <span> File Name : {file.name} </span> <br />
                      <span className='page-subtitle-content'>
                        {' '}
                        File Size : {(file.size / 8388608).toFixed(2)} MB{' '}
                      </span>
                    </Col>
                    <Col xs={2} className='text-end'>
                      <img
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          deleteFile(file);
                        }}
                        src={DeleteIcon}
                        alt=''
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>
        <Col md={12} className='px-0 pt-0 my-0'>
          <img src={HrDivider} alt='' />
        </Col>
      </Row>

      <Row className='py-1 px-0'>
        <Col md={12} className='text-end px-0'>
          <Button size='md' className='mx-2 my-1 btn-bg-white'>
            {' '}
            Cancel{' '}
          </Button>
          <Button size='md' className='mx-0 my-1 btn-bg-indigo'>
            {' '}
            Save{' '}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsMyDetails;
