import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <section className={`
      absolute mt-[200px] bottom-0 left-[50%] translate-y-[-50%] translate-x-[-50%]
    `}>
      <ul 
        className="flex gap-[2rem] justify-center my-[2rem]"
      >
        <li>
          <Link to='/about' 
            className={`
              text-[1.5rem]
            `}
          >
            About
          </Link>
        </li>
        <li>
          <Link to='/terms'
            className={`
              text-[1.5rem]
            `}
          >
            Terms
          </Link>
        </li>
        <li>
          <Link to='/privacy'
            className={`
              text-[1.5rem]
            `}
          >
            Privacy
          </Link>
        </li>
        <li>
         <Link to='/cookies'
            className={`
              text-[1.5rem]
            `}
         >
            Cookies
          </Link>
        </li>
      </ul>
      <p
        className={`
          text-[1.5rem]
        `}
      > 
        Copyright
        {' '}
        {new Date().getFullYear()}
        . All Rights Reserved. IronCodeMan.
      </p>
    </section>
  )
}
