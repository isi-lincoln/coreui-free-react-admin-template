import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import JsonView from '@uiw/react-json-view';
import { nordTheme } from '@uiw/react-json-view/nord';

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
  CSpinner,
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
  const textareaRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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
	    console.log(response.body);
        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');

        reader.read().then(function processText({ done, value }) {
          setIsLoading(false);
          if (done) {
            console.log('Stream complete');
            textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
            setIsStreaming(false);
            return;
          }
	      console.log(decoder.decode(value));
          setData(prevData => prevData + decoder.decode(value));
          return reader.read().then(processText);
        });
      } catch (e) {
        console.error('Fetch failed', e);
      }
    };

    fetchData();
  }, [endpoint]);

  useEffect(() => {
    let intervalId;
    if (isStreaming) {
      intervalId = setInterval(() => {
        if (textareaRef.current) {
          textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        }
      }, 3000); 
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isStreaming]);

  return (
    <div>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CSpinner color="info" />
        </div>
      ) : (
        <CForm>
          <CFormTextarea
            placeholder="Loading..."
            value={data}
            aria-label=""
            rows={20}
            disabled
            readOnly
            ref={textareaRef}
          ></CFormTextarea>
        </CForm> 
    )}
    </div>
  );
};

export default StreamingDataComponent;
