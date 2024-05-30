import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList } from 'react-native';
import { firebase } from '../Firebase/FirebaseConfig';
import { AuthContext } from '../Context/AuthContext';
import TrackOrderItems from '../Components/TrackOrderItems';

const TrackOrderScreen = ({ navigation }) => {
  const { userloggeduid } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [foodDataAll, setFoodDataAll] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const ordersRef = firebase.firestore().collection('UserOrders').where('userid', '==', userloggeduid);
      ordersRef.onSnapshot(snapshot => {
        setOrders(snapshot.docs.map(doc => doc.data()));
      });
    };
    getOrders();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const foodRef = firebase.firestore().collection('FoodData');
      foodRef.onSnapshot(snapshot => {
        setFoodDataAll(snapshot.docs.map(doc => doc.data()));
      });
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#FF3F00', paddingVertical: 15, paddingHorizontal: 15, marginTop: 30 }}>
        <TouchableOpacity>
          <Text style={{ color: 'white' }}>Close</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.mainContainer}>
            <Text style={styles.orderId}>Mã đơn: {(item.orderid).substring(0, 15)}</Text>
            <Text style={styles.orderTime}>Thời gian: 4:10 AM </Text>
            <TrackOrderItems foodDataAll={foodDataAll} data={item.orderid} navigation={navigation} />
            <Text style={styles.orderTotal}>Tổng tiền : {item.ordercost} VND</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TrackOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    marginBottom: 10,
    marginHorizontal: 10,
    elevation: 2,
    backgroundColor: 'white',
    paddingVertical: 5,
    borderRadius: 20,
  },
  orderId: {
    fontSize: 16,
    color: 'grey',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#d9d9d9',
    paddingVertical: 5,
  },
  orderTime: {
    paddingHorizontal: 6,
    paddingVertical: 5,
  },
  orderTotal: {
    fontSize: 17,
    textAlign: 'right',
    marginVertical: 5,
    marginRight: 20,
    fontWeight: '600',
  },
});
