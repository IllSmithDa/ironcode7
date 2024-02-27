export default function CookieNotice() {
  return (
    <div
      className={`
        bg-[#3333DD] w-[100%] fixed bottom-0 left-0 z-[100] p-[2rem]
        2xl:w-[1600px] 2xl:left-[50%] 2xl:translate-x-[-50%] hidden
      `}
    >
      <section>
        <h2 className="text-[1.4rem] text-[#FFF] my-[1rem] md:text-[2rem]">We value your privacy</h2>
        <p className="my-[2rem] text-[#FFF]">
          We use cookies to enhance your browsing experience, serve personalized ads or content and analyze our traffic. By clicking 'Accept All', you consent to our use of cookies. 
        </p>
        <div
          className={`flex gap-[1rem] justify-end`}
        >
          <button
            onClick={() => {

            }}
            className={`
              w-[75px] h-[37px] p-[1rem] bg-[#2A2A2A] text-[0.8rem]
              md:w-[150px] md:text-[1.5rem] md:h-[47px] 
              hover:bg-[#373737]
              dark:text-[#FFF] text-[#FFF]
            `}
          >Customize</button>
          <button
            onClick={() => {

            }}
            className={`
              w-[75px] h-[37px] p-[1rem] bg-[#2A2A2A] text-[0.8rem]
              md:w-[150px]  md:text-[1.5rem] md:h-[47px] 
              hover:bg-[#373737]
              dark:text-[#FFF] text-[#FFF]
            `}
          >Reject All</button>
          <button
            onClick={() => {

            }}
            className={`
              w-[75px] h-[37px] p-[1rem] bg-[#2A2A2A] text-[0.8rem]
              md:w-[150px] md:text-[1.5rem] md:h-[47px] 
              hover:bg-[#373737]
              dark:text-[#FFF] text-[#FFF]
            `}
          >
            Accept All
          </button>
        </div>
      </section>
    </div>
  )
}
