import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import {Header, Icon} from '@rneui/themed'
import {Button} from "@rneui/base";
import {useNavigation} from "@react-navigation/native";
import SideMenu from "react-native-side-menu";
import { FontAwesome } from '@expo/vector-icons'; 
import IconButton from '../UI/IconButton';

import { SpendingList } from './SpendingList';
import { useContext } from 'react';
import { ExpensesContext } from './context';

const deviceWidth = Dimensions.get('window').width;
export default function Spending() {
    const navigation = useNavigation();
    // Sample spending data
    const expensesCtx = useContext(ExpensesContext);
    let income = 0;
    let expense = 0;
    for (let e of expensesCtx.expenses) {
      if (e.type === 'expense') {
        expense += e.amount;
      } else {
        income += e.amount;
      }
    }

    function expensePressHandler() {
        navigation.navigate('ManageExpense');
    }


    const menu =
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Button title="Main" onPress={() => {navigation.navigate('Spending'); setIsMenuOpen(false);}}
                    style={{marginBottom: 8}} type='clear'/>
            <Button title="Personal Profile" onPress={() => {navigation.navigate('Personal'); setIsMenuOpen(false);}}
                    style={{marginBottom: 8}} type='clear'/>
            <Button title="Spending Overview" onPress={() => {navigation.navigate('Overview'); setIsMenuOpen(false);}}
                    style={{marginBottom: 8}} type='clear'/>
            <Button title="Tax Lookup Map" onPress={() => {navigation.navigate('Tax'); setIsMenuOpen(false);}}
                    style={{marginBottom: 8}} type='clear'/>
            <Button title="Savings Planner" onPress={() => {navigation.navigate('Saving'); setIsMenuOpen(false);}}
                    style={{marginBottom: 8}} type='clear'/>
            <Button title="Loan Planner" onPress={() => {navigation.navigate('Loan'); setIsMenuOpen(false);}}
                    style={{marginBottom: 8}} type='clear'/>
            <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 20, right: 8}}>
                <Text onPress={() => navigation.navigate('Login')}>Logout</Text>
                <Icon name="logout" onPress={() => navigation.navigate('Login')} size={30}/>
            </View>
        </View>
    ;

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <SideMenu menu={menu}
                  isOpen={isMenuOpen}
        >
            
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Header
                    leftComponent={<Icon name='menu'
                                         size={30}
                                         onPress={() => setIsMenuOpen(!isMenuOpen)}
                    />}
                    centerComponent={{text: 'RateScope', style: {color: '#fff', fontSize: 20}}}
                    rightComponent={<Icon name='home'
                                          onPress={() => navigation.navigate('Spending')}
                                          size={30}/>}
                />

                <View style={styles.summary}>
                    <View style={{margin:4}}>
                        <Text>Nov, 2023</Text>
                    </View>
                    <View style={styles.summaryCircle}>
                        <FontAwesome name="dollar" size={45} color="black" />
                        <Text style={[styles.summaryCircleText, {fontWeight: "bold"}]}>current</Text>
                        <Text style={styles.summaryCircleText}>{(income - expense).toFixed(2)}</Text>
                    </View>
                    <View style={styles.incomeVSexpense}>
                        <View style={{flex: 1}}>
                            <Text style={[styles.incomeVSexpenseText, {fontWeight: "bold"}]}>income</Text>
                            <Text style={styles.incomeVSexpenseText}>{income.toFixed(2)}</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={[styles.incomeVSexpenseText, {fontWeight: "bold"}]}>expense</Text>
                            <Text style={styles.incomeVSexpenseText}>{expense.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:1}}>
                  <SpendingList expenses={expensesCtx.expenses}/>                   
                </View>

                <View style={styles.add}>
                    <IconButton icon="plus-circle" size={60} color="black" onPress={expensePressHandler}/>
                </View>

            </View>
        </SideMenu>

    )
}

const styles = StyleSheet.create({
  summary: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryCircle: {
    width: 180,
    height: 180,
    borderWidth: 2,
    borderRadius: 90,
    borderColor: 'black',
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryCircleText: {
    textAlign: 'center',
    margin: 5,
    fontSize: 20,
  },
  incomeVSexpense: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  incomeVSexpenseText: {
    textAlign: 'center',
    margin: 5,
    fontSize: 20,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'black',
    margin: 4,
  },
  icons: {
    margin: 4,
  },
  add: {
    justifyContent:'center',
    alignItems: 'center',
    bottom: 10,

  }

});