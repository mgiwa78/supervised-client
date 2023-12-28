import React from 'react'
import {Document, Page, Text, View, StyleSheet, Font} from '@react-pdf/renderer'
import {TProject} from '../types/Project'

// Create styles

Font.register({
  family: 'OpenSans',
  fonts: [
    {src: '/font/OpenSans-Regular.ttf', fontWeight: 'normal'},
    {src: '/font/OpenSans-Bold.ttf', fontWeight: 'bold'},
  ],
})
const styles = StyleSheet.create({
  body: {
    fontFamily: 'OpenSans',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    margin: 30,
    padding: 30,
  },
  page: {
    fontFamily: 'OpenSans',
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 30,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 1.5,
  },
})

type Props = {
  project: TProject
}
// Create Document Component
const ProjectPDF = ({project}: Props) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.body}>
        <Text style={styles.title}> Project Details</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project</Text>
          <Text style={styles.text}>{project?.title}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Author</Text>
          <Text style={styles.text}>
            {project?.student.firstName + ' ' + project?.student.lastName}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Title</Text>
          <Text style={styles.text}>{project?.title}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Description</Text>
          <Text style={styles.text}>{project?.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Methodology</Text>
          <Text style={styles.text}>{project?.methodology}</Text>
        </View>
      </View>
    </Page>
  </Document>
)

export default ProjectPDF
