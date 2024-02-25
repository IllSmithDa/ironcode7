import { Link } from 'react-router-dom';
import { ConceptTopic } from '../../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faHome } from '@fortawesome/free-solid-svg-icons';

export default function TopicMenu({
  topics,
  selectedId,
  toggleTopicsMenu
}: {
  topics: ConceptTopic[],
  selectedId ?: string,
  toggleTopicsMenu: (val:boolean) => void
}) {
  
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
                    toggleTopicsMenu(false);
                  
                  }}
                  to={`/topic/${topic.id}`}
                  className={`
                    inline-block w-[100%] relative z-[100] text-[1.5rem] p-[1.5rem] bg-[#3A3A3A]
                    dark:border-b-[1px] dark:border-[#555]
                  `}
                >
                  {topic.name}
                </Link>:
                <Link
                  id={`${topic.id}_nav`}
                  key={topic.id}
                  onClick={() =>  {
                    toggleTopicsMenu(false);
                  }}
                  to={`/topic/${topic.id}`}
                  className={`
                    inline-block w-[100%] relative z-[100] text-[1.5rem] p-[1.5rem]
                    dark:hover:bg-[#3A3A3A] dark:border-b-[1px] dark:border-[#555]
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
    <section
      className={`
        z-1000 absolute bg-[#DDD] w-[100vw] h-[100vh] top-0 left-0 overflow-y-scroll px-[1rem] pt-[1rem] pb-[4rem]
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
            onClick={() => toggleTopicsMenu(false)} 
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
            onClick={() => toggleTopicsMenu(false)}
            to='/'
          >
            <h3 className={`text-[2rem]`}>Home</h3>
          </Link>
        </div>
        <button
          onClick={() => {
            toggleTopicsMenu(false);
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
    </section>
  )
}
