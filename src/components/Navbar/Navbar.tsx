import  { useEffect, useState } from 'react'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
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
  darkMode,
  topicId,
  languageId,
}: {
  darkMode: boolean,
  topicId ?: string,
  languageId ?: string
}) {
  const [username, setUsername] = useState();
  const [isDark, setIsDark] = useState<boolean>();
  const [pathname, setPathname] = useState<string>();
  const location = useLocation();

  const link = '/api/users/get-user-session';

  const topicsQuery = useQuery({
    queryKey:["conceptTopic"],
    queryFn: async () => {
      const res = await axiosFetch.get("/api/concept/all-topics");
      return res.data.data;
    },
  }); 
  const topics:ConceptTopic[] = topicsQuery.data;

  const selectLanguageQuery = useQuery({
    queryKey:['select-language', languageId],
    queryFn: async () => {
      const link = `/api/language/by-id/${languageId}`;
      const res = await axiosFetch.get(link);
      return res.data.data.name
    },
    enabled: !!languageId,
  })

  const languageName = selectLanguageQuery.data;

  useEffect(() => {
    setIsDark(darkMode);
  }, [darkMode])
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axiosFetch.get(link, { withCredentials: true });
        const { username:user } = response.data;
        setPathname(location.pathname);
        setUsername(user);
      } catch(err) {
        setUsername(undefined);
      }
    }
    if (link) checkUser();
  }, [link, location.pathname])

  const toggleDarkMode = (val :boolean) => {
    localStorage.setItem('iron_man_code_dark', JSON.stringify(val))
    if (val) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    setIsDark(val);
  }


  return (
    <section
      className={`
       w-[100%] bg-[#F1F1F1] h-[47px] fixed z-[100] top-0
       dark:bg-[#222]
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
            <TopicMenu 
              topics={topics}
              selectedId={topicId}
            />
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
                  w-[47px]
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
                onClick={() => toggleDarkMode(false)}
                className={`
                  w-[47px] h-[47px]
                `}
              >
                <FontAwesomeIcon
                  icon={faMoon}
                  tabIndex={-1}
                  style={{ color: '#00AAFF'}}
                  className={`
                  text-[26px]
                `}
                />
              </button>:
              <button
                onClick={() => toggleDarkMode(true)}
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
          <li>              
            <LanguageMenu 
              selectedId={languageId}
              languageName={languageName}
            />
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
    </section>
  )
}