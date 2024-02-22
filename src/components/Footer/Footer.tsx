import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <section className="footer-container">
      <ul>
        <li>
          <Link to='/about' >
            About
          </Link>
        </li>
        <li>
          <Link to='/terms' >
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
      <p> 
        Copyright
        {' '}
        {new Date().getFullYear()}
        . All Rights Reserved. IronCodeMan.
      </p>
    </section>
  )
}
