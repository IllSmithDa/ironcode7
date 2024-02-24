import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <section className={`
      absolute mt-[200px] bottom-0 left-[50%] translate-y-[-50%] translate-x-[-50%] w-[100%]
    `}>
      <ul 
        className="flex gap-[2rem] justify-center my-[2rem]"
      >
        <li>
          <Link to='/about' >
            About
          </Link>
        </li>
        <li>
          <Link to='/terms'>
            Terms
          </Link>
        </li>
        <li>
          <Link to='/privacy'>
            Privacy
          </Link>
        </li>
        <li>
         <Link to='/cookies'>
            Cookies
          </Link>
        </li>
      </ul>
      <p
        className={`
          text-center
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
