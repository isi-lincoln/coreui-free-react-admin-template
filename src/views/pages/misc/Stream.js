import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import JsonView from '@uiw/react-json-view';
import { nordTheme } from '@uiw/react-json-view/nord';
import Data from "./data.json";
import Constraints from "./constraints.json";

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

function StreamingDataComponent({ endpoint }) {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:10001/".concat(endpoint),{
          mode: 'cors',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');

        reader.read().then(function processText({ done, value }) {
          if (done) {
            console.log('Stream complete');
            return;
          }
          setData(prevData => prevData + decoder.decode(value));
          return reader.read().then(processText);
        });
      } catch (e) {
        console.error('Fetch failed', e);
      }
    };

    fetchData();
  }, [endpoint]);

  return (
    <CForm>
      <CFormTextarea
        placeholder=""
        value={data}
        aria-label=""
        disabled
        readOnly
      ></CFormTextarea>
    </CForm>
  );
};

export default StreamingDataComponent;
