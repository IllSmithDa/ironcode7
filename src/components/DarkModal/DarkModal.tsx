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
        <div>{children}</div>:
        <></>
      }
    </>
  )
}
