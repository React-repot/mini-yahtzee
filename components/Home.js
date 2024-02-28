import React, { useState } from 'react'
import { Keyboard, Text, View } from 'react-native'
import style from '../styles/style'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Header from './Header'
import Footer from './Footer'
import {
    NBR_OF_DICE,
    NBR_OF_THROWS,
    MIN_SPOT,
    MAX_SPOT,
    BONUS_LIMIT,
    BONUS_POINT
 } from '../constants/Game'

export default function Home({navigation}) {

    const [playerName, setPlayerName] = useState('')
    const [hasPlayerName, setHasPlayerName] = useState(false)

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true)
            Keyboard.dismiss()
        }
    }

  return (
    <View>
        <Text>Home WIP</Text>
    </View>
  )
}
