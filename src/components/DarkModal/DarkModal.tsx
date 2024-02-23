import React from 'react';
export default function DarkModal({
  children,
  isOpen,
}: {
  children: React.ReactNode,
  isOpen: boolean,
}) {
  return (
    <>
      {
        isOpen ? 
        <section className='modal-container'>{children}</section>:
        <></>
      }
      {
        isOpen ? 
        <div className='silent-modal silent-modal-dark'></div>:
        <></>
      }
    </>
  )
}
