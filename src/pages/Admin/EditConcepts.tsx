
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
    <section>
      <Modal isOpen={isModalOpen}>
        <section className='topic-delete-modal'>
          <FontAwesomeIcon icon={faClose} onClick={() => {
            setEditModal(false);
            setErr('');
          }} />
          <h4>Edit Concept: {currentConcept?.concept_name} </h4>
          <h4>For {currentConcept.language}</h4>
          <section className='form-group'>
            <label>Concept Text</label>
            <textarea
              value={conceptText}
              onChange={(e) => setConceptText(e.target.value)}
              placeholder={`Edit Description of ${currentConcept?.text}`}
              />   
          </section>
          {
            err ? 
            <p className='error-txt'>{err}</p>:
            <></>
          }
          <section className='btn-group'>
            <button
              onClick={() => {
                setEditModal(false)
                setErr('');
              }} 
              className='std-button std-button-short'
            >
              Cancel
            </button>
            <button onClick={() => editConcept()} className='std-button std-button-short'>
              Submit
            </button>
          </section>
        </section>
      </Modal>
      <div className='slient-modal silent-modal-dark'></div>
    </section>
  )
}
