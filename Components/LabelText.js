import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default function LabelText({ text }) {
    return (
        <Text style={styles.text}>
            {text}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        margin: 15,
        marginBottom: 25,
        fontSize: 40
    }
})