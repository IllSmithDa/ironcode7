import { ConceptTopic } from '../../types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/DarkModal/DarkModal';
import UseConceptTopics from '../../hooks/ConceptTopicsHooks';
import { axiosFetch } from '../../axios';

export default function DeleteTopics({
  selectedTopic,
  modalOpen,
  setModalState,
  updateEditList,
}: {
  selectedTopic: ConceptTopic,
  modalOpen: boolean,
  setModalState: (modalstate:boolean) => void,
  updateEditList: (newList: ConceptTopic[]) => void,
}) {
  const topics = UseConceptTopics();

  const [err, setErr] = useState<string>('');

  const deleteTopic = async () => {
    try {
      const updatedTopics = (topics as ConceptTopic []).filter((topic) => topic.id !== selectedTopic?.id);
      updateEditList([...updatedTopics]);
      const url = `/api/concept/delete-topic/${selectedTopic?.id}`;
      await axiosFetch.delete(url);
      setModalState(false);
    }catch(err) {
      setErr('Error: Could not delete topic')
    }
  }
  

  return (
    <Modal isOpen={modalOpen}>
      <section className={`
        p-[2rem] bg-[#333] w-[600px] fixed z-[150] top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]
      `}>
        <FontAwesomeIcon
          icon={faClose}
          onClick={() => setModalState(false)}
          className={` 
            float-right text-[2.5rem] cursor-pointer hover:text-[#DDD] 
          `} 
        />
        <h4 className='my-[3rem]'>Do you want to delete this topic: {selectedTopic?.name}? </h4>
        {
          err ? 
          <p className='error-txt'>{err}</p>:
          <></>
        }
        <section className={`flex gap-[1rem] justify-end`}>
          <button onClick={() => setModalState(false)}
            className={`
              w-[100px] h-[47px] p-[1rem] bg-[#2A2A2A] text-[1.5rem]
              hover:bg-[#2E2E2E]
              dark:text-[#FFF] text-[#FFF]
            `}
          >
            No
          </button>
          <button onClick={() => deleteTopic()}
            className={`
              w-[100px] h-[47px] p-[1rem] bg-[#2A2A2A] text-[1.5rem]
              hover:bg-[#2E2E2E]
              dark:text-[#FFF] text-[#FFF]
            `}
          >
            Yes
          </button>
        </section>
      </section>
    </Modal>
  )
}
