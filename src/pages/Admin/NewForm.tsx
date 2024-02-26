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
    <form 
      onSubmit={(event: React.SyntheticEvent) => handleNewConcept(event)}
      className={`
        pt-[2rem] pb-[8rem] px-[2rem] w-[800px] bg-[#3A3A3A] m-[auto] dark:text-[#FFF] text-[#FFF] 
      `}  
    >
    <button type='button' onClick={() => setDisplayDropdown(!displayDropdown)}
      className={`
        bg-[#2A2A2A] text-[1.5rem] p-[1rem] border-box  w-[200px] 
        hover:bg-[#333] 
      `}
    >
      {selectOption} {displayDropdown ? <>&#11205;</> : <>&#11206;</>}
    </button>
    {
      displayDropdown ?
      <ul className={`
        absolute z-50 bg-[#333]
      `}>
        <li>
          <button 
            className={`
              bg-[#222] text-[1.8rem] p-[1rem] w-[200px] border-box text-white
              hover:bg-[#333]
            `}
            onClick={() => selectDropdown('Concept Topic')}>
            Concept Topic
          </button>
        </li>
        <li>
          <button 
            className={`
              bg-[#222] text-[1.8rem] p-[1rem] w-[200px] border-box text-white
              hover:bg-[#333]
            `}
            onClick={() => selectDropdown('Language')} >
            Language
          </button>
        </li>
      </ul>:
      <></>
    }
    <section
      className={`
        border-box my-[2rem]
      `}
    >
      <label className="text-[1.5rem]" htmlFor='new-option-name'>Name (required)</label>
      <input id='new-option-name' type='text' ref={nameRef} placeholder={`Name of ${selectOption}`}
        className={`
          w-[100%] h-[36px] my-[1rem] px-[1rem] py-[2rem] text-[#FFF] text-[1.5rem] bg-[#222]
        `}
      />
    </section>
    <section
      className={`
        border-box my-[1rem]
      `}
    >
      <label className="text-[1.5rem]" htmlFor='new-option-description'>Description</label>
      <textarea id='new-option-description' ref={descriptiontRef} placeholder={`Description of ${selectOption}`}
        className={`
          w-[100%] h-[300px] my-[1rem] p-[1rem] text-[#FFF] text-[1.5rem] bg-[#222]
        `}
      />   
    </section>
    <section
      className='flex-right'
    >
      <button
        className={`
          w-[100px] h-[47px] p-[1rem] bg-[#2A2A2A] text-[1.5rem] float-right relative
          hover:bg-[#2E2E2E]
          dark:text-[#FFF] text-[#FFF]
        `}
        type='submit'>
          Submit
        </button>
    </section>
    {
      displayDropdown ? 
      <div
        onClick={() => setDisplayDropdown(false)}
        className={`
          fixed z-[25] left-0 top-0 w-[100%] h-[100%] justify-center flex-col overflow-auto
        `}
      ></div>:
      <></>
    }
    {
      err ? 
      <p className={`
        text-[#11EE11] my-[1rem]
        dark:text-[#EE1111]
      `}>Error: {err}</p>:
      <></>
    }
    {
      successMsg ?
      <p className={`
        text-[#11EE11] my-[1rem]
        dark:text-[#11EE11]   
      `}>
        {successMsg}
      </p>:
      <></>
    }
  </form>
  )
}
