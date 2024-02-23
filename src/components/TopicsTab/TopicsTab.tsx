
import { ConceptTopic } from '../../types';
import { Link } from 'react-router-dom';
import UseConceptTopics from '../../hooks/ConceptTopicsHooks';

export default function TopicsTab({
  selectedId,
}: {
  selectedId ?: string
}) {
  const topics:ConceptTopic[] = UseConceptTopics();

  const renderData = (category: string) => {
    return (
      <>
      {
        topics?.filter(topic => topic.category === category).map((topic) => (
          <section key={topic.id}>
            {
              topic.id === selectedId ?
              <Link
                key={`topic_${topic.id}`}
                to={`/topic/${topic.id}`}
                className={`active-tab`}
              >
                {topic.name}
              </Link>:
              <Link
                key={`topic_${topic.id}`}
                to={`/topic/${topic.id}`}
              >
                {topic.name}
              </Link>
            }
          </section>
        ))
      }
      </>
    )
  };

  return (
    <section
      id='topic-tab'
      className={`topics-container near-white}`}
    >
      <h4>Basics</h4>
      {
        topics?.length ? 
        <>
          {renderData('basic')}
        </>:
        <></>
      }
      <h4>Data Structure</h4>
      {
        topics?.length ? 
        <>
          {renderData('data')}
        </>:
        <></>
      }
      <h4>Iterables</h4>
      {
        topics?.length ? 
        <>
          {renderData('iterables')}
        </>:
        <></>
      }
      <h4>Classes</h4>
      {
        topics?.length ? 
        <>
          {renderData('class')}
        </>:
        <></>
      }
      <h4>Regex</h4>
      {
        topics?.length ? 
        <>
          {renderData('regex')}
        </>:
        <></>
      }
    </section>
  )
}
