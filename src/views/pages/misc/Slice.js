import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import JsonView from '@uiw/react-json-view';
import { nordTheme } from '@uiw/react-json-view/nord';
import Data from "./data.json";
import Constraints from "./constraints.json";


import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index'


// TODO: Deploy button different color (?) Green
// TODO: Add load buttons for constraints and graph
// TODO: Have solve button go to another page (deployed*?)
// TODO: After creating slice, create a new slice page?
// Have a spinner on that page, that is able to grab logs from services
// Display logs until complete
// Then populate
// TODO: Add a test slice button
// TODO: Path Validation
// TODO: Ping
// TODO: Movie

const Resources = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol xs>
                <div>
                  <button onClick={() => setSelected(true)}>
                    Create New Slice 
                  </button>
                  {selected}
                </div>
	        </CCol>
                { selected && (
                <CCol xs>
                <div>
                  <button onClick={() => setSelected(true)}>
                    Solve & Deploy Slice
                  </button>
                </div>
	        </CCol>
		)}
              </CRow>
            </CCardBody>
          </CCard>
      <br />

      { selected && (
      <CRow>
        <CCol lg>
          <CCard className="mb-4">
            <CCardHeader>Loaded Constraints</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
	          <JsonView style={nordTheme} value={Constraints} shortenTextAfterLength={100} />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol lg>
          <CCard className="mb-4">
            <CCardHeader>Loaded Graph</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
	          <JsonView style={nordTheme} value={Data} shortenTextAfterLength={100}/>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      )}



        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Resources
