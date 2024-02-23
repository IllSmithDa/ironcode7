  import React, { useRef, useState } from 'react';
import { axiosFetch } from '../../axios';

export default function NewForm() {
  const [selectOption, setSelectOption] = useState<'Language'|'Concept Topic'>('Concept Topic');
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [err, setError] = useState<string>();
  const [successMsg, setSuccessMsg] = useState<string>();
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptiontRef = useRef<HTMLTextAreaElement>(null);
  const postTopicURL = '/api/concept/create-topic';
  const postLanguageURL = '/api/language/create-language';
  // console.log(languages);

  // https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/
  const handleNewConcept = async (event:  React.SyntheticEvent) => {
    event.preventDefault();
    const link = selectOption === 'Language' ? postLanguageURL : postTopicURL;
    const name = nameRef.current?.value;
    if (!name || name === '') {
      setError('Name cannot be blank');
      return;
    }
    const description = descriptiontRef.current?.value ?? ''
    const data = {
      name,
      description
    }
    console.log(data);
    try {
      const result = await axiosFetch.post(link, data);
      if (result.status === 200) {
        setError('');
        setSuccessMsg(`Successfully added new ${selectOption.toLowerCase()}`)
        nameRef.current.value = '';
        if (descriptiontRef.current) {
          descriptiontRef.current.value = '';
        }
      }
    } catch (err) {
      setError('Error: contact adminstrator for assistance.')
    }
  }
  const selectDropdown = (type: 'Language'|'Concept Topic') => {
    setSelectOption(type);
    setDisplayDropdown(false)
  }
  return (
    <form className='form-container' onSubmit={(event: React.SyntheticEvent) => handleNewConcept(event)}>
    <button type='button' onClick={() => setDisplayDropdown(!displayDropdown)} className='menu-tabs'>
      {selectOption} {displayDropdown ? <>&#11205;</> : <>&#11206;</>}
    </button>
    {
      displayDropdown ?
      <ul className='drop-down-container'>
        <li>
          <button onClick={() => selectDropdown('Concept Topic')} className='list-btn'>
            Concept Topic
          </button>
        </li>
        <li>
          <button onClick={() => selectDropdown('Language')} className='list-btn'>
            Language
          </button>
        </li>
      </ul>:
      <></>
    }
    <section>
      <label htmlFor='new-option-name'>Name (required)</label>
      <input id='new-option-name' type='text' ref={nameRef} placeholder={`Name of ${selectOption}`}/>
    </section>
    <section>
      <label htmlFor='new-option-description'>Description</label>
      <textarea id='new-option-description' ref={descriptiontRef} placeholder={`Description of ${selectOption}`}/>   
    </section>
    <section
      className='flex-right'
    >
      <button className='std-button std-button-short' type='submit'>Submit</button>
    </section>
    {
      displayDropdown ? 
      <div className='silent-modal' onClick={() => setDisplayDropdown(false) }></div>:
      <></>
    }
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
  </form>
  )
}
