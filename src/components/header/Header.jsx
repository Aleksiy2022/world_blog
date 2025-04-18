import { Link } from "react-router";
import classes from './header.module.scss'

function Header() {
  return (
    <header className={classes.header}>
      <Link>Realworld Blog</Link>
    </header>
  )
}

export default Header