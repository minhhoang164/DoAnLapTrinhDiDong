import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, SafeAreaView } from 'react-native'
import React from 'react'

const CardSlider = ({ navigation, data }) => {
    const openProductHandler = (item) => {
        navigation.navigate('ProductScreen', item)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.cardouthead}>
                Thực đơn khuyến mãi hôm nay
            </Text>
            <SafeAreaView>
                <FlatList 
                    style={styles.flatliststyle}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card} onPress={() => openProductHandler(item)}>
                            <View>
                                <Image source={{ uri: item.FoodImageUrl }} style={styles.cardimage} />
                            </View>
                            <View style={styles.cardin1}>
                                <Text style={styles.cardin1txt}> {item.FoodName} </Text>
                                <View style={styles.cardin2}>
                                    <Text style={styles.cardin2txt1}>Thức ăn nhanh</Text>
                                    <Text style={styles.cardin2txt1}>
                                        Giá - <Text style={{ textDecorationLine: 'line-through' }}>100000</Text> <Text>{item.FoodPrice}</Text>
                                    </Text>
                                    <Text style={styles.cardin2txt3}>VND</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        </View>
    )
}

export default CardSlider

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingHorizontal: 5
    },
    cardouthead: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 10,
        paddingLeft: 5,
        color: '#424242'
    },
    cardimage: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
    },
    card: {
        width: 300,
        height: 200,
        marginLeft: 5,
        marginTop: 10,
        borderRadius: 17,
        backgroundColor: '#dedede',
    },
    cardin1: {
        marginHorizontal: 3,
        marginTop: 3
    },
    cardin1txt: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 5,
    },
    cardin2: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 6
    },
    cardin2txt1: {
        fontSize: 12,
        marginRight: 10,
        fontWeight: '500'
    },
    cardin2txt3: {
        height: 20,
        borderRadius: 10,
        backgroundColor: 'green',
        fontSize: 10,
        fontWeight: '500',
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        paddingHorizontal: 7
    }
})
