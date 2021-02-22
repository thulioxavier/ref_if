import React, { lazy, useState, useEffect } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CDataTable,
  CCallout,
} from '@coreui/react'


const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['codigo','name', 'date', 'horario'];



const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Dashboard = () => {



  return (
    <>
      <WidgetsDropdown />
     
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Lista de alunos
            </CCardHeader>
            <CCardBody>
         
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      
    </>
  )
}

export default Dashboard
