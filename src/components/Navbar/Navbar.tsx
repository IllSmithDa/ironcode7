import  { useEffect, useState } from 'react'
import { faBars, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { axiosFetch } from '../../axios';
import { useQuery } from '@tanstack/react-query';
import TopicMenu from './TopicMenu';
import { ConceptTopic } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import iron from '../../assets/images/iron.svg';
import LanguageMenu from './LanguageMenu';
import ProfileDropdown from './ProfileDropdown';


export default function Navbar({
  topicId,
  languageId
}: {
  topicId ?: string,
  languageId ?: string
}) {
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [username, setUsername] = useState();
  const [pathname, setPathname] = useState<string>();
  const location = useLocation();
  const isDark = false;
  const link = '/api/users/get-user-session';

  const topicsQuery = useQuery({
    queryKey:["conceptTopic"],
    queryFn: async () => {
      const res = await axiosFetch.get("/api/concept/all-topics");
      return res.data.data;
    },
  }); 

  const selectLanguageQuery = useQuery({
    queryKey:['select-language', languageId],
    queryFn: async () => {
      const link = `/api/language/by-id/${languageId}`;
      const res = await axiosFetch.get(link);
      return res.data.data.name
    }
  })

  const toggleTopicsMenu = (val: boolean) => {
    setMobileNav(val);
  }

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axiosFetch.get(link, { withCredentials: true });
        const { username:user } = response.data;
        console.log(user)
        setPathname(location.pathname);
        setUsername(user);
      } catch(err) {
        setUsername(undefined);
      }
    }
    if (link) checkUser();
  }, [link])


  return (
    <section>
      <ul>
        <li>
          <button onClick={() =>  setMobileNav(!mobileNav)} className={`navbar-icons`}>
            <FontAwesomeIcon
              icon={faBars}
              tabIndex={-1}
            />
          </button>
          {
            mobileNav ?
            <TopicMenu 
              topics={topicsQuery.data as unknown as ConceptTopic[]}
              selectedId={topicId}
              toggleTopicsMenu={toggleTopicsMenu}
            />:
            <></>
          }
        </li>
        <li className='app-icons desktop-items'>
          <Link to='/'>
            <img src={iron} alt='app-icon' />
          </Link>
        </li>
        <li className='app-icons desktop-items'>
          <Link to='/'>
            <h2>IronCodeMan</h2>
          </Link>
        </li>
      </ul>
      <ul>
        <li className='app-icons'>
          {
            isDark ?
            <button
              // onClick={() => toggleTheme()}
              className={`navbar-icons`}
            >
              <FontAwesomeIcon
                icon={faMoon}
                tabIndex={-1}
                style={{ color: '#00AAFF'}}
              />
            </button>:
            <button
              //onClick={() => toggleTheme()}
              className={`navbar-icons`}
            >
              <FontAwesomeIcon
                icon={faSun}
                tabIndex={-1}
                style={{ color: '#EAC117'}}
              />
            </button>
          }
        </li>
        <li className={`navbar-dropdown list-right`}>
          <button type='button' onClick={() => setLanguageDropdown(!languageDropdown)} className='menu-tabs'>
            {languageId ? selectLanguageQuery.data : `Select`} {languageDropdown ? <>▲</> : <>▼</>}
          </button>
          {
            languageDropdown ?
            <LanguageMenu 
              selectedId={languageId}
            />:
            <></>
          }
        </li>
        <li  className='app-icons'>
            {
              username && pathname === "/admin"? 
              <ProfileDropdown username={username} />:
              <></>
            }
            </li>
      </ul>
    </section>
  )
}