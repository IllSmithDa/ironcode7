/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { axiosFetch } from '../../axios';
import Footer from '../../components/Footer/Footer';


export default function Login() {
  const [requestErr, setRequestErr] = useState<string>();
  const navigate = useNavigate();

  const renderForm = ({ 
    errors,        
  }: {
    values: any,
    errors: any,
    handleSubmit: any,
  }) => (
    <Form
      id="login-form"
      className={`
        w-[95%] mx-[auto] px-[2rem] py-[10rem] min-h-[400px] bg-[#CCC]
        dark:bg-[#222]
        md:w-[400px] 
      `}
    >
      <h1 className={`
        text-[2rem] text-center mb-[2rem] font-[600]
      `}>Login</h1>
      <label
        className={`
          text-[1.5rem] dark:text-[#FFF]
        `}
      >
        Email:
      </label>
      <Field
        name="email"
        placeholder="Your email silly"
        className={`
          w-[100%] h-[36px] mt-[1rem] mb-[2rem] px-[1rem] py-[2rem] text-[#000] text-[1.5rem]
          dark:text-[#FFF]
        `}
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
      <label
        className={`
          text-[1.5rem] dark:text-[#FFF]
        `}
      >
        Password:
      </label>
      <Field
        name="password"
        placeholder="your password"
        className={`
          w-[100%] h-[36px] my-[1rem] px-[1rem] py-[2rem] text-[#000] text-[1.5rem]
          dark:text-[#FFF]
        `}
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
      <button 
        className={`
          w-[100%] mt-[2rem] gap-[2rem] bg-[#DDD] text-[2rem] h-[45px] rounded-full
          hover:bg-[#EEE]
          dark:hover:bg-[#555] dark:bg-[#444]
        `} 
        type="submit"
      >
        Login
      </button>
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
    <section className={`
      dark:bg-[#1C1C1C]
      bg-[#DDD] h-[100vh] min-h-[900px] color-[#FFF] py-[13rem] relative
    `}>
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
