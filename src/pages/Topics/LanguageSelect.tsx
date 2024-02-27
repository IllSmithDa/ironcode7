import { ActiveConceptItem, ActiveLanguages, ConceptItem } from '../../types';

export default function LanguageSelect({
  languages,
  updateLanguages
}:{
  languages ?: ActiveConceptItem[],
    updateLanguages: (updateedData: ActiveConceptItem[]) => void
}) {


  const handleLanguage = (language: string, newChecked: boolean) => {
    
    // updating local storage languages
    const activeLanguages: ActiveLanguages = JSON.parse(localStorage.getItem('iron_code_languages') as string);
    activeLanguages[language] = newChecked;
    localStorage.setItem('iron_code_languages', JSON.stringify(activeLanguages));

    const result = languages?.map((data: ConceptItem) => {
      if (data.language === language) {
        return {
          ...data,
          language: data.language,
          checked: newChecked
        } 
      }
      return data;
    });
    if (result?.length) updateLanguages([...result] as ActiveConceptItem[]);
  } 


  const renderData = languages?.map((data) => (
    <li key={data.language}
      className={`
        flex gap-2
      `}
    >
      <input
        id={`selection-${data.language}`}
        type='checkbox' checked={data.checked}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            handleLanguage(data.language, !data.checked); 
          }
        }}
        onChange={() => {
          handleLanguage(data.language, !data.checked)
        }}
        className={`
          text-[1rem]
          md:text-[1.5rem]
        `}
      />
      <button
        className={`
          text-[1rem] hover:underline
          md:text-[1.5rem]
        `}
        onClick={() => {
          handleLanguage(data.language, !data.checked)
        }}
        tabIndex={-1}
        >
          {data.language}
        </button>
    </li>
  ))
  
  return (
    <section
      className={`language-select-container`}
    >
      <h4>Select Languages</h4>
      <ul
        className={`
          grid gap-[1rem] grid-cols-2 bg-[#EAEAEA] p-6 
          lg:grid-cols-4 lg:w-[600px]
          sm:grid-cols-3
          dark:bg-[#272727]
        `}
      >
        {renderData}
      </ul>
    </section>
  )
}
