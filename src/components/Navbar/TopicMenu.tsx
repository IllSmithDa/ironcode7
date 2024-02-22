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
                  className={`nav-link active`}
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
                  className={`nav-link`}
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
    <section>
      <article className='home-grouping'>
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
      <h4>Basics</h4>
      {renderData('basic')}
      <h4>Data Structure</h4>
      {renderData('data')}
      <h4>Iterables</h4>
      {renderData('iterables')}
      <h4>Classes</h4>
      {renderData('class')}
      <h4>Regex</h4>
      {renderData('regex')}
    </section>
  )
}
