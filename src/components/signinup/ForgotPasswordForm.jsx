import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { forgotPassword, loginWithPassword } from '../../app/api/userApi';
import { setUser } from '../../app/reducers/userSlice';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from "react-hot-toast";

function ForgotPasswordForm() {
  const [formData, setFormData] = useState({
    email: '',
    // password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(forgotPassword, {
    onSuccess: (data) => {
      const userData = data.data.reset_token;
      toast.success('Please check your email for the reset link');
      navigate("/forgetresetlink", {
        state: { resetToken: userData },
      });
    },
    onError: (error) => {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    localStorage.setItem("forgetemail",value)
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          <span className='signup-label'> Email </span>
          <span className='signup-label-mandatory'> * </span>{' '}
        </Form.Label>

        <Form.Control
          type='email'
          placeholder='Email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* <Form.Group>
        <Form.Label>
          <span className='signup-label'> Password </span>
          <span className='signup-label-mandatory'> * </span>{' '}
        </Form.Label>
        <Form.Control
          size='sm'
          className='input-text'
          type='password'
          placeholder='Password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group> */}

      <Button
        disabled={isLoading}
        type='submit'
        size='md'
        className='mx-0 my-4 py-2 btn-bg-indigo'
      >
        Submit
      </Button>
    </Form>
  );
}

export default ForgotPasswordForm;
