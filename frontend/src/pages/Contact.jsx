import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './style.css';

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [disabled, setDisabled] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    display: false,
    message: '',
    type: '',
  });

  const toggleAlert = (message, type) => {
    setAlertInfo({ display: true, message, type });

    setTimeout(() => {
      setAlertInfo({ display: false, message: '', type: '' });
    }, 5000);
  };

  const onSubmit = async (data) => {
    const { name, email, subject, message } = data;
    try {
      setDisabled(true);

      const response = await axios.post('http://localhost:3300/api/contact/send-email', {
        name,
        email,
        subject,
        message,
      });

      if (response.data.success) {
        toggleAlert('Form submission was successful!', 'success');
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      console.error(e);
      toggleAlert('Uh oh. Something went wrong.', 'danger');
    } finally {
      setDisabled(false);
      reset();
    }
  };

  return (
    <div className='container'>
      <div className='Contact'>
        <form id='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className='row formRow'>
            <div className='col-6'>
              <div className='formGroup'>
                <label htmlFor='name' className='form-label'>Name:</label>
                <input
                  type='text'
                  name='name'
                  {...register('name', {
                    required: {
                      value: true,
                      message: 'Please enter your name',
                    },
                    maxLength: {
                      value: 30,
                      message: 'Please use 30 characters or less',
                    },
                  })}
                  className='form-control formInput'
                  placeholder='Name'
                ></input>
              </div>
              {errors.name && (
                <span className='errorMessage'>
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className='col-6'>
              <div className='formGroup'>
                <label htmlFor='email' className='form-label'>Email address:</label>
                <input
                  type='email'
                  name='email'
                  {...register('email', {
                    required: true,
                    pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  })}
                  className='form-control formInput'
                  placeholder='Email address'
                ></input>
              </div>
              {errors.email && (
                <span className='errorMessage'>
                  Please enter a valid email address
                </span>
              )}
            </div>
          </div>
          <div className='row formRow'>
            <div className='col'>
              <div className='formGroup'>
                <label htmlFor='subject' className='form-label'>Subject:</label>
                <input
                  type='text'
                  name='subject'
                  {...register('subject', {
                    required: {
                      value: true,
                      message: 'Please enter a subject',
                    },
                    maxLength: {
                      value: 75,
                      message: 'Subject cannot exceed 75 characters',
                    },
                  })}
                  className='form-control formInput'
                  placeholder='Subject'
                ></input>
              </div>
              {errors.subject && (
                <span className='errorMessage'>
                  {errors.subject.message}
                </span>
              )}
            </div>
          </div>
          <div className='row formRow'>
            <div className='col'>
              <div className='formGroup'>
                <label htmlFor='message' className='form-label'>Message:</label>
                <textarea
                  rows={3}
                  name='message'
                  {...register('message', {
                    required: true,
                  })}
                  className='form-control formInput'
                  placeholder='Message'
                ></textarea>
              </div>
              {errors.message && (
                <span className='errorMessage'>
                  Please enter a message
                </span>
              )}
            </div>
          </div>

          <button
            className='submit-btn btn btn-primary'
            disabled={disabled}
            type='submit'
          >
            Submit
          </button>
        </form>
      </div>
      {alertInfo.display && (
        <div
          className={`alert alert-${alertInfo.type} alert-dismissible mt-5`}
          role='alert'
        >
          {alertInfo.message}
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='alert'
            aria-label='Close'
            onClick={() =>
              setAlertInfo({ display: false, message: '', type: '' })
            }
          ></button>
        </div>
      )}
    </div>
  );
};

export default Contact;
