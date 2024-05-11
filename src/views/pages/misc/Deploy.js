import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import JsonView from '@uiw/react-json-view';
import { nordTheme } from '@uiw/react-json-view/nord';
import Data from "./data.json";
import Constraints from "./constraints.json";
import StreamingDataComponent from "./Stream"

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormTextarea,
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



const Deploy = () => {
  const [selected, setSelected] = useState(null);
  const [pvselected, pvsetSelected] = useState(null);
  const [vselected, vsetSelected] = useState(null);

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
                  </div>
	            </CCol>
                <CCol xs>
                  <div>
                    <CButton color="primary" onClick={() => pvsetSelected(!pvselected)}>
                      Validate Path
                    </CButton>
                  </div>
	            </CCol>
                <CCol xs>
                  <div>
                    <CButton color="primary" onClick={() => vsetSelected(!vselected)}>
                      Test Path Connectivity
                    </CButton>
                  </div>
	            </CCol>
              </CRow>
              <br />
              <CRow>
                <CCol xs>
                  <div>
                    <StreamingDataComponent endpoint="deploy"/>
                  </div>
	            </CCol>

                { pvselected && (
                  <CCol xs>
                    <div>
                      <StreamingDataComponent endpoint="pv"/>
                    </div>
	              </CCol>
                )}
                { vselected && (
                  <CCol xs>
                    <div>
                      <StreamingDataComponent endpoint="validate"/>
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

export default Deploy
