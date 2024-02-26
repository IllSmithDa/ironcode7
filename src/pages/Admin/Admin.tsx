
import {useState} from 'react';
import ConceptForm from './ConceptForm';
import Loader from '../../components/Loader/Loader'
import NewForm from './NewForm';
import EditTopics from './EditTopics';
import ConceptList from './ConceptList';
import DeleteLanguages from './EditLanguages';
import './Admin.css';
import { Helmet } from 'react-helmet';

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
    <section className={`
      width-[100%] min-h-[100vh] bg-[#1E1E1E] pt-[8rem] relative dark:text-[#FFF] text-[#FFF]
    `}>
      <Helmet>
        <title>{`IronCodeMan | Admin`}</title>
      </Helmet>
      <h3 className='text-center my-[4rem] text-[2.5rem]'>Console Center</h3>
      <section className={`
        w-[800px] bg-[#2B2B2B] mx-[auto] flex justify-center
      `}>
        <button
          id='new-tab'
          onClick={() => handleTabChange('new') }
          className={`
            text-[1.8rem] p-[1.2rem]
            hover:bg-[#3A3A3A]
            ${selectTab === 'new' ? 'bg-[#3A3A3A]':'bg-[#2B2B2B]'}
          `}
        >
          New
        </button>
        <button
          id='concept-tab'
          className={`
            text-[1.8rem] p-[1.2rem]
            hover:bg-[#3A3A3A]
            ${selectTab === 'concept' ? 'bg-[#3A3A3A]':'bg-[#2B2B2B]'}
          `}
          onClick={() => handleTabChange('concept') }>Concept
        </button>
        <button
          id='edit-topics-tab'
          className={`
            text-[1.8rem] p-[1.2rem]
            hover:bg-[#3A3A3A]
            ${selectTab === 'edit-topics' ? 'bg-[#3A3A3A]':'bg-[#2B2B2B]'}
          `}
          onClick={() => handleTabChange('edit-topics') }>Edit Topics
        </button>
        <button
          id='edit-concepts-tab'
          onClick={() => handleTabChange('edit-concepts') }
          className={`
            text-[1.8rem] p-[1.2rem]
            hover:bg-[#3A3A3A]
            ${selectTab === 'edit-concepts' ? 'bg-[#3A3A3A]':'bg-[#2B2B2B]'}
          `}
        >
          Edit Concepts
        </button>
        <button
          id='language-tab'
          onClick={() => handleTabChange('language') }
          className={`
            text-[1.8rem] p-[1.2rem]
            hover:bg-[#3A3A3A]
            ${selectTab === 'language' ? 'bg-[#3A3A3A]':'bg-[#2B2B2B]'}
          `}
        >
          Languages
        </button>
      </section>
      {renderTab()}
    </section>
  )
}
