
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
                 block w-[100%] p-[1rem] bg-[#FAFAFA] text-[1.5rem] 
                 dark:bg-[#444]
              `}
              >
                {topic.name}
              </Link>:
              <Link
                key={`topic_${topic.id}`}
                to={`/topic/${topic.id}`}
                className={`
                  block w-[100%] p-[1rem] hover:bg-[#FAFAFA] text-[1.5rem]
                  dark:hover:bg-[#444]
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
        hidden bg-[#EAEAEA] w-[200px] pb-[10rem] dark:bg-[#222] px-[2px]
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
