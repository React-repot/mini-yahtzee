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

  const diceRow = []
    for (let i = 0; i < NBR_OF_DICE; i++) {
        diceRow.push(
          <Col key={'diceRow' + i}>
            <Pressable
            key={'diceRow' + i}
            onPress={() => diceSelected(i)}>
                <MaterialCommunityIcons
                name={board[i]}
                key={'diceRow' + i}
                size={50}
                /* color={getDiceColor(i)} */ >
                </MaterialCommunityIcons>
            </Pressable>
          </Col>
        )
    }
  
  function getDiceColor(i) {
        return diceSelected[i] ? 'black' : 'steelblue'
    }
  

  const selectDice = (i) => {
      let dice = [...diceSelected]
      dice[i] = diceSelected[i] ? false : true
      setDiceSelected(dice)
  }

  const throwDice = () => {
      for (let i = 0; i < NBR_OF_DICE; i++) {
          if (!diceSelected[i]){
          let randomNumber = Math.floor(Math.random() * 6 + 1)
          board[i] = 'dice-' + randomNumber
          }
      }
      setThrowsLeft(throwsLeft-1)
  }

  return (
    <>
      <View>
        <Text>Görrebröd</Text>
        <Container fluid>
          <Row>{diceRow}</Row>
        </Container>
        <Pressable onPress={() => throwDice()}>
          THROW
        </Pressable>
        <Text>Player: {playerName}</Text>
      </View>
    </>
  )
}