import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Default from '../../../layout/DefaultLayout';
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
            {Data.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.id}</div>
                <div className="fw-semibold text-truncate">
                  {item.cores} ({item.memory}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardBody>
      </CCard>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Stats
