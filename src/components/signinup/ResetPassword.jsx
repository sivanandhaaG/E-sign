import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { forgetPassword, forgetverifytoken } from '../../app/api/userApi';
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

function ResetPassword() {
  const queryParams = new URLSearchParams(window.location.search);
  const resetToken = queryParams.get('reset_token');

  const [formData, setFormData] = useState({
    password: '',
    confirm_password: '',
  });

  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(forgetPassword, {
    onSuccess: () => {
      toast.success('Password Reset Done successfully');
      navigate('/signin', { replace: true });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Error changing password');
    },
  });

  const { mutate: verifyToken, isLoading: verifying } = useMutation(forgetverifytoken, {
    onSuccess: (data) => {
      if (data?.data?.reset_token) {
        setFormData((prevData) => ({
          ...prevData,
          reset_token: data.data.reset_token,
        }));
        toast.success('Token verified successfully');
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Invalid reset token');
    },
  });

  useEffect(() => {
    if (resetToken) {
      verifyToken({ reset_token: resetToken });
    }
  }, [resetToken, verifyToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'confirm_password') {
      if (value !== formData.password) {
        setPasswordError('Passwords do not match');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      toast.error('Passwords do not match');
      return;
    }
    mutate(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group style={{ position: 'relative' }}>
        <Form.Label>
          <span className='signup-label'>New Password </span>
          <span className='signup-label-mandatory'> * </span>
        </Form.Label>
        <Form.Control
          // size='sm'
          className='input-text'
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          required
          style={{ WebkitTextSecurity: showPassword ? 'none' : 'disc' }}        />
        <span
          style={{
            position: 'absolute',
            top: '40px',
            right: '10px',
            cursor: 'pointer',
          }}
          onClick={() => setShowPassword(!showPassword)}
        >
          {!showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </Form.Group>

      <Form.Group style={{ position: 'relative', marginTop: '12px' }}>
        <Form.Label>
          <span className='signup-label'>Confirm Password </span>
          <span className='signup-label-mandatory'> * </span>
        </Form.Label>
        <Form.Control
          // size='sm'
          className='input-text'
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder='Confirm Password'
          name='confirm_password'
          value={formData.confirm_password}
          onChange={handleChange}
          required
          style={{ WebkitTextSecurity: showConfirmPassword ? 'none' : 'disc' }}     />
        <span
          style={{
            position: 'absolute',
            top: '40px',
            right: '10px',
            cursor: 'pointer',
          }}
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {!showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
        {passwordError && (
          <small style={{ color: 'red', display: 'block' }}>{passwordError}</small>
        )}
      </Form.Group>

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

export default ResetPassword;
