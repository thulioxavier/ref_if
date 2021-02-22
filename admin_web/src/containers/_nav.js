import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Painel Geral',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Alunos']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Novo Aluno',
    to: '/newUser/forms',
    icon: 'cil-user-follow',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Gerênciar Alunos',
    to: '/base/tables',
    icon: 'cil-user',
  },

  {
    _tag: 'CSidebarNavTitle',
    _children: ['Ações']
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Sair',
    to: '/logout',
    icon: 'cil-drop',
  },
  
]

export default _nav
