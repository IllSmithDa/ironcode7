import { Language } from '../../types'
import { Link } from 'react-router-dom'
import UseAllLanguages from '../../hooks/LanguageHook';

export default function LanguageMenu({
    selectedId,
  } : {
  selectedId ?: string,
}) {

  const languages:Language[] = UseAllLanguages();

  const renderData = languages?.map((entry) => (
    <>
    {
      selectedId === entry.id ? 
      <Link 
        key={entry.id}
        to={`/language/${entry.id}`}
        className={`list-btn list-btn-active`}
      >
        {entry.name}
      </Link>:
      <Link 
        key={entry.id}
        to={`/language/${entry.id}`}
        className={`list-btn`}
      >
        {entry.name}
      </Link>
      }
    </>
  ))

  return (
    <div>
      {renderData}
    </div>
  )
}
