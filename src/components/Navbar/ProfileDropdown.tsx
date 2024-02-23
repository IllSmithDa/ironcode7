import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState,} from 'react';
import { axiosFetch } from '../../axios';

export default function ProfileDropdown({ username }: { username: string}) {
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const logout = async () => {
    const response = await axiosFetch.get('/api/users/logout-user',  { withCredentials: true });
    if (response.status === 200) {
      return true;
    }
    return false;
  }

  return (
    <>
      <li className='app-icons'>
        {
          username ?
          <button
            onClick={() => setToggleModal(!toggleModal)}
            className='inv-btn'
          >
            <FontAwesomeIcon
              icon={faUser}
              tabIndex={0}
              aria-label='light mode icon'
            />
          </button>:
          <></>
        }
      </li>
      {
        toggleModal ?
        <section className={`profile-nav`}>
          <button onClick={() => logout()}>Logout</button>
        </section>:
        <></>
      }
      {
        toggleModal? 
        <div className='silent-modal' onClick={() => {
          setToggleModal(false);
        }}></div>:
        <></>
      }
    </>
  )
}