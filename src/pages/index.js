import { PDFDownloadLink } from "@react-pdf/renderer"
import React, { useRef, useState } from "react"
import MyPDFViewer from "../components/PDFViewer"
import Resume from "../components/Resume"
import { useTranslation, Link, useI18next } from 'gatsby-plugin-react-i18next'
import { graphql } from 'gatsby'

import EN from '../images/en.svg'
import DE from '../images/de.svg'
import PL from '../images/pl.svg'
import ArrowDown from '../images/arrow-down.inline.svg'
import { useOnClickOutside } from "../helpers/use-click-outside"
// styles
const color = '#fff'
const layoutStyles = {
  color: color,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  height: '100%',
  display: 'flex',
  // padding: '3rem',
  // 'justify-content': 'center',
  'flex-direction': 'column',
  'align-items': 'center',
  textAlign: 'center',
  'width': 'clamp(4rem, 60%, 100%)',
  margin: '0 auto',
  'margin-top': '25vh',

}

const languageSwitcherStyles = {
  display: 'flex',
  flexDirection: 'column',
  textDecoration: 'none',
  listStyle: 'none',
  color: 'white',
  gap: '1rem',
  position: 'absolute',
  width: '100px',
  height: '100px',
  top: 0,
  left: 0,
  border: 'solid',
  'z-index': 1,
  transform: 'translate(-42%, 0)',
  background: 'gray'
}
const flags = {

  de: DE,
  pl: PL,
  en: EN,
}

// markup
const IndexPage = () => {
  const { t } = useTranslation();
  const { languages, changeLanguage, originalPath, language } = useI18next();
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const ref = useRef()
  useOnClickOutside(ref, () => setDropdownOpen(false));

  return (
    <main style={layoutStyles}>
      intro: {t('intro')}
      <header className="main-header" style={{ alignSelf: 'flex-end', position: 'relative' }}>
        {!isDropdownOpen &&
          <div onClick={() => setDropdownOpen(!isDropdownOpen)} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <img src={flags[language]} />
            <ArrowDown fill={'#fff'} />
          </div>
        }
        {isDropdownOpen && <ul ref={ref} className="languages" style={languageSwitcherStyles}>
          {languages.map((lng) => (
            <li key={lng}>
              <Link to={originalPath} language={lng}>
                <img src={flags[lng]} />
              </Link>
            </li>
          ))}
        </ul>}
      </header>
      <title>Gustaw</title>
      <PDFDownloadLink document={<Resume size={'A4'} />} fileName="gustaw.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
      </PDFDownloadLink>
      <MyPDFViewer></MyPDFViewer>
    </main>
  )
}

export default IndexPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;