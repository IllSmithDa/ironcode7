import mainImg from '../../assets/images/iron_title.svg';
export default function Home() {
  return (
    <section
      className={`
        flex flex-col justify-center items-center min-h-[800px] h-[95vh] z-[-100] relative w-[100%] mt-[47px]
        md:min-h-[1000px]
      `}
    >
      <img
        src={mainImg}
        alt='main title image'
        className={`
          w-max-[400px] max-h-[400px]
          xl:w-[30%]
          lg:w-[35%]
          w-[40%]
          animate-spin
        `}
      />
      <h1
        className={`
          lg:text-[6.5rem] lg:m-[5rem]
          md:text-[4rem]
          sm:text-[3rem]
          text-[2.2rem]
          font-[700] m-[5rem] m-[2.5rem] dark:text-white text-black
          
        `}
      >
        IronCodeMan
      </h1>
      <h2 className=''>
        A Reference for Programmers
      </h2>
      <h4>
        Select topic or language
      </h4>

    </section>
  )
}
