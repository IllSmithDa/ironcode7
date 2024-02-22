import React, { useState } from 'react'
import { faBars, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { axiosFetch } from '../../axios';
import { useQuery } from '@tanstack/react-query';
import TopicMenu from './TopicMenu';
import { ConceptTopic, Language } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import iron from '../../assets/images/iron.svg';
import LanguageMenu from './LanguageMenu';


export default function Navbar({
  topicId,
  languageId
}: {
  topicId ?: string,
  languageId ?: string
}) {
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const isDark = false;

  const topicsQuery = useQuery({
    queryKey:["conceptTopic"],
    queryFn: async () => {
      const res = await axiosFetch.get("/api/concept/all-topics");
      return res.data.data;
    },
  }); 

  const languageQuery = useQuery({
    queryKey:["languages"],
    queryFn: async () => {
      const res = await axiosFetch.get("/api/language/all-languages");
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
              languages = {languageQuery.data as unknown as Language[]}
              selectedId={languageId}
            />:
            <></>
          }
        </li>
      </ul>
    </section>
  )
}