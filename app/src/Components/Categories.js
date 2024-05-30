import { StatusBar } from "expo-status-bar";
import { Image, TouchableOpacity, FlatList, StyleSheet, Text, View } from "react-native";
import React from 'react';

const Categories = () => {
    const data = [
        { id: '1', name: 'Pizza', image: require('../Images/icon_1.png'), backgroundColor: '#ddfbf3' },
        { id: '2', name: 'Burger', image: require('../Images/icon_2.png'), backgroundColor: '#f5e5ff' },
        { id: '3', name: 'Noodles', image: require('../Images/icon_3.png'), backgroundColor: '#e5f1ff' },
        { id: '4', name: 'Drink', image: require('../Images/icon_4.png'), backgroundColor: '#ebfde5' },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={[styles.box, { backgroundColor: item.backgroundColor }]}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.head}>Categories</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

export default Categories;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 10
    },
    head: {
        fontSize: 20,
        fontWeight: '600',
        margin: 10,
        paddingBottom: 5,
        paddingLeft: 5
    },
    image: {
        width: 20,
        height: 20
    },
    box: {
        flexDirection: 'row',
        marginLeft: 10,
        marginBottom: 15,
        padding: 10,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2
    },
    text: {
        marginLeft: 5,
    }
});
