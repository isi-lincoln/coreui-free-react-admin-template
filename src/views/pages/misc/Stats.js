import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Default from '../../../layout/DefaultLayout';
import JsonView from '@uiw/react-json-view';
import { nordTheme } from '@uiw/react-json-view/nord';
import Data from "../../dashboard/nodes.json";

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


// TODO: percent pull from top using REST/GET to api server
const tempArr = Data.map((data) => {
  if(data.data.id === "orchestrator"){
    return {
      ...data,
      title: data.data.id,
      value: "Utilization",
      percent: Math.floor(Math.random()* (100 - 90 + 1)) + 90,
      color: "danger",
    }
  } else if(data.data.id === "sdcore1" || data.data.id == "sdcore2"){
    return {
      ...data,
      title: data.data.id,
      value: "Utilization",
      percent: Math.floor(Math.random()* (60 - 40 + 1)) + 40,
      color: "warning",
    }
  } else {
    return {
      ...data,
      title: data.data.id,
      value: "Utilization",
      percent: Math.floor(Math.random()* (12 - 1 + 1)) + 1,
      color: "success",
    }
  }
});


const Stats = () => {

  // TODO: Need to change the progress to be another type so that it displays correctly
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
      <CCard className="mb-4">
        <CCardBody>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {tempArr.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardBody>
      </CCard>

      <br />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Node Details</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
	          <JsonView style={nordTheme} value={Data} shortenTextAfterLength={100} collapsed={true} />
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

export default Stats
