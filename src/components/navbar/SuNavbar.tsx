import {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap'

interface MenuInterface {
  id: number;
  title: string;
  web_path: string
}

interface NavbarInterface {
  title: string;
  children: MenuInterface[];
}

export const SuNavbar = (props: NavbarInterface) => {
  const {title, children} = props

  const [open, setOpen] = useState(false)

  return (
    <Dropdown
      isOpen={open}
      toggle={() => setOpen((prev) => !prev)}
      nav={true}
    >
      <DropdownToggle
        tag='a'
        href='#'
        className='navbar-nav-link rounded'
      >
        {title}
      </DropdownToggle>

      <DropdownMenu>
        {children.map((child) => {
          return (
            <NavLink
              key={child.id}
              to={child.web_path}
              className='dropdown-item rounded'
            >
              {child.title}
            </NavLink>
          )
        })}
      </DropdownMenu>
    </Dropdown>
  )
}