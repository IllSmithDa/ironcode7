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
    <form className='form-container' onSubmit={(event:React.SyntheticEvent) => handleNewConcept(event)}>
    <h4>Language:</h4>
    <button type='button' onClick={() => setLanguageDropdown(!languageDropdown)} className='menu-tabs'>
      {languageOption} {languageDropdown ? <>&#11205;</> : <>&#11206;</>}
    </button>
    {
      languageDropdown ?
      <ul className='drop-down-container'>
        {(languages as Language[]).map((entry) => (
          <li key={entry.id}>
            <button onClick={() => selectLanguageDropdown(entry.name)} className='list-btn'>
              {entry.name}
            </button>
          </li>
        ))}
      </ul>:
      <></>
    }
    <h4 style={{ marginTop: '2rem' }}>Concept:</h4>
    <button type='button' onClick={() => setConceptDropdown(!conceptDropdown)} className='menu-tabs'>
      {conceptOption} {conceptDropdown ? <>&#11205;</> : <>&#11206;</>}
    </button>
    {
      conceptDropdown ?
      <ul className='drop-down-container'>
        {(concepts as ConceptTopic[]).map((entry) => (
          <li key={entry.id}>
            <button onClick={() => selectConceptDropdown(entry)} className='list-btn'>
              {entry.name}
            </button>
          </li>
        ))}
      </ul>:
      <></>
    }
    <section style={{ marginTop: '2rem' }}>
      <label><h4>Code Example:</h4></label>
      <textarea ref={textRef} placeholder='Include code example here...'/>   
    </section>
    <section className='flex-right'>
      <button className='std-button std-button-short' type='submit'>Submit</button>
    </section>
    {
      err ? 
      <p className='error-txt'>{err}</p>:
      <></>
    }
    {
      successMsg ?
      <p className='success-txt'>{successMsg}</p>:
      <></>
    }
    {
      languageDropdown || conceptDropdown? 
      <div className='silent-modal' onClick={() => {
        setLanguageDropdown(false);
        setConceptDropdown(false); 
      }}></div>:
      <></>
    }
  </form>
  )
}
