import {Fragment, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap'

import {useAuthMethod} from '@/contexts/auth-state'

import {List, Bell, UserCircle, SignOut} from '@phosphor-icons/react'
import logo from '@/assets/logo.svg'
import logoText from '@/assets/logo_text.svg'
import avatar from '@/assets/face24.jpg'

export const MainNavbar = () => {
  const navigate = useNavigate()
  const {logout} = useAuthMethod()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    const {status, message} = await logout()

    if (status) {
      navigate('/login', {
        replace: true
      })
    } else {
      navigate('/error-page', {
        replace: true,
        state: {
          message: message
        }
      })
    }
  }

  return (
    <Fragment>
      <div className="navbar navbar-dark navbar-expand-lg navbar-static">
        <div className="container-fluid">
          <div className="d-flex d-lg-none me-2">
            <button type="button" className="navbar-toggler sidebar-mobile-main-toggle rounded-pill">
              <List size={20}/>
            </button>
          </div>

          <div className="navbar-brand flex-1 flex-lg-0">
            <Link
              to={'/'}
              className={'d-inline-flex align-items-center'}
            >
              <img
                src={logo}
                className="d-none d-sm-inline-block h-16px"
                alt="Cinerma uz"
              />

              <img
                src={logoText}
                className="d-none d-sm-inline-block h-16px ms-3"
                alt="Cinerma uz"
              />
            </Link>
          </div>

          <ul className="nav flex-row justify-content-end order-1 order-lg-2">
            <li className="nav-item ms-lg-2">
              <Link
                to={'#'}
                className="navbar-nav-link navbar-nav-link-icon rounded-pill"
              >
                <Bell size="20"/>

                <span
                  className="badge bg-yellow text-black position-absolute top-0 end-0 translate-middle-top zindex-1 rounded-pill mt-1 me-1"
                >
                    2
                </span>
              </Link>
            </li>

            <Dropdown
              isOpen={open}
              toggle={() => setOpen((prevState) => !prevState)}
              nav={true}
              className={'nav-item-dropdown-lg ms-lg-2'}
            >
              <DropdownToggle
                tag={'a'}
                href="#"
                className={'navbar-nav-link align-items-center rounded-pill p-1'}
              >
                <div className="status-indicator-container">
                  <img
                    src={avatar}
                    className="w-32px h-32px rounded-pill"
                    alt={'User display name'}
                  />
                  <span className="status-indicator bg-success"></span>
                </div>

                <span className="d-none d-lg-inline-block mx-lg-2">
                User display name
              </span>
              </DropdownToggle>

              <DropdownMenu end>
                <DropdownItem>
                  <UserCircle size="20" className="me-2"/>
                  My profile
                </DropdownItem>

                <DropdownItem divider/>

                <DropdownItem
                  href={'#'}
                  onClick={handleLogout}
                >
                  <SignOut size="20" className="me-2"/>
                  Выйти
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </ul>
        </div>
      </div>
    </Fragment>
  )
}