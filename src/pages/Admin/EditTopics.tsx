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
    if (topics.length) {
      setEditList(topics as ConceptTopic []);
    }
  }, [topics])

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
    <section className='card-item' key={topic.id}>
      <FontAwesomeIcon icon={faTrashCan} onClick={() =>  {
        setDelModalOpen(true);
        setCurrentTopic(topic)
      }}/>
      <FontAwesomeIcon icon={faWrench} onClick={() =>  {
        setEditModalOpen(true);
        setCurrentTopic(topic)
        setEditName(topic.name);
        setCurrentRank(topic.rank);
        setCurrentCategory(topic.category)
        setEditDescription(topic.description);
      }}/>
      <h4>{topic.name}</h4>
      <p>{topic.description}</p>
      <>
        <p>Category: {topic.category}</p>
        <p>Rank: {topic.rank}</p>
      </>
    </section>
  ))

  return (
    <section className='edit-topics-cont form-container'>
      <ul>
        {renderTopics}
      </ul>
      <Modal isOpen={editModalOpen}>
        <section className='topic-delete-modal'>
          <FontAwesomeIcon icon={faClose} onClick={() => {
            setEditModalOpen(false);
            setErr('');
          }} />
          <h4>Edit topic: {currentTopic?.name} </h4>
          <section className='form-group'>
            <label>Edit Name</label>
            <input
              value={editName}
              type='text'
              onChange={(e) => setEditName(e.target.value)}
              placeholder={`Edit Name of ${currentTopic?.name}`}
            />
          </section>
          <section className='form-group'>
            <label>Edit Category</label>
            <input
              value={currentCategory}
              type='text'
              onChange={(e) => setCurrentCategory(e.target.value)}
              placeholder={`Edit Category of ${currentTopic?.name}`}
            />
          </section>
          <section>
          <label>Edit Rank</label>
            <input
              value={currentRank}
              type='number'
              onChange={(e) => setCurrentRank(e.target.value as unknown as number)}
              placeholder={`Edit Rank of ${currentTopic?.name}`}
            />
          </section>
          <section className='form-group'>
            <label>Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder={`Edit Description of ${currentTopic?.name}`}
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
                setEditModalOpen(false)
                setErr('');
              }} 
              className='std-button std-button-short'
            >
              Cancel
            </button>
            <button onClick={() => editTopic()} className='std-button std-button-short'>
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
    </section>
  )
}
