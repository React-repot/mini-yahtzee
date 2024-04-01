import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-native-flex-grid'
import { MaterialCommunityIcons } from "@expo/vector-icons"
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
import style from '../style/style'


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

  const [totalPoints, setTotalPoints] = useState(0)

  useEffect(() => {
    if(playerName === '' && route.params?.player) {
      setPlayerName(route.params.player)
    }
  
  }, [])

  useEffect(() => {
    if (pointsToBonus < 1) {
      setTotalPoints(total + 50)
    }
    else {
      setTotalPoints(total)
    }

    if (selectedDicePoints.every(element => element === true)) {
      setGameEndStatus(true)
    }

  }, [selectedDicePoints])
  

  const diceRow = []
    for (let i = 0; i < NBR_OF_DICE; i++) {
        diceRow.push(
          <Col key={'diceRow' + i}>
            <Pressable
            key={'diceRow' + i}
            onPress={() => selectDice(i)}>
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
        <Text style={style.infoText} key={"pointsRow" + spot}>
          {getSpotTotal(spot)}
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

  const total = dicePointsTotal.reduce((total, current) => total = total + current, 0)
  const pointsToBonus = BONUS_LIMIT - total
  
  function getDiceColor(i) {
        return diceSelected[i] ? 'black' : 'steelblue'
    }

  function getDicePointsColor(i) {
    if (selectedDicePoints[i] && !gameEndStatus) {
      return "black"
    } else {
      return "steelblue"
    }
  }
  
  function getSpotTotal(i) {
    return dicePointsTotal[i]
  }

  const selectDice = (i) => {
    if (throwsLeft === 3) {
      setStatus("Throw new dice before selecting")
    }
    else{
      let dice = [...diceSelected]
      dice[i] = diceSelected[i] ? false : true
      setDiceSelected(dice)
    }
  }

  const throwDice = () => {
      let spots = [...diceSpots]
      
      if (throwsLeft > 0) {
      for (let i = 0; i < NBR_OF_DICE; i++) {
          if (!diceSelected[i]){
          let randomNumber = Math.floor(Math.random() * 6 + 1)
          spots[i] = randomNumber
          board[i] = 'dice-' + randomNumber
          }
      }
      setDiceSpots(spots)
      setThrowsLeft(throwsLeft-1)
      setStatus("Throw dice")
    }
    else {
      setStatus("Select points before throwing again")
    }
  }

  const selectDicePoints= (i) => {
    if (throwsLeft === 0) {
      let selected = [...diceSelected]
      let selectedPoints = [...selectedDicePoints]
      let points = [...dicePointsTotal]
      if (!selectedPoints[i]) {
        selectedPoints[i] = true
        let nbrOfDice = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0)
        points[i] = nbrOfDice * (i + 1)
        setDicePointsTotal(points)
        setSelectedDicePoints(selectedPoints)
        setThrowsLeft(NBR_OF_THROWS)
        setDiceSelected(new Array(NBR_OF_DICE).fill(false))
        setStatus("Throw dice")
        return points[i]
      }
      else {
        setStatus("You have already selected points for " + (i + 1))
      }
    }
    else {
      setStatus("Throw " + NBR_OF_THROWS + " times before setting points.")
    }
  }

  const startNewGame = () => {
    setThrowsLeft(NBR_OF_THROWS)
    setStatus("Throw dice")
    setDiceSelected(new Array(NBR_OF_DICE).fill(false))
    setDiceSpots(new Array(NBR_OF_DICE).fill(0))
    setSelectedDicePoints(new Array(MAX_SPOT).fill(false))
    setDicePointsTotal(new Array(MAX_SPOT).fill(0))
    setGameEndStatus(false)
  }

  return (
    <View style={style.container}>
      <Header />
      <View style={style.gameboard}>
        {!gameEndStatus ?
          <>
            <Container fluid>
              <Row>{diceRow}</Row>
            </Container>
            <Text style={style.infoText}>Throws left: {throwsLeft}</Text>
            <Text style={style.infoText}>{status}</Text>
            <Container fluid>
              <Text style={style.boldText}>Total: {totalPoints}</Text>
            </Container>
            <Container fluid>
                {(pointsToBonus > 0) ?
                <Text style={style.infoText}>You are {pointsToBonus} points away from the {BONUS_POINT}-point bonus.</Text>
                :
                <Text style={style.infoText}>You have gained {BONUS_POINT} bonus points!</Text>
                }
            </Container>
            <Container fluid>
              <Row>{pointsRow}</Row>
            </Container>
            <Container fluid>
              <Row>{pointsToSelectRow}</Row>
            </Container>
            <Pressable style={style.button} onPress={() => throwDice()}>
              <Text style={style.buttonText}>THROW</Text>
            </Pressable>
            <Text style={style.infoText}>Player: {playerName}</Text>
          </>
          :
          <>
            <Container fluid>
              <Row>
                <MaterialCommunityIcons 
                  name='alpha-e'
                  size={90}
                  color='steelblue'
                />
                <MaterialCommunityIcons 
                  name='alpha-n'
                  size={90}
                  color='steelblue'
                />
                <MaterialCommunityIcons 
                  name='alpha-d'
                  size={90}
                  color='steelblue'
                />
              </Row>
            </Container>
            <Text style={style.infoText}>Throws left: 0</Text>
            <Text style={style.infoText}>The game has ended.</Text>
            <Container fluid>
              <Text style={style.boldText}>Total: {totalPoints}</Text>
            </Container>
            <Container fluid>
                {(pointsToBonus > 0) ?
                <Text style={style.infoText}>You were {pointsToBonus} points away from the {BONUS_POINT}-point bonus.</Text>
                :
                <Text style={style.infoText}>You gained the {BONUS_POINT}-point bonus!</Text>
                }
            </Container>
            <Container fluid>
              <Row>{pointsRow}</Row>
            </Container>
            <Container fluid>
              <Row>{pointsToSelectRow}</Row>
            </Container>
            <Pressable style={style.button} onPress={startNewGame}>
              <Text style={style.buttonText}>NEW GAME</Text>
            </Pressable>
            <Text style={style.infoText}>Player: {playerName}</Text>
          </>
        }
      </View>
      <Footer />
    </View>
  )
}