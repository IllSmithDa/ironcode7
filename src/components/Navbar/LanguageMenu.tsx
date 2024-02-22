import React from 'react'
import { Language } from '../../types'
import { Link } from 'react-router-dom'

export default function LanguageMenu({
    languages,
    selectedId,
  } : {
  languages: Language[],
  selectedId ?: string,
}) {
  const renderData = languages.map((entry) => (
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
