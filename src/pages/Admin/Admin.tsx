
import {useState} from 'react';
import ConceptForm from './ConceptForm';
import Loader from '../../components/Loader/Loader'
import NewForm from './NewForm';
import EditTopics from './EditTopics';
import ConceptList from './ConceptList';
import DeleteLanguages from './EditLanguages';
import './Admin.css';

export default function Admin() {
  const [selectTab, setSelectTab] = useState<'new'|'edit-concepts'|'edit-topics'|'concept'|'language'|'loading'>('new')


  const handleTabChange = (tabVal: 'new'|'edit-concepts'|'edit-topics'|'concept'|'language'|'loading') => {
    setSelectTab(tabVal);
  }
  const renderTab = () => {
    if (selectTab === 'concept') {
      return (
        <ConceptForm />
      )
    } else if (selectTab === 'edit-topics') {
      return (
        <EditTopics />
      );
    }  else if (selectTab === 'edit-concepts') {
      return (
        <ConceptList />
      );
    } else if (selectTab === 'new') {
      return (
        <NewForm />
      );
    } else if (selectTab === 'language') {
      return (
        <DeleteLanguages />
      );
    } else {
      return (
        <section className='loader-container'>
          <Loader />
        </section>
      );
    }
  }
  return (
    <section className={`admin-page`}>
      <h3>Console Center</h3>
      <section className={`menu-container`}>
        <button
          id='new-tab'
          onClick={() => handleTabChange('new') }
          className='active-tab menu-tabs'
        >
          New
        </button>
        <button
          id='concept-tab'
          className={`menu-tabs`}
          onClick={() => handleTabChange('concept') }>Concept
        </button>
        <button
          id='edit-topics-tab'
          className={`menu-tabs`}
          onClick={() => handleTabChange('edit-topics') }>Edit Topics
        </button>
        <button
          id='edit-concepts-tab'
          onClick={() => handleTabChange('edit-concepts') }
          className={`menu-tabs`}
        >
          Edit Concepts
        </button>
        <button
          id='language-tab'
          onClick={() => handleTabChange('language') }
          className={`menu-tabs`}
        >
          Languages
        </button>
      </section>
      {renderTab()}
    </section>
  )
}
