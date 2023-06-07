import React from 'react'
import { ReactComponent as Logo } from '../assets/icons/logo.svg'
import { ReactComponent as ArrowLeft } from '../assets/icons/arrow-l.svg'
import { ReactComponent as ArrowRight } from '../assets/icons/arrow-r.svg'
import { ReactComponent as arrowCta } from '../assets/icons/arrowCta.svg'
import { ReactComponent as filterActive } from '../assets/icons/filter-active.svg'
import { ReactComponent as filterDefault } from '../assets/icons/filter-default.svg'
import { ReactComponent as menu } from '../assets/icons/menu.svg'
import { ReactComponent as menuClose } from '../assets/icons/menuClose.svg'
import { ReactComponent as modalClose } from '../assets/icons/modalClose.svg'
import { ReactComponent as arrowSignUp } from '../assets/icons/arrowSignUp.svg'
import { ReactComponent as grid } from '../assets/icons/grid.svg'
import { ReactComponent as plus } from '../assets/icons/plus.svg'

const icons = {
  logo: Logo,
  arrowLeft: ArrowLeft,
  arrowSignUp,
  arrowRight: ArrowRight,
  arrowCta,
  filterActive,
  filterDefault,
  menu,
  menuClose,
  modalClose,
  grid,
  plus,
}

const Icon = props => {
  if (props.name in icons) {
    return <>{icons[props.name](props)}</>
  } else {
    return <>Undefined icon name: {props.name}</>
  }
}

export default Icon
