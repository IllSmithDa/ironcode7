
import { ConceptTopic } from '../../types';
import { Link } from 'react-router-dom';
import UseConceptTopics from '../../hooks/ConceptTopicsHooks';

export default function TopicsTab({
  selectedId,
}: {
  selectedId ?: string
}) {
  const topics:ConceptTopic[] = UseConceptTopics();

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
                key={`topic_${topic.id}`}
                to={`/topic/${topic.id}`}
                className={`
                 block w-[100%] p-[1rem] bg-[#DFDFDF] text-[1.5rem]
              `}
              >
                {topic.name}
              </Link>:
              <Link
                key={`topic_${topic.id}`}
                to={`/topic/${topic.id}`}
                className={`
                  block w-[100%] p-[1rem] hover:bg-[#DFDFDF] text-[1.5rem]
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
  };

  return (
    <section
      id='topic-tab'
      className={`
        xl:block
        hidden bg-[#F9F9F9] w-[200px]
      `}
    >
      {
        topicList.map((topicOjb) => {
          return (
            <>
              <h4
                className={`
                  p-[1rem]  border-b-[1px] text-[1.6rem] w-[100%] font-[600]
                `}
              >
                {topicOjb.title}  
              </h4>
              {renderData(topicOjb.value)}
            </>
          )
        })
      }
    </section>
  )
}
