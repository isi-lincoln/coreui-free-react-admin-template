import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Default from '../../../layout/DefaultLayout';
import cytoscape from 'cytoscape';
import avsdf from 'cytoscape-avsdf';
import elements from './data.json';
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
    <div id="cy" className={"graph-border"} style={{ width: '90vw', height: '90vh', float: 'top' }} />
    <div style={{position:"absolute",bottom:"0px"}}>
      {selectedElement && <pre>{JSON.stringify(selectedElement, null, 2)}</pre>}
    </div>
    </div>
    );
};

const Stats = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
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

        <AppFooter />
      </div>
    </div>
  )


}

export default Stats
