import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import HrDivider from '../../../assets/images/general/hrdivider.png';
import UploadIcon from '../../../assets/images/general/fileupload.png';
import SampleAvatar from '../../../assets/images/general/Avatar.png';
import SettingsBanner from '../../../assets/images/general/settingsbanner.png';
import ShareIcon from '../../../assets/images/general/userplus.png';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Editor } from '@tinymce/tinymce-react';
import toast, { Toaster } from "react-hot-toast";

const TINYKEY = import.meta.env.VITE_APP_TINT_MCE;
const MAX_COUNT = 10;

const PersonalSettingsMyDetails = ({ initialValue }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedName, setSelectedName] = useState('');

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);

  const [value, setValue] = useState(initialValue ?? []);
  const editorRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedName(file.name);
    console.log(event.target.files[0]);
    // Additional validation logic
  };

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    console.log(uploadedFiles);
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          toast.error(`Allowed Maximum only ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setUploadedFiles(uploaded);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  return (
    <Container fluid className='mt-5 personal-settings-bg'>
      <img className='w-100 mx-0' src={SettingsBanner} alt='' />
      <Container className=''>
        <Row style={{ marginTop: '-35px' }}>
          <Col md={2} xs={4} className='px-0'>
            <img
              className='img img-thumbnail rounded-circle w-100'
              src={SampleAvatar}
              alt='upload'
            />
          </Col>
          <Col md={8} xs={12} className='mt-md-5 mt-0 px-0'>
            <p className='personal-profile-name mb-0 mx-3'> Arslan Sid </p>
            <p className='personal-email-name mt-0 mx-3'> arslan@gmail.com </p>
          </Col>
          <Col md={2} xs={12} className='mt-md-5 mt-0 px-0'>
            <Button className='btn-outlne-indigo mx-1 my-1'>
              {' '}
              <img style={{ width: 14 }} src={ShareIcon} alt='' /> Share{' '}
            </Button>
            <Button className='btn-bg-indigo mx-0 my-1'> Profile </Button>
          </Col>
        </Row>
        <Row className='mt-md-5 mt-3'>
          <Col md={4} sm={12} className='px-0'>
            <p className='personal-setting-page-title mb-0'>
              {' '}
              Personal Profile{' '}
            </p>
            <p className='personal-setting-page-subtitle'>
              {' '}
              Update your photo and personal details here.{' '}
            </p>
          </Col>
          <Col md={8} sm={12} className='px-4 py-4 bg-white rounded-2'>
            <Row>
              <Col md={6} sm={12} className='px-1 mb-3'>
                <p className='input-titles mb-0'> First Name </p>
                <Form.Control
                  size='sm'
                  className='input-text'
                  type='text'
                  placeholder='First Name'
                />
              </Col>
              <Col md={6} sm={12} className='px-1 mb-3'>
                <p className='input-titles mb-0'> Last Name </p>
                <Form.Control
                  size='sm'
                  className='input-text'
                  type='text'
                  placeholder='Last Name'
                />
              </Col>
              <Col md={12} sm={12} className='px-1 mb-3'>
                <p className='input-titles mb-0'> Email </p>
                <Form.Control
                  size='sm'
                  className='input-text'
                  type='email'
                  placeholder='Email'
                />
              </Col>
              <Col md={2} xs={3} className='px-1'>
                <img className='w-100 mt-1' src={SampleAvatar} alt='upload' />
              </Col>
              <Col md={10} xs={9} className='px-1 py-2'>
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
              <Col className='px-1'>
                <img className='w-100' src={HrDivider} alt='' />
              </Col>
              <Col md={12} className='text-end px-0'>
                <Button size='md' className='mx-2 my-1 btn-bg-white'>
                  {' '}
                  Cancel{' '}
                </Button>
                <Button size='md' className='mx-0 my-1 btn-bg-indigo'>
                  {' '}
                  Save Settings{' '}
                </Button>
              </Col>
            </Row>
          </Col>
          <Col md={12} className='px-0 pt-0 my-0'>
            <img src={HrDivider} alt='' />
          </Col>
        </Row>

        <Row className='mt-2'>
          <Col md={4} sm={12} className='px-0'>
            <p className='personal-setting-page-title mb-0'> Profile </p>
            <p className='personal-setting-page-subtitle'>
              {' '}
              Update your portfolio and bio.{' '}
            </p>
          </Col>
          <Col md={8} sm={12} className='px-4 py-4 bg-white rounded-2'>
            <Row>
              <Col md={12} sm={12} className='px-1 mb-2'>
                <Form>
                  <Form.Check // prettier-ignore
                    type='switch'
                    id='custom-switch'
                    label='Available for Projects'
                    size='sm'
                    className='input-titles mb-0'
                  />
                  <label className='personal-setting-page-subtitle mb-0'>
                    {' '}
                    I am open and aailable for freelance work.
                  </label>
                </Form>
              </Col>
              <Col md={12} sm={12} className='px-1 my-3'>
                <p className='input-titles mb-0'> User Name </p>
                <InputGroup size='sm'>
                  <InputGroup.Text className='bg-white' id='basic-addon1'>
                    {' '}
                    zilladesign.com/{' '}
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    className='input-text'
                    placeholder='User Name'
                  />
                </InputGroup>
              </Col>
              <Col md={12} sm={12} className='px-1 mb-3'>
                <p className='input-titles mb-0'> Website </p>
                <InputGroup size='sm'>
                  <InputGroup.Text className='bg-white' id='basic-addon1'>
                    {' '}
                    https://{' '}
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    className='input-text'
                    placeholder='Website'
                  />
                </InputGroup>
              </Col>
              <Col md={12} sm={12} className='px-1 py-2'>
                <p className='input-titles mb-0'> Bio </p>
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
              <Col md={12} sm={12} className='px-1 mb-3'>
                <p className='input-titles mb-0'> Country </p>
                <Form.Select size='sm' className='input-text'>
                  <option> India </option>
                  <option> Germany </option>
                  <option> USA </option>
                  <option> Japan </option>
                  <option> Canada </option>
                </Form.Select>
              </Col>
              <Col md={12} sm={12} className='px-1 mb-3'>
                <p className='input-titles mb-0'> Time Zone </p>
                <Form.Select size='sm' className='input-text'>
                  <option> Indian Standard Time (IST) UTC+05:30 </option>
                  <option> Germany </option>
                  <option> USA </option>
                  <option> Japan </option>
                  <option> Canada </option>
                </Form.Select>
              </Col>
              <Col md={12} className='px-0 pt-0 my-0'>
                <img className='w-100' src={HrDivider} alt='' />
              </Col>
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
          </Col>
          <Col md={12} className='px-0 pt-0 my-0'>
            <img className='w-100' src={HrDivider} alt='' />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default PersonalSettingsMyDetails;
