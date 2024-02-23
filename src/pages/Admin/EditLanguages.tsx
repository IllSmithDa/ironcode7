/* eslint-disable @typescript-eslint/no-unused-vars */
import { Language } from '../../types';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons/faTrashCan';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons/faWrench';
import Modal from '../../components/DarkModal/DarkModal';
import { axiosFetch } from '../../axios';

export default function DeleteLanguages() {
  const [err, setErr] = useState<string>('');
  const [selected, setSelected] = useState<Language>();
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [languages, setLanguages] = useState<Language []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState<string>('');

  const url = `/api/language/all-languages`;
  const updateUrl = 'api/language/update';

  useEffect(() => {
    if (modalOpen === false && editModalOpen === false) {
      setSelected(undefined);
    }
  }, [modalOpen, editModalOpen])

  useEffect(() => {
    // https://blog.logrocket.com/3-ways-implement-infinite-scroll-react/
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosFetch.get(url)
        if (res.status === 200) {
          // console.log(res.data);
          setLanguages([...res.data.data])
        }
      } catch (err) {
        setErr('Error: Could not connect to database. Contact an administrator for additional support.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url]);
  const delLanguage = (language: Language) =>{
    const updatedLanguages = languages.filter((entry) => entry.id !== language.id);
    setLanguages([...updatedLanguages]);
  }

  const deleteTopic = async () => {
    try {
      delLanguage(selected as Language);
      const url = `/api/language/delete-id/${selected?.id}`;
      await axiosFetch.delete(url);
      setModalOpen(false);
    }catch(err) {
      setErr('Error: Could not delete topic')
    }
  }

  const submitEdits = async () => {
    try {
      const updatedConcept = {
        ...selected,
        description
      }
      
      await axiosFetch.put(updateUrl, updatedConcept);
      setEditModalOpen(false);
      setLanguages((languages) =>  {
        return languages.map((language) => {
          if(language?.id === selected?.id) {
            return {
              ...language,
              description
            }
          } 
          return language
        })
      })

    } catch{
      setErr("Error: Could not update Topic")
    }
  }
  const renderLanguages = (languages as Language []).map((entry) => (
    <section className='card-item' key={entry.id}>
      <FontAwesomeIcon icon={faTrashCan} onClick={() =>  {
        setModalOpen(true);
        setSelected(entry)
      }}/>
      <FontAwesomeIcon icon={faWrench} onClick={() =>  {
        setEditModalOpen(true);
        setDescription(entry.description);
        setSelected(entry); 
      }}/>
      <h4>{entry.name}</h4>
      <p>{entry.description}</p>
    </section>
  ))

  return (
    <section className='del-topics-cont'>
      <section className='form-container'>
        {renderLanguages}
      </section>
      <Modal isOpen={modalOpen}>
        <section className='topic-delete-modal'>
          <FontAwesomeIcon icon={faClose} onClick={() => setModalOpen(false)} />
          <h4>Do you want to delete this language: {selected?.name}</h4>
          {
            err ? 
            <p className='error-txt'>{err}</p>:
            <></>
          }
          <section className='btn-group'>
            <button onClick={() => setModalOpen(false)} className='std-button std-button-short'>
              No
            </button>
            <button onClick={() => deleteTopic()} className='std-button std-button-short'>
              Yes
            </button>
          </section>
        </section>
      </Modal>
      <Modal isOpen={editModalOpen}>
        <section className='topic-delete-modal'>
          <FontAwesomeIcon icon={faClose} onClick={() => setEditModalOpen(false)} />
          <h4>Edit: {selected?.name}</h4>
          <section className='form-group'>
            <label>Concept Text</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`Edit Description of ${selected?.name}`}
            />   
          </section>
          {
            err ? 
            <p className='error-txt'>{err}</p>:
            <></>
          }
          <section className='btn-group'>
            <button onClick={() => setEditModalOpen(false)} className='std-button std-button-short'>
              No
            </button>
            <button onClick={() => submitEdits()} className='std-button std-button-short'>
              Yes
            </button>
          </section>
        </section>
      </Modal>
    </section>
  )
}
