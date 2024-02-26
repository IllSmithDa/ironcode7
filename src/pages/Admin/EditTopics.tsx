import { axiosFetch } from '../../axios';
import { ConceptTopic } from '../../types'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { faWrench } from '@fortawesome/free-solid-svg-icons/faWrench';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/DarkModal/DarkModal';
import DeleteTopics from './DeleteTopics';
import UseConceptTopics from '../../hooks/ConceptTopicsHooks';

export default function EditTopics() {
  const [currentTopic, setCurrentTopic] = useState<ConceptTopic>();
  const [editList, setEditList] = useState<ConceptTopic []>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [delModalOpen, setDelModalOpen] = useState(false);
  const [currentRank, setCurrentRank] = useState<number>();
  const [currentCategory, setCurrentCategory] = useState('');
  const [editName, setEditName] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');
  const [err, setErr] = useState<string>();
  const topics = UseConceptTopics();


  useEffect(() => {
    if (topics?.length) {
      setEditList(topics as ConceptTopic []);
    }
  }, [topics])

  useEffect(() => {
    if (editModalOpen || delModalOpen) {
      const body = document.getElementById('iron-code-body');
      if (body) body.classList.add('modal-open')
    } else {
      const body = document.getElementById('iron-code-body');
      if (body) body.classList.remove('modal-open')
    }
  }, [editModalOpen, delModalOpen])
  
  const updateModalState = (state: boolean) => {
    setDelModalOpen(state);
  }
  const updateEditList = (list: ConceptTopic[]) => {
    setEditList([...list])
  }

  const editTopic = async () => {
    try {
      if (editName === '' || editName === null || editName === undefined) {
        setErr('Error: Name cannot be blank!');
        return;
      }
      if(!currentRank) {
        setErr('Error: Rank cannot be blank!');
      }
      if(currentCategory === '' || currentCategory === null || currentCategory === undefined) {
        setErr('Error: Category cannot be blank');
      }
      const updatedTopics = (topics as ConceptTopic []).map((topic) => {
        if (topic.id === currentTopic?.id) {
          return {
            ...topic,
            name: editName,
            description: editDescription,
            rank: currentRank as number,
            category: currentCategory,
          };
        } else {
          return topic
        }
      });
      setEditList([...updatedTopics]);
      const data = {
        name: editName,
        description: editDescription,
        topicId: currentTopic?.id,
        rank: currentRank as number,
        category: currentCategory,
      }
      const url = `/api/concept/update-topic`;
      await axiosFetch.put(url, data);
      setErr('');
      setEditModalOpen(false);
    }catch(err) {
      setErr('Error: cannot connect to server. Contact adminstrator for additional support.')
    }
  }
  
  const renderTopics = (editList as ConceptTopic []).map((topic) => (
    <section className={`
      bg-[#222] p-[2rem] my-[2rem]
    `} key={topic.id}>
      <FontAwesomeIcon icon={faTrashCan} onClick={() =>  {
        setDelModalOpen(true);
        setCurrentTopic(topic)
      }}
      className={`
        float-right text-[2.5rem] hover:text-[#DDD] cursor-pointer 
      `}
      />
      <FontAwesomeIcon
        icon={faWrench}
        onClick={() =>  {
          setEditModalOpen(true);
          setCurrentTopic(topic)
          setEditName(topic.name);
          setCurrentRank(topic.rank);
          setCurrentCategory(topic.category)
          setEditDescription(topic.description);
        }}
        className={`
          float-right text-[2.5rem] hover:text-[#DDD] mr-[2rem] cursor-pointer
        `}
      />
      <h4>{topic.name}</h4>
      <p className='my-[2rem]'>{topic.description}</p>
      <>
        <p>Category: {topic.category}</p>
        <p>Rank: {topic.rank}</p>
      </>
    </section>
  ))

  return (
    <section className={`
      p-[2rem] w-[800px] bg-[#2B2B2B] m-[auto] dark:text-[#FFF] text-[#FFF] relative
    `}>
      <ul>
        {renderTopics}
      </ul>
      <Modal isOpen={editModalOpen}>
        <section
          className={` 
            p-[2rem] bg-[#333] w-[600px] fixed z-[150] top-[50%] left-[50%]  translate-y-[-50%] translate-x-[-50%]
          `}
        >
          <FontAwesomeIcon icon={faClose} onClick={() => {
            setEditModalOpen(false);
            setErr(''); 
            }}
            className={` 
              float-right text-[2.5rem] cursor-pointer hover:text-[#DDD] 
            `} 
          />
          <h4>Edit topic: {currentTopic?.name} </h4>
          <section className={`
            relative my-[1rem]
          `}>
            <label className='text-[1.5rem] my-[1rem]'>Edit Name</label>
            <input
              value={editName}
              type='text'
              onChange={(e) => setEditName(e.target.value)}
              placeholder={`Edit Name of ${currentTopic?.name}`}
              className={`
                w-[100%] text-[#FFF] text-[1.5rem] bg-[#222] p-[1rem]
              `}
            />
          </section>
          <section className={`
            relative my-[1rem]
          `}>
            <label className='text-[1.5rem] my-[1rem]'>Edit Category</label>
            <input
              value={currentCategory}
              type='text'
              onChange={(e) => setCurrentCategory(e.target.value)}
              placeholder={`Edit Category of ${currentTopic?.name}`}
              className={`
                w-[100%] text-[#FFF] text-[1.5rem] bg-[#222] p-[1rem]
              `}
            />
          </section>
          <section>
          <label className='text-[1.5rem] my-[1rem]'>Edit Rank</label>
            <input
              value={currentRank}
              type='number'
              onChange={(e) => setCurrentRank(e.target.value as unknown as number)}
              placeholder={`Edit Rank of ${currentTopic?.name}`}
              className={`
                w-[100%] text-[#FFF] text-[1.5rem] bg-[#222] p-[1rem]
              `}
            />
          </section>
          <section className={`
            relative my-[1rem]
          `}>
            <label className='text-[1.5rem] my-[1rem]'>Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder={`Edit Description of ${currentTopic?.name}`}
              className={`
                w-[100%] text-[#FFF] text-[1.5rem] bg-[#222] p-[1rem] min-h-[300px]
              `}
            />   
          </section>
          {
            err ? 
            <p className='error-txt'>{err}</p>:
            <></>
          }
          <section
            className={`flex gap-[1rem] justify-end`}
          >
            <button
              onClick={() => {
                setEditModalOpen(false)
                setErr('');
              }} 
              className={`
                w-[100px] h-[47px] p-[1rem] bg-[#2A2A2A] text-[1.5rem] 
                hover:bg-[#2E2E2E]
                dark:text-[#FFF] text-[#FFF]
              `}
            >
              Cancel
            </button>
            <button onClick={() => editTopic()}
              className={`
                w-[100px] h-[47px] p-[1rem] bg-[#2A2A2A] text-[1.5rem] 
                hover:bg-[#2E2E2E]
                dark:text-[#FFF] text-[#FFF]
              `}
            >
              Submit
            </button>
          </section>
        </section>
      </Modal>
      <DeleteTopics
        selectedTopic={currentTopic as ConceptTopic}
        modalOpen={delModalOpen}
        setModalState={updateModalState}
        updateEditList={updateEditList}
      />
      {
        delModalOpen || editModalOpen ? 
        <div
          onClick={() => {
            setDelModalOpen(false);
            setEditModalOpen(false);
          }}
          className={`
            fixed z-[100] left-0 top-0 w-[100%] h-[100%] justify-center flex-col overflow-auto bg-[#000] opacity-70
          `}
        >
        </div>:
        <></>
      }
    </section>
  )
}
