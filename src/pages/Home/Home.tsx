import mainImg from '../../assets/images/iron_title.svg';
export default function Home() {
  return (
    <section
      className={`
        flex flex-col justify-center items-center min-h-[90vh] z-[-100] relative w-[100%]
      `}
    >
      <img
        src={mainImg}
        alt='main title image'
        className={`
          w-[400px] h-[400px]
        `}
      />
      <h1
        className={`
          text-[6rem] font-[700] m-[5rem]
        `}
      >
        IronCodeMan
      </h1>
      <h2>
        A Reference for Programmers
      </h2>
      <h4>
        Select topic or language
      </h4>

    </section>
  )
}
