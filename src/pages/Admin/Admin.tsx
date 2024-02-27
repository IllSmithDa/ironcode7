
import {useState} from 'react';
import ConceptForm from './ConceptForm';
import Loader from '../../components/Loader/Loader'
import NewForm from './NewForm';
import EditTopics from './EditTopics';
import ConceptList from './ConceptList';
import DeleteLanguages from './EditLanguages';
import { Helmet } from 'react-helmet-async';

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
      width-[100%] min-h-[100vh] bg-[#111] pt-[8rem] relative dark:text-[#FFF] text-[#FFF]
    `}>
      <Helmet>
        <title>{`IronCodeMan | Admin`}</title>
      </Helmet>
      <h3 className='text-center my-[4rem] text-[2.5rem]'>Console Center</h3>
      <section className={`
        w-[800px] bg-[#222] mx-[auto] flex justify-center
      `}>
        <button
          id='new-tab'
          onClick={() => handleTabChange('new') }
          className={`
            text-[1.8rem] p-[1.2rem]
            hover:bg-[#2B2B2B]
            ${selectTab === 'new' ? 'bg-[#2B2B2B]':'bg-[#222]'}
          `}
        >
          New
        </button>
        <button
          id='concept-tab'
          className={`
            text-[1.8rem] p-[1.2rem]
            hover:bg-[#2B2B2B]
            ${selectTab === 'concept' ? 'bg-[#2B2B2B]':'bg-[#222]'}
          `}
          onClick={() => handleTabChange('concept') }>Concept
        </button>
        <button
          id='edit-topics-tab'
          className={`
            text-[1.8rem] p-[1.2rem]
            hover:bg-[#2B2B2B]
            ${selectTab === 'edit-topics' ? 'bg-[#2B2B2B]':'bg-[#222]'}
          `}
          onClick={() => handleTabChange('edit-topics') }>Edit Topics
        </button>
        <button
          id='edit-concepts-tab'
          onClick={() => handleTabChange('edit-concepts') }
          className={`
            text-[1.8rem] p-[1.2rem]
            hover:bg-[#2B2B2B]
            ${selectTab === 'edit-concepts' ? 'bg-[#2B2B2B]':'bg-[#222]'}
          `}
        >
          Edit Concepts
        </button>
        <button
          id='language-tab'
          onClick={() => handleTabChange('language') }
          className={`
            text-[1.8rem] p-[1.2rem]
            hover:bg-[#2B2B2B]
            ${selectTab === 'language' ? 'bg-[#2B2B2B]':'bg-[#222]'}
          `}
        >
          Languages
        </button>
      </section>
      {renderTab()}
    </section>
  )
}
