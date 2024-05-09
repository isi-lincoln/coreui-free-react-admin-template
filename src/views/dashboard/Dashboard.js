import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import cytoscape from 'cytoscape';
import avsdf from 'cytoscape-avsdf';
import elements from './data.json';

import {
  CAvatar,
  CButton,
  CButtonGroup,
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
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'

cytoscape.use(avsdf);

const Viz = () => {
  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    const cy = cytoscape({
      container: document.getElementById('cy'),
      elements,
      style: [
      {
        selector: 'node',
        style: {
          'font-size': 6,
          'background-color': '#666',
          'label': 'data(id)',
          'width': 5,
          'height': 5,
        }
      },
      {
        selector: 'edge',
        style: {
          //'width': 'data(bandwidth)/10',
          'width': '1',
          'line-color': 'data(color)',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle'
        }
      }
      ],
      layout: {
         name: 'avsdf',
	 padding: 5,
	 animate: 'end',
	 animationDuration: 500,   
	 nodeSeparation: 20
      }
    });
    cy.userZoomingEnabled( false );

    cy.on('tap', 'node', function(evt){
      setSelectedElement(evt.target.data());
    });

    cy.on('tap', 'edge', function(evt){
      setSelectedElement(evt.target.data());
    });

    const resizeCy = () => {
      cy.resize();
      cy.fit();
    };

    window.addEventListener('resize', resizeCy);

    return () => {
        window.removeEventListener('resize', resizeCy);
      };
  }, [elements]);

  return (
    <div>
    <div id="cy" className={"graph-border"} style={{ width: '50vw', height: '50vh', float: 'top' }} />
    </div>
    );
};

const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Network
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
            </CCol>
          </CRow>
          <CRow>
            <Viz />
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
