import { Link } from 'react-router-dom';
import { ConceptTopic } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose, faHome } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export default function TopicMenu({
  topics,
  selectedId,
}: {
  topics: ConceptTopic[],
  selectedId ?: string,
}) {
  const [navOpen, setNavOpen] = useState(false);
  const topicList = [
    {
      title: 'Basics',
      value: 'basic'
    }, 
    {
      title: 'Data Structure',
      value: 'data'
    }, 
    {
      title: 'Iterables',
      value: 'iterables'
    }, 
    {
      title: 'Classes',
      value: 'class'
    }, 
    {
      title: 'Regex',
      value: 'regex'
    }, 
  ]

  useEffect(() => {
    if (navOpen) {
      const body = document.getElementById('iron-code-body');
      if (body) body.classList.add('modal-open')
    } else {
      const body = document.getElementById('iron-code-body');
      if (body) body.classList.remove('modal-open')
    }
  }, [navOpen])

  const renderData = (category: string) => {
    return (
      <>
        {
          topics?.filter(topic => topic.category === category).map((topic) => (
            <>
              {
                topic.id === selectedId ? 
                <Link
                  id={`${topic.id}_nav`}
                  key={topic.id}
                  onClick={() =>  {
                    setNavOpen(false);
                  
                  }}
                  to={`/topic/${topic.id}`}
                  className={`
                  inline-block w-[100%] relative z-[100] text-[1.5rem] p-[1.5rem] bg-[#F7F7F7] border-b-[1px] border-[#AAA]
                    dark:border-[#555] dark:bg-[#3A3A3A]
                  `}
                >
                  {topic.name}
                </Link>:
                <Link
                  id={`${topic.id}_nav`}
                  key={topic.id}
                  onClick={() =>  {
                    setNavOpen(false);
                  }}
                  to={`/topic/${topic.id}`}
                  className={`
                    inline-block w-[100%] relative z-[100] text-[1.5rem] p-[1.5rem] border-b-[1px] border-[#AAA]
                    hover:bg-[#F7F7F7] 
                    dark:hover:bg-[#3A3A3A] dark:border-[#555]
                  `}
                >
                  {topic.name}
                </Link>
              }
            </>
          ))
        }
      </>
    )
  }

  return (
    <>
      <button onClick={() =>  setNavOpen(!navOpen)}
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
      {navOpen ?
        <section
          className={`
            z-[150] absolute bg-[#DDD] w-[100vw] h-[100vh] top-0 left-0 overflow-y-scroll px-[1rem] pt-[1rem] pb-[4rem]
            dark:bg-[#1C1C1C]
    
          `}
        >
          <article
            className= {`
              flex justify-between my-[1rem]
            `}
          >
            <div
              className={`
                flex
              `}
            >
              <Link
                to='/'
                className={`
                  w-[47px] h-[47px] flex flex-col justify-center align-center mr-[1rem]
                `}
                onClick={() => setNavOpen(false)} 
              >
                <FontAwesomeIcon
                  icon={faHome}
                  tabIndex={-1}
                  className={`
                    text-[26px] block
                  `}  
                />
              </Link>
              <Link
                className='home-nav-btn'
                onClick={() => setNavOpen(false)}
                to='/'
              >
                <h3 className={`text-[2rem]`}>Home</h3>
              </Link>
            </div>
            <button
              onClick={() => {
                setNavOpen(false);
              }}
              className={`
                w-[47px] h-[47px]
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
          </article>
          {topicList.map((topObj) => {
            return (
              <>
                <h4  
                  className={`
                    my-[1rem] p-[1rem] text-[1.7rem] border-b-2
                  `}  
                >
                  {topObj.title}
                </h4>
                {renderData(topObj.value)}
              </>
            )
          })}
        </section>:
        <></>
      }
    </>
  )
}
