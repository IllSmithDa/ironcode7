import React from 'react'

export default function CookieNotice() {
  return (
    <div
      className={`
        flex justify-center flex-col content-center w-[250px] 
      `}
    >
      <section>
        <h2>We value your privacy</h2>
        <p>
          We use cookies to enhance your browsing experience, serve personalized ads or content and analyze our traffic. By clicking 'Accept All', you consent to our use of cookies. 
        </p>
        <div>
          <button>Customize</button>
          <button>Reject All</button>
          <button>Accept All</button>
        </div>
      </section>
    </div>
  )
}
