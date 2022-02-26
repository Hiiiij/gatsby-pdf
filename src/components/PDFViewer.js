import { PDFViewer } from '@react-pdf/renderer';
import React from 'react'
import Resume from './Resume';
import './PDFViewer.css'
import { useTranslation, Link, useI18next } from 'gatsby-plugin-react-i18next'


const PDFViewerLayout = {
  width: '100%',
  flex: '1',
  'background-color': 'white'
  // 'max-width': '37rem'
}

export default function MyPDFViewer() {
  const { ready } = useI18next()
  if (ready) {

    return (
      <PDFViewer showToolbar={false} className="iframe" style={PDFViewerLayout}>
        <Resume></Resume>
      </PDFViewer>
    )
  } else {
    return <h1>Not ready</h1>
  }
}
