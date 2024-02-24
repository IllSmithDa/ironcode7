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
                    block w-[1.5rem]
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
                    block  w-[1.5rem]
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
        z-1000 absolute bg-[#DDD] bg-cover bg-opacity-100 w-[100vw] min-h-[100vh] top-0 left-0
      `}
    >
      <article>
        <div>
          <Link to="/">
            <FontAwesomeIcon
              icon={faHome}
              tabIndex={-1}
            />
          </Link>
          <Link
            className='home-nav-btn'
            onClick={() => toggleTopicsMenu(false)}
            to='/'
          >
            <h3>Home</h3>
          </Link>
        </div>
        <button className='align-right close-btn' onClick={() => {
          toggleTopicsMenu(false);
        }}>
          <FontAwesomeIcon
            icon={faClose}
            tabIndex={-1}
          />
        </button>
      </article>
      {topicList.map((topObj) => {
        return (
          <>
            <h4  
              className={`
                my-[1rem] p-[1rem] text-[1.5rem] border-b-2
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
