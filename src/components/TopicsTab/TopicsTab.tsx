import { useQuery } from '@tanstack/react-query';
import { ConceptTopic } from '../../types';
import { Link } from 'react-router-dom';
import { axiosFetch } from '../../axios';

export default function TopicsTab({
  selectedId,
}: {
  selectedId ?: string
}) {
  const topicsQuery = useQuery({
    queryKey:["conceptTopic"],
    queryFn: async () => {
      const res = await axiosFetch.get("/api/concept/all-topics");
      return res.data.data;
    },
  });

  const renderData = (category: string) => {
    return (
      <>
      {
        (topicsQuery.data as ConceptTopic[]).filter(topic => topic.category === category).map((topic) => (
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
        topicsQuery?.data?.length ? 
        <>
          {renderData('basic')}
        </>:
        <></>
      }
      <h4>Data Structure</h4>
      {
        topicsQuery?.data?.length ? 
        <>
          {renderData('data')}
        </>:
        <></>
      }
      <h4>Iterables</h4>
      {
        topicsQuery?.data?.length ? 
        <>
          {renderData('iterables')}
        </>:
        <></>
      }
      <h4>Classes</h4>
      {
        topicsQuery?.data?.length ? 
        <>
          {renderData('class')}
        </>:
        <></>
      }
      <h4>Regex</h4>
      {
        topicsQuery?.data?.length ? 
        <>
          {renderData('regex')}
        </>:
        <></>
      }
    </section>
  )
}
