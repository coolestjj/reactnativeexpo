import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Header, Icon, Button} from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import PieChart from 'react-native-pie-chart';
import {useNavigation, useRoute} from '@react-navigation/native';
import SideMenu from "react-native-side-menu";

const Overview = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'This month', value: 'monthly'},
        {label: 'This year', value: 'yearly'},
        {label: 'Historical accumulation', value: 'total'},
    ]);


    const [spendingData, setSpendingData] = useState([]);

    useEffect(() => {
        // Retrieve spending data from route params
        if (route.params && route.params.spendingData) {
            setSpendingData(route.params.spendingData);
        }
    }, [route.params]);

    const widthAndHeight = 250;
    const series = [100, 200, 300];
    const sliceColor = ['#fbd203', '#ffb300', '#ff9100'];

    const menu =
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Button title="Personal Profile" onPress={() => navigation.navigate('Personal')} style={{marginBottom: 8}}/>
            <Button title="Main" onPress={() => navigation.navigate('Spending')} style={{marginBottom: 8}}/>
            <Button title="Spending Overview" onPress={() => navigation.navigate('Overview')}
                    style={{marginBottom: 8}}/>
            <Button title="Tax Lookup Map" onPress={() => navigation.navigate('Tax')} style={{marginBottom: 8}}/>
            <Button title="Savings Planner" onPress={() => navigation.navigate('Saving')} style={{marginBottom: 8}}/>
            <Button title="Loan Planner" onPress={() => navigation.navigate('Loan')} style={{marginBottom: 8}}/>

            <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 20, right: 8}}>
                <Text onPress={() => navigation.navigate('Login')}>Logout</Text>
                <Icon name="logout" onPress={() => navigation.navigate('Login')} size={30}/>
            </View>
        </View>
    ;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Function to calculate the total payment from spendingData
    const calculateTotalPayment = () => {
        return spendingData.reduce((total, item) => total + item.payment, 0);
    };

    return (
        <SideMenu menu={menu}
                  isOpen={isMenuOpen}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Header
                    leftComponent={<Icon name='menu'
                                         size={30}
                                         onPress={() => setIsMenuOpen(!isMenuOpen)}
                    />}
                    centerComponent={{text: 'RateScope', style: {color: '#fff', fontSize: 20}}}
                    rightComponent={<Icon name='home'
                                          onPress={() => navigation.navigate('Login')}
                                          size={30}/>}
                />

                <ScrollView contentContainerStyle={styles.container}>
                    {/*<Header*/}
                    {/*          leftComponent={<Icon name='menu'*/}
                    {/*                               onPress={() => this.props.navigation.openDrawer()}*/}
                    {/*                               size={30}/>}*/}
                    {/*          centerComponent={{text: 'RateScope', style: {color: '#fff', fontSize: 20}}}*/}
                    {/*          rightComponent={<Icon name='home'*/}
                    {/*                                onPress={() => navigation.navigate('Login')}*/}
                    {/*                                size={30}/>}*/}
                    {/*  />*/}

                    <Text style={styles.pageTitle}>Spending Overview</Text>

                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        containerStyle={styles.dropdownContainer}
                    />

                    <View style={styles.chartContainer}>
                        <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor}/>
                    </View>

                    <Text style={styles.totalPaymentText}>
                        Total Payment: ${calculateTotalPayment().toFixed(2)}
                    </Text>

                    <Button
                        buttonStyle={styles.startPlanningButton}
                        containerStyle={styles.buttonContainer}
                        icon={<Icon name='arrow-right' size={15} color='#006FFFFF'/>}
                        iconContainerStyle={{backgroundColor: '#00ff2a'}}
                        iconRight
                        onPress={() => navigation.navigate('Saving')}
                        title='Start Planning'
                        type='clear'
                    />

                    <Button
                        buttonStyle={styles.backButton}
                        containerStyle={styles.buttonContainer}
                        icon={<Icon name='arrow-left' size={15} color='#006FFFFF'/>}
                        iconContainerStyle={{backgroundColor: '#ff3d00'}}
                        iconRight
                        onPress={() => navigation.navigate('Spending')}
                        title='Go Back'
                        type='clear'
                    />
                </ScrollView>
            </View>
        </SideMenu>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',

        padding: 16,
    },
    pageTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    dropdownContainer: {
        width: '80%',
        marginVertical: 16,
    },
    chartContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
    startPlanningButton: {
        width: '100%',
    },
    backButton: {
        width: '100%',
    },
    buttonContainer: {
        marginVertical: 8,
    },
});

export default Overview;
