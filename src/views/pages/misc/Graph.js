import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Default from '../../../layout/DefaultLayout';
import cytoscape from 'cytoscape';
import avsdf from 'cytoscape-avsdf';
import elements from './data.json';
import sliceElements from './data-color-slice.json';
import {
  CButton,
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

var complete1 = false;
var complete2 = false;

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
          'font-size': 500,
          'background-color': '#666',
          'label': 'data(id)',
          'color': '#ecdcf0',
          'width': 500,
          'height': 500,
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 'data(bandwidth)',
          //'width': '1',
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
	     nodeSeparation: 2000
      }
   });

   if (!complete1) {
      cy.edges().forEach(function(edge){
        edge.data('bandwidth', parseInt(edge.data('bandwidth'))/5); 
        complete1 = true;
        console.log(edge.data('bandwidth'))
      });
    }

    cy.userZoomingEnabled( false );

    cy.on('tap', 'node', function(evt){
      setSelectedElement(evt.target.data());
    });

    cy.on('tap', 'edge', function(evt){
      const node = evt.target;
      const nodeData = node.data();
      const clone = structuredClone(nodeData)
      clone.bandwidth *= 5;
      console.log(clone);
      if (clone.bandwidth >= 600) {
        nodeData.color = "blue";
      } else {
        nodeData.color = "red";
      }
      setSelectedElement(clone);
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
    <div id="cy" className={"graph-border"} style={{ width: '100vw', height: '50vh' }} />
      <CCol>
        {selectedElement && <pre>{JSON.stringify(selectedElement, null, 2)}</pre>}
      </ CCol>
    </div>
    );
};


var complete3 = false;
var complete4 = false;

const SliceViz = () => {
  const [selectedElement, setSelectedElement] = useState(null);

  useEffect(() => {
    const cy = cytoscape({
      container: document.getElementById('cy'),
      sliceElements,
      style: [
      {
        selector: 'node',
        style: {
          'font-size': 500,
          'background-color': '#666',
          'label': 'data(id)',
          'color': '#ecdcf0',
          'width': 500,
          'height': 500,
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 'data(bandwidth)',
          //'width': '1',
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
	     nodeSeparation: 2000
      }
   });

   if (!complete3) {
      cy.edges().forEach(function(edge){
        edge.data('bandwidth', parseInt(edge.data('bandwidth'))/10); 
        complete3 = true;
        console.log(edge.data('bandwidth'))
      });
    }

    cy.userZoomingEnabled( false );

    cy.on('tap', 'node', function(evt){
      setSelectedElement(evt.target.data());
    });

    cy.on('tap', 'edge', function(evt){
      const node = evt.target;
      const nodeData = node.data();
      const clone = structuredClone(nodeData)
      if (!complete4) {
        clone.bandwidth *= 10;
        complete4 = true;
      }
      console.log(clone);
      setSelectedElement(clone);
    });

    const resizeCy = () => {
      cy.resize();
      cy.fit();
    };

    window.addEventListener('resize', resizeCy);

    return () => {
        window.removeEventListener('resize', resizeCy);
      };
  }, [sliceElements]);

  return (
    <div>
    <div id="cy" className={"graph-border"} style={{ width: '100vw', height: '50vh' }} />
    </div>
    );
};


const Graph = () => {
  const [sliceSelected, setSliceSelected] = useState(null);

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            { !sliceSelected && (
            <CButton color="warning" disabled onClick={() => setSliceSelected(true)}>
              Show Slice
            </CButton>
            )}
            { sliceSelected && (
            <CButton color="primary" onClick={() => setSliceSelected(false)}>
              Show Original Graph 
            </CButton>
            )}
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Network
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
            </CCol>
          </CRow>
          <CRow>
            { !sliceSelected && (
              <div>
              <Viz />
              </div>
            )}
            { sliceSelected && (
              <div>
              <SliceViz />
              </div>
            )}
          </CRow>
        </CCardBody>
      </CCard>

        <AppFooter />
      </div>
    </div>
  )


}

export default Graph
