import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper'
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
    <>
      <Header />
      <View>
        { !hasPlayerName ?
          <>
            <Text>For scörrebröd enter name</Text>
            <TextInput onChangeText={setPlayerName} autoFocus={true} />
              <Pressable onPress={handlePlayerName(playerName)}>
                <Text>OK</Text>
              </Pressable>
          </>
          :
          <View>
            <Text>Rules</Text>
            <Text multiline="true">
              Rule goes here ebin lmao hahahahahahhahahahahahahhahahahahahhahahahaha lorem ipsum opossum 
            </Text>
            <Text>Good luck {playerName}</Text>
            <Pressable onPress={() => navigation.navigate("Gameboard", {player: playerName})}>
              <Text>Spelar ett spel</Text>
            </Pressable>
          </View>
        }
      </View>
      <Footer />
    </>
  )
}
