import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-native-flex-grid'
import { MaterialCommunityIcons } from "@expo/vector-icons/MaterialCommunityIcons"
// IMPORT CONSTANTS, HEADER, FOOTER

let board = []

export default function Gameboard({ navigation, route }) {

  const [playerName, setPlayerName] = useState('')
  const [throwsLeft, setThrowsLeft] = useState(/* HEITTOVAKIO */)
  const [status, setStatus] = useState("Throw dice")
  const [gameEndStatus, setGameEndStatus] = useState(false)

  const [diceSelected, setDiceSelected] = useState(new Array(NBR_OF_DICE).fill(false))

  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICE).fill(0))

  const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false))

  const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0))

  useEffect(() => {
    if(playerName === '' && route.params?.player) {
      setPlayerName(route.params.player)
    }
  
  }, [])
  

  return (
    <>
      <View>
        <Text>Görrebröd</Text>
        <Text>Player: {playerName}</Text>
      </View>
    </>
  )
}