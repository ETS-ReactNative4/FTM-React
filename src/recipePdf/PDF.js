import React from 'react';
import ReactPDF, {
  Page,
  Text,
  View,
  Document,
  StyleSheet
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  pic: {
    width: 283,
    height: 270,
    left: 10,
    top: 10,
    position: 'absolute'
  },
  desc: {
    width: 283,
    height: 270,
    left: 303,
    top: 10,
    position: 'absolute',
    padding: 10,
    border: '1 solid grey'
  },
  ing: {
    width: 576,
    height: 265,
    left: 10,
    top: 290,
    position: 'absolute',
    padding: 10,
    border: '1 solid grey'
  },
  ins: {
    width: 576,
    height: 265,
    left: 10,
    top: 565,
    position: 'absolute',
    padding: 10,
    border: '1 solid grey'
  }
});

export const PDF = (
  <Document>
    <Page size="A4">
      <View style={styles.pic} />
      <Text style={styles.desc}>hello</Text>
      <View style={styles.ing} />
      <View style={styles.ins} />
    </Page>
  </Document>
);
