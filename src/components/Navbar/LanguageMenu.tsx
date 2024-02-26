import { Language } from '../../types'
import { Link } from 'react-router-dom'
import UseAllLanguages from '../../hooks/LanguageHook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export default function LanguageMenu({
  selectedId,
  languageName,
  } : {
  selectedId ?: string,
  languageName ?: string,
}) {
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(false);

  const languages:Language[] = UseAllLanguages();

  useEffect(() => {
    if (mobileDropdown) {
      const body = document.getElementById('iron-code-body');
      if (body) body.classList.add('modal-open')
    } else {
      const body = document.getElementById('iron-code-body');
      if (body) body.classList.remove('modal-open')
    }
  }, [mobileDropdown])

  const renderData = languages?.map((entry) => (
    <>
    {
      selectedId === entry.id ? 
      <Link 
        key={entry.id}
        to={`/language/${entry.id}`}
        className={`
          relative z-[150] block text-[1.6rem] p-[1.5rem] bg-[#E9E9E9]
          dark:bg-[#393939] dark:border-b-[1px] dark:border-[#555]
          dark:md:border-b-[0]
        `}
        onClick={() => {
          setDesktopDropdown(false);
          setMobileDropdown(false);
        }}
      >
        {entry.name}
      </Link>:
      <Link 
        key={entry.id}
        to={`/language/${entry.id}`}
        className={`
          relative z-[150] block text-[1.6rem] p-[1.5rem] bg-[#D1D1D1] active:bg-[#F9F9F9] border-b-[1px] border-[#AAA] 
          dark:bg-[#181818] dark:hover:bg-[#393939] dark:border-b-[1px] dark:border-[#555]
          dark:md:border-b-[0]
          hover:bg-[#E9E9E9] 
        `}
        onClick={() => {
          setDesktopDropdown(false);
          setMobileDropdown(false);
        }}
      >
        {entry.name}
      </Link>
      }
    </>
  ))

  return (
    <section className='relative'>
      <button
        onClick={() => setDesktopDropdown(!desktopDropdown)}
        className={`
          hidden h-[47px] px-4 w-[150px] text-[1.5rem] bg-[#D6D6D6] hover:bg-[#E1E1E1] focus:bg-[#E1E1E1]
          lg:block
          dark:bg-[#181818] dark:hover:bg-[#333]
        `}
      >
        {languageName ? languageName : `Select`} {desktopDropdown ? <>▲</> : <>▼</>}
      </button>
      <button
        onClick={() => setMobileDropdown(!mobileDropdown)}
        className={`
          h-[47px] px-4 w-[150px] text-[1.5rem] bg-[#D6D6D6] hover:bg-[#E1E1E1] focus:bg-[#E1E1E1]
          lg:hidden
          dark:bg-[#181818] dark:hover:bg-[#333]
        `}
      >
        {languageName ? languageName : `Select`} {mobileDropdown ? <>▲</> : <>▼</>}
      </button>
      {
        desktopDropdown ?
        <section
          className={`
            hidden absolute bg-[#DDD] w-[150px] left-0
            lg:block
            dark:bg-[#1C1C1C]
          `}
        >
          {renderData}
        </section>:
        <></>
      }
      { 
        mobileDropdown ?
        <section
          className={`
            h-[100vh] w-[100vw] absolute bg-[#DDD] top-0 left-0 overflow-y-scroll
            lg:hidden lg:w-[150px] lg:min-h-[auto] lg:top-[auto] lg:left-[auto] lg:right-0
            dark:bg-[#181818] p-[1rem]
          `}
        >
          <button 
            onClick={() => setMobileDropdown(!mobileDropdown)}
            className={`
              w-[47px] h-[47px] ml-[auto] block
              lg:hidden
            `}  
          >
            <FontAwesomeIcon
              icon={faClose}
              tabIndex={-1}
              className={`
                text-[2rem] font-[700]
              `}
            />
          </button>
          <h4
            className={`
              lg:hidden
              block m-0 py-[1rem]
              border-b-[1px]
              text-[1.7rem]
            `}
          >
            Select Language
          </h4>
          {renderData}
        </section>:
        <></>
      }
      {
        desktopDropdown ? 
        <div className={`
          fixed z-50 left-0 top-0 w-[100%] h-[100%] justify-center flex-col overflow-auto
        `} onClick={() => {
          setDesktopDropdown(false);
        }}></div>:
        <></>
      }

    </section>
  )
}
