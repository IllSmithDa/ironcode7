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

  const closeLanguageNav = () => {
    setLanguageDropdown(false);
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
    <section
      className={`
       w-[100%] bg-[#EEE]
      `}
    >
      <section
        className={`
          flex justify-between mx-[auto] relative
          2xl:w-[1600px]
          xl: w-[100%]
        `}
      >
        <ul
          className={`
            flex
          `}
        >
          <li
            className={`
              xl:hidden
              block
            `}
          >
            <button onClick={() =>  setMobileNav(!mobileNav)}
              className={`
                w-[47px] h-[47px] 
              `}
            >
              <FontAwesomeIcon
                icon={faBars}
                tabIndex={-1}
                className={`
                  text-[24px]
                `}
              />
            </button>
          </li>
          <li
            className={`
              hidden
              xl:block
            `}
          >
            <Link to='/'>
              <img src={iron} alt='app-icon' 
                className={`
                  w-[42px]
                `}
              />
            </Link>
          </li>
          <li
            className={`
              hidden
              xl:block
            `}
          >
            <Link to='/'>
              <h2
                className={`
                  text-[30px]
                `}
              >
                IronCodeMan
              </h2>
            </Link>
          </li>
        </ul>
        <ul
          className={`
            flex
          `}
        >
          <li className='app-icons'>
            {
              isDark ?
              <button
                // onClick={() => toggleTheme()}
                className={`
                  w-[47px] h-[47px]
                `}
              >
                <FontAwesomeIcon
                  icon={faMoon}
                  tabIndex={-1}
                  style={{ color: '#00AAFF'}}
                  
                />
              </button>:
              <button
                //onClick={() => toggleTheme()}
                className={`
                  w-[47px] h-[47px]
                `}
              >
                <FontAwesomeIcon
                  icon={faSun}
                  tabIndex={-1}
                  style={{ color: '#EAC117'}}
                  className={`
                  text-[26px]
                `}
                />
              </button>
            }
          </li>
          <li
            className={`
              w-[150px]
            `}
            >
            <button
              onClick={() => setLanguageDropdown(!languageDropdown)}
              className={`
                h-[47px] px-4 w-[150px] text-[1.5rem] bg-[#DDD] hover:bg-[#FAFAFA]
              `}
            >
              {languageId ? selectLanguageQuery.data : `Select`} {languageDropdown ? <>▲</> : <>▼</>}
            </button>
            {
              languageDropdown ?
              <LanguageMenu 
                selectedId={languageId}
                closeModal={closeLanguageNav}
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
        {
          mobileNav ?
          <TopicMenu 
            topics={topicsQuery.data as unknown as ConceptTopic[]}
            selectedId={topicId}
            toggleTopicsMenu={toggleTopicsMenu}
          />:
          <></>
        }
      </section>
      {
        languageDropdown || mobileNav? 
        <div className={`
          fixed z-50 left-0 top-0 w-[100%] h-[100%] justify-center flex-col overflow-auto
        `} onClick={() => {
          setLanguageDropdown(false);
          setMobileNav(false);
        }}></div>:
        <></>
      }
    </section>
  )
}