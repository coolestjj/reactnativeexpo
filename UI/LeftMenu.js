import {Text, View, StyleSheet} from "react-native";
import {Button, Icon} from "@rneui/themed";
import React from "react";
import {useNavigation} from "@react-navigation/native";


export default function LeftMenu({setIsMenuOpen}) {
    const navigation = useNavigation();
    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Button title="Main" onPress={() => {navigation.navigate('Spending'); return () => setIsMenuOpen;}}
                    style={styles.sideButton} type='clear'/>
            <Button title="Personal Profile" onPress={() => {navigation.navigate('Personal'); return () => setIsMenuOpen;}}
                    style={styles.sideButton} type='clear'/>
            <Button title="Spending Overview" onPress={() => {navigation.navigate('Overview'); return () => setIsMenuOpen;}}
                    style={styles.sideButton} type='clear'/>
            <Button title="Tax Lookup Map" onPress={() => {navigation.navigate('Tax'); return () => setIsMenuOpen;}}
                    style={styles.sideButton} type='clear'/>
            <Button title="Savings Planner" onPress={() => {navigation.navigate('Saving'); return () => setIsMenuOpen;}}
                    style={styles.sideButton} type='clear'/>
            <Button title="Loan Planner" onPress={() => {navigation.navigate('Loan'); return () => setIsMenuOpen;}}
                    style={styles.sideButton} type='clear'/>
            <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 20, right: 8}}>
                <Text onPress={() => navigation.navigate('Login')}>Logout</Text>
                <Icon name="logout" onPress={() => navigation.navigate('Login')} size={30}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sideButton: {
        marginBottom: 8,
    }
})