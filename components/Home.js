import { View, Text, Pressable, Keyboard, TextInput } from 'react-native'
import React, { useState } from 'react'
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
import { MaterialCommunityIcons } from "@expo/vector-icons"
import style from '../style/style'

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
    <View style={style.container}>
      <Header />
      <View style={style.gameinfo}>
        <MaterialCommunityIcons 
          name='information'
          size={75}
          color='steelblue'
        />
        { !hasPlayerName ?
          <View style={style.gameinfo}>
            <Text style={style.infoText}>Enter name for scoreboard:</Text>
            <TextInput onChangeText={setPlayerName} autoFocus={true} />
            <Pressable style={style.button} onPress={() => handlePlayerName(playerName)}>
              <Text style={style.buttonText}>OK</Text>
            </Pressable>
          </View>
          :
          <View style={style.gameinfo}>
            <Text style={style.boldText}>Rules</Text>
            <Text style={style.infoText} multiline="true">
              THE GAME: Upper section of the classic Yahtzee
              dice game. You have {NBR_OF_DICE} dice and
              you have {NBR_OF_THROWS} times to throw all dice. 
              After each throw you can lock dice in
              order to get same dice spot counts as many times as
              possible. At the end of the turn you must select
              your points from {MIN_SPOT} to {MAX_SPOT}.
              Game ends when all points have been selected.
              The order for selecting those is free.
            </Text>
            <Text style={style.infoText} multiline="true">
              POINTS: After each turn the game calculates the sum
              for the dice you selected. Only the dice having
              the same spot count are calculated. Inside the
              game you can not select the same points from
              {MIN_SPOT} to {MAX_SPOT} again.
            </Text>
            <Text style={style.infoText} multiline="true">
              GOAL: To get as many points as possible.
              {BONUS_LIMIT} points is the limit of
              getting bonus which gives you {BONUS_POINT}
              points more. 
            </Text>
            <Text style={style.infoText}>Good luck {playerName}</Text>
            <Pressable style={style.button} onPress={() => navigation.navigate("Gameboard", {player: playerName})}>
              <Text style={style.buttonText}>PLAY</Text>
            </Pressable>
          </View>
        }
      </View>
      <Footer />
    </View>
  )
}
