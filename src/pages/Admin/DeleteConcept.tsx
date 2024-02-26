import { ConceptItem } from '../../types';
import  { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/DarkModal/DarkModal';
import { axiosFetch } from '../../axios';

export default function DeleteConcept({
  selectedConcept,
  setModalState,
  delConceptItem,
  isModalOpen
}: {
  selectedConcept: ConceptItem,
  setModalState: (modalstate:boolean) => void,
  delConceptItem: (concept: ConceptItem) => void,
  isModalOpen: boolean
}) {
  const [err, setErr] = useState<string>('');

  const deleteTopic = async () => {
    try {
      delConceptItem(selectedConcept);
      const url = `/api/concept/delete-id/${selectedConcept?.id}`;
      await axiosFetch.delete(url);
      setModalState(false);
    }catch(err) {
      setErr('Error: Could not delete topic')
    }
  }
  

  return (
    <Modal isOpen={isModalOpen}>
      <section
        className={`
          p-[2rem] bg-[#393939] w-[600px] fixed z-[150] top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]
        `}
      >
        <FontAwesomeIcon
          icon={faClose}
          onClick={() => setModalState(false)}
          className={`
            float-right text-[2.5rem] hover:text-[#DDD] cursor-pointer 
          `}
        />
        <h4
          className={`my-[5rem]`}
        >
          Do you want to delete this concept from {selectedConcept.language}: {selectedConcept?.concept_name}?
        </h4>
        {
          err ? 
          <p className='error-txt'>{err}</p>:
          <></>
        }
        <section className={`flex gap-[1rem] justify-end`}>
          <button
            onClick={() => setModalState(false)}
            className={`
              w-[100px] h-[47px] p-[1rem] bg-[#2A2A2A] text-[1.5rem]
              hover:bg-[#2E2E2E]
              dark:text-[#FFF] text-[#FFF]
            `}
          >
            No
          </button>
          <button
            onClick={() => deleteTopic()}
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


