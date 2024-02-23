/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { axiosFetch } from '../../axios';
import Footer from '../Footer/Footer';


export default function Login() {
  const [requestErr, setRequestErr] = useState<string>();
  const navigate = useNavigate();

  const renderForm = ({ 
    values,
    errors,        
    handleSubmit,
  }: {
    values: any,
    errors: any,
    handleSubmit: any,
  }) => (
    <Form
      id="login-form"
      className={`form-login`}
    >
      <h1>Login</h1>
      <label>Email:</label>
      <Field
        name="email"
        placeholder="Your email silly"
        className="form-field"
        type="email"
      />
      {
        errors.email ? 
         <p
         className='small-text small-text-error'
       >
         {errors.email}
       </p>:
       <></>
      }
      <label>Password:</label>
      <Field
        name="password"
        placeholder="your password"
        className="form-field"
        type="password"
      />
      {
         errors.password ? 
         <p
         className='small-text small-text-error'
       >
         {errors.password}
       </p>:
       <></>
      }
      {
        requestErr ?
        <p
          className='small-text small-text-error'
        >
          {requestErr}
        </p>:
        <></>
      }
      <button className='std-button std-button-long std-button-brand' type="submit">Login</button>
{
  /*
      <p>Or</p>
      
      <button className='inv-button' type='button' onClick={registerMenu}>Register Here</button>
      <Link
        href='/reset-password'
        className='link-btn-inv'
      >
        Forgot Password?
      </Link>
  */
}
    </Form>
  )

  return (
    <section className={`login-page`}>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={Yup.object().shape({
          password: Yup.string()
            .required('Password is required'),
          email: Yup.string()
            .required('Email is required')
            .matches(
              /^[A-Za-z0-9+_.-]+@(.+)$/,
              'Please use a valid email'
            )
        })}

        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async(values) => {
          // alert('Form Submission activated')
          try {
            const dataToSubmit = {
              email: values.email,
              password: values.password,
            };
            const result = await axiosFetch.post(`/api/users/login-user`,   dataToSubmit, {
              withCredentials: true,  
            });
            if (result.status === 200) {
              navigate('/admin');
            } else {
              setRequestErr(result.data.err);
            }
          } catch (err) {
            setRequestErr('Error: Email and/or password does not match existing records');
          }
        }}
      >
        {renderForm}
      </Formik>
      <Footer />
    </section>
  )
}
