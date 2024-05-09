import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Data from "./mock.json";

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


function FileUploadButton() {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  return (
    <div>
      <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: 'none' }} />
        <button onClick={() => document.getElementById('fileInput').click()}>
          Load Scanner Settings
        </button>
        {selectedFile && <p>Selected file: {selectedFile.name}</p>}
      </div>
    );
}

const Scanner = () => {

  // TODO: Need to change the progress to be another type so that it displays correctly
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                < FileUploadButton />
              </CRow>
            </CCardBody>
          </CCard>
      <br />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Scanner</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <pre>{JSON.stringify(Data, null, 2)}</pre>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Scanner
