import {Fragment} from 'react'
import {NavLink} from 'react-router-dom'

import {SuNavbar} from '@/components/navbar'

import {House} from '@phosphor-icons/react'

export const Navigation = () => {

  return (
    <Fragment>
      <div className="navbar navbar-sm shadow">
        <div className="container-fluid">
          <div className="flex-fill overflow-auto overflow-lg-visible scrollbar-hidden">
            <ul className="nav gap-1 flex-nowrap flex-lg-wrap">
              <li className="nav-item">
                <NavLink to={'/'} className="navbar-nav-link rounded">
                  <House size={20} className={'me-2'}/>
                  Home
                </NavLink>
              </li>

              {menus.map((menu) => {
                return <SuNavbar
                  key={menu.id}
                  title={menu.title}
                  children={menu.children}
                />
              })}



              <li className="nav-item nav-item-dropdown-lg dropdown">
                <a href="#" className="navbar-nav-link dropdown-toggle rounded" data-bs-toggle="dropdown">
                  <i className="ph-note-blank me-2"></i>
                  Starter kit
                </a>

                <div className="dropdown-menu">
                  <div className="dropdown-header">Basic layouts</div>
                  <div className="dropdown-submenu dropdown-submenu-start">
                    <a href="#" className="dropdown-item dropdown-toggle">
                      <i className="ph-columns me-2"></i>
                      Sidebars
                    </a>
                    <div className="dropdown-menu">
                      <a href="../seed/layout_2_sidebars_1_side.html" className="dropdown-item rounded">2 sidebars on 1
                        side</a>
                      <a href="../seed/layout_2_sidebars_2_sides.html" className="dropdown-item rounded">2 sidebars on 2
                        sides</a>
                      <a href="../seed/layout_3_sidebars.html" className="dropdown-item rounded">3 sidebars</a>
                    </div>
                  </div>
                  <div className="dropdown-submenu dropdown-submenu-start">
                    <a href="#" className="dropdown-item dropdown-toggle">
                      <i className="ph-rows me-2"></i>
                      Navbars
                    </a>
                    <div className="dropdown-menu">
                      <a href="../seed/layout_navbar_fixed.html" className="dropdown-item rounded">Fixed navbar</a>
                      <a href="../seed/layout_navbar_hideable.html" className="dropdown-item rounded">Hideable
                        navbar</a>
                      <a href="../seed/layout_navbar_sticky.html" className="dropdown-item rounded">Sticky navbar</a>
                      <a href="../seed/layout_fixed_footer.html" className="dropdown-item rounded">Fixed footer</a>
                    </div>
                  </div>
                  <div className="dropdown-submenu dropdown-submenu-start">
                    <a href="#" className="dropdown-item dropdown-toggle">
                      <i className="ph-squares-four me-2"></i>
                      Boxed
                    </a>
                    <div className="dropdown-menu">
                      <a href="../seed/layout_boxed_page.html" className="dropdown-item rounded">Boxed page</a>
                      <a href="../seed/layout_boxed_content.html" className="dropdown-item rounded">Boxed content</a>
                    </div>
                  </div>
                  <div className="dropdown-header">Others</div>
                  <a href="../seed/layout_no_header.html" className="dropdown-item rounded">No header</a>
                  <a href="../seed/layout_no_footer.html" className="dropdown-item rounded">No footer</a>
                </div>
              </li>


            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  )
}