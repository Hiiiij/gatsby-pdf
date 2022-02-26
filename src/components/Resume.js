import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next'

const isLightMode = false
const styles = StyleSheet.create({
  page: { backgroundColor: isLightMode ? 'tomato' : 'pink' },
  section: { color: 'white', textAlign: 'center' }
});


export default function Resume({ size = 'A2' }) {
  const { t, ready } = useTranslation()
  const lol = useI18next()

  return <Document>
    <Page size={size} style={styles.page}>
      <View style={styles.section}>
        <Text>section £1</Text>
        <Text>{t('intro')}</Text>
        <Text> My name is Gustaw lol</Text>
      </View>
    </Page>
  </Document>
}

