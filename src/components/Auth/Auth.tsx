/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { axiosFetch } from "../../axios";

export default function Auth() {
  const [username, setUsername] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const link = '/api/users/get-user-session';
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axiosFetch.get(link, { withCredentials: true });
        const { username:user } = response.data;
        setUsername(user);
        setIsLoading(false)
      } catch(err) {
        console.log(err);
        navigate('/login')
      }
    }
    if (link) checkUser();
  }, [link, navigate])


  return (
    <section style={{ width: '100%', backgroundColor: '#111'}}>
    {
      isLoading && !username?
      <Loader />:
      <Outlet />
    }
    </section>
  )
}
