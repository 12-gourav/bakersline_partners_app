import { primary } from '@/constants/Colors'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const Loader = () => {
  return (
   <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={40} color={primary} />
      </View>
  )
}

export default Loader
