import { Language } from '../../types'
import { Link } from 'react-router-dom'
import UseAllLanguages from '../../hooks/LanguageHook';

export default function LanguageMenu({
  selectedId,
  closeModal
  } : {
  selectedId ?: string,
  closeModal: () => void
}) {

  const languages:Language[] = UseAllLanguages();

  const renderData = languages?.map((entry) => (
    <>
    {
      selectedId === entry.id ? 
      <Link 
        key={entry.id}
        to={`/language/${entry.id}`}
        className={`
          relative z-[100] block text-[1.6rem] p-[1rem] bg-[#F1F1F1] hover:bg-[#F1F1F1]
        `}
        onClick={closeModal}
      >
        {entry.name}
      </Link>:
      <Link 
        key={entry.id}
        to={`/language/${entry.id}`}
        className={`
          relative z-[100] block text-[1.6rem] p-[1rem] bg-[#DDD] hover:bg-[#F1F1F1] 
        `}
        onClick={closeModal}
      >
        {entry.name}
      </Link>
      }
    </>
  ))

  return (
    <section
      className={`
        min-h-[100vh] w-[100vw] absolute bg-[#DDD] top-0 left-0
        lg:w-[150px] lg:min-h-[auto] lg:top-[auto] lg:left-[auto] lg:right-0
      `}
    >
      <h4
        className={`
          lg:hidden
          block
        `}
      >
        Select Language
      </h4>
      {renderData}
    </section>
  )
}
