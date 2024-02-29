import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-native-flex-grid'
import { MaterialCommunityIcons } from "@expo/vector-icons/MaterialCommunityIcons"
import {
  NBR_OF_DICE,
  NBR_OF_THROWS,
  MIN_SPOT,
  MAX_SPOT,
  BONUS_LIMIT,
  BONUS_POINT
} from '../constants/Game'
import Header from './Header'
import Footer from './Footer'


let board = []

export default function Gameboard({ navigation, route }) {

  const [playerName, setPlayerName] = useState('')
  const [throwsLeft, setThrowsLeft] = useState(NBR_OF_THROWS)
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
                color={getDiceColor(i)} >
                </MaterialCommunityIcons>
            </Pressable>
          </Col>
        )
    }

  
  const pointsRow = []
  for (let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
      <Col key={"pointsRow" + spot}>
        <Text key={"pointsRow" + spot}>
          {getSpotTotal(diceButton)}
        </Text>
      </Col>
    )
    
  }

  const pointsToSelectRow = []
  for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
    pointsToSelectRow.push(
      <Col key={"buttonsRow" + diceButton}>
        <Pressable key={"buttonsRow" + diceButton} onPress={() => selectDicePoints(diceButton)}>
          <MaterialCommunityIcons
            name={"numeric-" + (diceButton+1) + "-circle"}
            key={"buttonsRow" + diceButton}
            size={35}
            color={getDicePointsColor(diceButton)}
          >

          </MaterialCommunityIcons>
        </Pressable>
      </Col>
    )
  }
  
  function getDiceColor(i) {
        return diceSelected[i] ? 'black' : 'steelblue'
    }

  function getDicePointsColor(i) {
    if (selectDicePoints[i] && !gameEndStatus) {
      return "black"
    } else {
      return "steelblue"
    }
  }
  
  function getSpotTotal(i) {
    return dicePointsTotal[i]
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

  const selectDicePoints= (i) => {
    //Early version
    let selectDice = [...diceSelected]
    let selectedPoints = [...selectedDicePoints]
    let points = [...dicePointsTotal]
    selectedDicePoints[i] = true
    let nbrOfDice = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0)
    points[i] = nbrOfDice * (i + 1)
    setDicePointsTotal(points)
    setSelectedDicePoints(selectedPoints)
    return points[i]
  }

  return (
    <>
      <Header />
      <View>
        <Text>Görrebröd</Text>
        <Container fluid>
          <Row>{diceRow}</Row>
        </Container>
        <Container fluid>
          <Row>{pointsRow}</Row>
        </Container>
        <Container fluid>
          <Row>{pointsToSelectRow}</Row>
        </Container>
        <Pressable onPress={() => throwDice()}>
          THROW
        </Pressable>
        <Text>Player: {playerName}</Text>
      </View>
      <Footer />
    </>
  )
}