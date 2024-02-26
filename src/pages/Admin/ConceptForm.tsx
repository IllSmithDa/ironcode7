import { axiosFetch } from '../../axios';
import { ConceptTopic, Language } from '../../types';
import React, { useRef, useState } from 'react'
import UseAllLanguages from '../../hooks/LanguageHook';
import UseConceptTopics from '../../hooks/ConceptTopicsHooks';

export default function ConceptForm() {
  const [languageDropdown, setLanguageDropdown] = useState(false)
  const [languageOption, setLanguageOption] = useState<string>('Select');
  const [conceptDropdown, setConceptDropdown] = useState(false)
  const [conceptOption, setConceptOption] = useState<string>('Select');
  const [topicId, setTopicId] = useState<string>();
  const [successMsg, setSuccessMsg] = useState<string>();
  const [err, setErr] = useState<string>();
  const languages = UseAllLanguages();
  const concepts  = UseConceptTopics();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const link = '/api/concept/create-item'

  const handleNewConcept = async(event:  React.SyntheticEvent) => {
    event.preventDefault();
    if (languageOption === 'Select' || conceptOption === 'Select') {
      setErr('Error: Language and/or Concept must be selected');
      return;
    }
    const textVal = textRef.current?.value;
    if (!textVal || textVal === '') {
      setErr('Error: Text field cannot be blank');
      return;
    }
    const data = {
      text:textVal,
      conceptId: topicId,
      conceptName: conceptOption,
      language: languageOption,
    }
    try {
      const result = await axiosFetch.post(link, data);
      if (result.status === 200) {
        setErr('');
        setSuccessMsg(`Successfully added new ${conceptOption.toLowerCase()} concept`)
        if (textRef.current) {
          textRef.current.value = '';
        }
      }
    } catch (err) {
      setErr('Error: contact adminstrator for assistance.')
    }
  }
  const selectLanguageDropdown = (val: string) => {
    setLanguageOption(val);
    setLanguageDropdown(false);
  }
  const selectConceptDropdown = (topic: ConceptTopic) => {
    setConceptOption(topic.name);
    setTopicId(topic.id)
    setConceptDropdown(false);
  }
  return (
    <form onSubmit={(event:React.SyntheticEvent) => handleNewConcept(event)} 
      className={`
        pt-[2rem] pb-[8rem] px-[2rem]  w-[800px] bg-[#2B2B2B] m-[auto] dark:text-[#FFF] text-[#FFF]
      `}
    >
      <h4>Language:</h4>
      <button type='button' onClick={() => setLanguageDropdown(!languageDropdown)} className={`
        bg-[#3C3C3C] text-[1.5rem] p-[1rem] border-box  w-[200px]
        hover:bg-[#474747] 
      `}>
        {languageOption} {languageDropdown ? <>&#11205;</> : <>&#11206;</>}
      </button>
      {
        languageDropdown ?
        <ul className={`
          absolute z-[3] bg-[#333] max-h-[600px] overflow-y-scroll
        `}>
          {(languages as Language[]).map((entry) => (
            <li key={entry.id}>
              <button onClick={() => selectLanguageDropdown(entry.name)} className={`
                bg-[#2A2A2A] text-[1.5rem] p-[1rem] border-box w-[100%]  w-[200px]
                hover:bg-[#474747] 
              `}>
                {entry.name}
              </button>
            </li>
          ))}
        </ul>:
        <></>
      }
      <h4 style={{ marginTop: '2rem' }}>Concept:</h4>
      <button type='button' onClick={() => setConceptDropdown(!conceptDropdown)} className={`
        bg-[#3C3C3C] text-[1.5rem] p-[1rem] border-box  w-[200px]
        hover:bg-[#474747] 
      `}>
        {conceptOption} {conceptDropdown ? <>&#11205;</> : <>&#11206;</>}
      </button>
      {
        conceptDropdown ?
        <ul className={`
          absolute z-[3] bg-[#333] max-h-[600px] overflow-y-scroll
        `}>
          {(concepts as ConceptTopic[]).map((entry) => (
            <li key={entry.id}>
              <button onClick={() => selectConceptDropdown(entry)}
                className={`
                  bg-[#2A2A2A] text-[1.5rem] p-[1rem] border-box w-[200px]
                  hover:bg-[#474747] 
                `}
              >
                {entry.name}
              </button>
            </li>
          ))}
        </ul>:
        <></>
      }
      <section style={{ marginTop: '2rem' }}>
        <label><h4>Code Example:</h4></label>
        <textarea ref={textRef} placeholder='Include code example here...' 
          className={`
            w-[100%] h-[300px] my-[1rem] p-[1rem] text-[#FFF] text-[1.5rem] p-[1rem] bg-[#222]
          `}
        />   
      </section>
      <section className='flex-right'>
        <button className={`
          w-[100px] h-[47px] p-[1rem] bg-[#2A2A2A] text-[1.5rem] float-right relative
          hover:bg-[#2E2E2E]
          dark:text-[#FFF] text-[#FFF]
        `} type='submit'>Submit</button>
      </section>
      {
        err ? 
        <p className={`
          text-[#11EE11] my-[1rem]
          dark:text-[#EE1111]
        `}>{err}</p>:
        <></>
      }
      {
        successMsg ?
        <p className={`
          text-[#11EE11] my-[1rem]
          dark:text-[#11EE11]   
        `}>{successMsg}</p>:
        <></>
      }
      {
        languageDropdown || conceptDropdown? 
        <div
           onClick={() => {
            setLanguageDropdown(false);
            setConceptDropdown(false); 
          }}
          className={`
            fixed z-[2] left-0 top-0 w-[100%] h-[100%] justify-center flex-col overflow-auto
          `}
        ></div>:
        <></>
      }
    </form>
  )
}
