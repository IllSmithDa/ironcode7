
import { ConceptItem } from '../../types';
import { useState } from 'react'
import Modal from '../../components/DarkModal/DarkModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { axiosFetch } from '../../axios';

export default function EditConcept({
  setEditModal,
  updateConcepts,
  isModalOpen,
  currentConcept,
}: {
  setEditModal: (val: boolean) => void,
  updateConcepts: (updatedConcept: ConceptItem) => void,
  isModalOpen: boolean,
  currentConcept: ConceptItem
}) {

  const [conceptText, setConceptText] = useState<string>(currentConcept.text);
  const [err, setErr] = useState<string>();

  
  const editConcept = async () => {
    try {
      if (conceptText === '' || conceptText === null || conceptText === undefined) {
        setErr('Error: Concept text cannot be blank!');
        return;
      }
      const updatedConcept = {
        ...currentConcept,
        text: conceptText,
      }
      updateConcepts(updatedConcept);
      const url = `/api/concept/update-item`;
      await axiosFetch.put(url, updatedConcept);
      setErr('');
      setEditModal(false);
    }catch(err) {
      setErr('Error: cannot connect to server. Contact adminstrator for additional support.')
    }
  }
  return (
    <section
      className={`
        p-[2rem] w-[800px] bg-[#393939] m-[auto] dark:text-[#FFF] text-[#FFF] relative
      `}
    >
      <Modal isOpen={isModalOpen}>
        <section
          className={`
            p-[2rem] bg-[#444] w-[600px] fixed z-[150] top-[50%] left-[50%]  translate-y-[-50%] translate-x-[-50%]
          `}
        >
          <FontAwesomeIcon icon={faClose} onClick={() => {
            setEditModal(false);
            setErr('');
            }}
            className={` 
              float-right text-[2.5rem] cursor-pointer hover:text-[#DDD] 
            `}
          />
          <h4>Edit Concept: {currentConcept?.concept_name} </h4>
          <h4>For {currentConcept.language}</h4>
          <section>
            <label className='text-[1.7rem] my-[1rem]'>Concept Text</label>
            <textarea
              value={conceptText}
              onChange={(e) => setConceptText(e.target.value)}
              placeholder={`Edit Description of ${currentConcept?.text}`}
              className={`
                w-[100%] h-[300px] my-[1rem] p-[1rem] text-[#FFF] text-[1.5rem] bg-[#222]
              `}
            />   
          </section>
          {
            err ? 
            <p className='error-txt'>{err}</p>:
            <></>
          }
          <section className={`flex gap-[1rem] justify-end`}>
            <button
              onClick={() => {
                setEditModal(false)
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
            <button 
              onClick={() => editConcept()}
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
    </section>
  )
}
