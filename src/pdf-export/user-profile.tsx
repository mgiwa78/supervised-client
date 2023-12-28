import React from 'react'
import User from '../types/User'
import {Document, Page, Text, StyleSheet, Font, View} from '@react-pdf/renderer'

type Props = {
  user: User
}

Font.register({
  family: 'OpenSans',
  fonts: [
    {src: '/font/OpenSans-Regular.ttf', fontWeight: 'normal'},
    {src: '/font/OpenSans-Bold.ttf', fontWeight: 'bold'},
  ],
})
const UserProfile = ({user}: Props) => {
  const body = {
    fontFamily: 'OpenSans',
    margin: 0,
    padding: 0,
    backgroundColor: '#fff',
    color: '#333',
  }
  const container = {
    margin: '30px',
    padding: '20px',
    border: '1px solid #ddd',
  }
  const header = {
    textAlign: 'center',
    marginBottom: '30px',
  }
  // .header img {
  //   width: 100px;
  // }

  const profileLabel = {
    fontWeight: 'bold',
  }
  const footer = {
    textAlign: 'center',
    fontSize: '12px',
    marginTop: '30px',
    paddingTop: '10px',
    borderTop: '1px solid #ddd',
  }

  return (
    <Document>
      <Page size='A4' style={body}>
        <View style={container}>
          <View
            style={{
              textAlign: 'center',
              marginBottom: 30,
            }}
          >
            {/* For image, you need to use Image component from @react-pdf/renderer */}
            <Text
              style={{
                margin: '10px 0',
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              User Profile
            </Text>
          </View>

          <View
            style={{
              marginBottom: '20px',
            }}
          >
            <Text
              style={{
                fontSize: '20px',
                borderBottom: '1px solid #ddd',
                paddingBottom: '5px',
                fontWeight: 'bold',
              }}
            >
              Personal Information
            </Text>
            <Text
              style={{
                fontSize: '14px',
                fontWeight: 'normal',
                lineHeight: '1.5',
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                }}
              >
                Name:
              </Text>
              {user?.firstName + ' ' + user?.lastName}
            </Text>
            <Text
              style={{
                fontSize: '14px',
                fontWeight: 'normal',
                lineHeight: '1.5',
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                }}
              >
                Email:
              </Text>
              {user?.email}
            </Text>
            <Text
              style={{
                fontSize: '14px',
                fontWeight: 'normal',
                lineHeight: '1.5',
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                }}
              >
                Department:
              </Text>
              {user?.department.name}
            </Text>
            {/* ... other personal information ... */}
          </View>

          {/* ... other sections ... */}

          <View
            style={{
              textAlign: 'center',
              fontSize: '12px',
              marginTop: '30px',
              paddingTop: '10px',
              borderTop: '1px solid #ddd',
            }}
          >
            <Text>&copy; 2023 University Name | Privacy Policy | Terms of Use</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default UserProfile
