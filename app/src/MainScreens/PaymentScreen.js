import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { firebase } from '../Firebase/FirebaseConfig';

const PaymentScreen = ({ navigation }) => {
    const { userloggeduid } = useContext(AuthContext);
    const [cartdata, setCartdata] = useState(null);
    const [totalCost, setTotalCost] = useState('0');
    const [updatedCartData, setUpdatedCartData] = useState(null);

    useEffect(() => {
        cardDataHandler();
    }, []);

    const cardDataHandler = async () => {
        const docref = firebase.firestore().collection('UserCart').doc(userloggeduid);
        try {
            const doc = await docref.get();
            if (doc.exists) {
                setCartdata(doc.data());
                setTotalCost(doc.data().cartItems.reduce((sum, item) => sum + parseInt(item.totalFoodPrice), 0).toString());
            } else {
                console.log('there is no data');
            }
        } catch (error) {
            console.log('Error', error);
        }
    };

    const deleteCart = async () => {
        const docRef = firebase.firestore().collection('UserCart').doc(userloggeduid);
        const docSnapshot = await docRef.get();
        if (docSnapshot.exists) {
            await docRef.delete();
            console.log('Document successfully deleted.');
        } else {
            console.log('Document does not exist.');
        }
    };

    const addingSomedata = (docid, date) => {
        if (cartdata !== null) {
            const updatedData = { ...cartdata };
            updatedData.cartItems.forEach((item) => {
                item.orderId = docid;
                item.orderDate = date;
            });
            setUpdatedCartData(updatedData);
        }
    };

    const PlaceNow = async () => {
        const cDate = new Date().getTime().toString();
        const docid = new Date().getTime().toString() + userloggeduid;

        const orderdatadoc = firebase.firestore().collection('UserOrders').doc(docid);
        const orderitemstabledoc = firebase.firestore().collection('OrderItems').doc(docid);

        await addingSomedata(docid, cDate);

        if (updatedCartData !== null) {
            try {
                await orderitemstabledoc.set({ ...updatedCartData });
                await orderdatadoc.set({
                    orderid: docid,
                    orderstatus: 'Pending',
                    ordercost: totalCost,
                    orderdate: new Date().getTime().toString(),
                    userid: userloggeduid,
                    userpayment: 'COD',
                    paymenttotal: ''
                });

                await deleteCart();
                alert('Đặt hàng thành công.');
                navigation.navigate('HomeScreen');
            } catch (error) {
                console.log('Đặt hàng thất bại:', error);
                alert('Đặt hàng thất bại, vui lòng thử lại');
            }
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={{ backgroundColor: '#FF3F00', paddingVertical: 15, paddingHorizontal: 15, marginTop: 30 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 16, color: 'white' }}>Close</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: '600', paddingVertical: 10, paddingHorizontal: 15 }}>Phương thức thanh toán</Text>
                    <TouchableOpacity style={{ backgroundColor: '#FF3F00', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginHorizontal: 10 }} onPress={() => { alert('Selected') }}>
                        <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>Phí vận chuyển</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ paddingBottom: 30 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', paddingVertical: 10, paddingHorizontal: 15 }}>Địa điểm vận chuyển</Text>
                    <TouchableOpacity style={{ backgroundColor: '#FF3F00', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginHorizontal: 10 }} onPress={() => { alert('Selected') }}>
                        <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>Vị Trí hiện tại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#FF3F00', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginHorizontal: 10, marginTop: 10 }} onPress={() => { alert('Selected') }}>
                        <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>Đổi vị trí</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ paddingTop: 10, borderTopWidth: 1, borderColor: '#c9c9c9' }}>
                    <TouchableOpacity style={{ backgroundColor: '#FF3F00', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginHorizontal: 10, marginTop: 10, alignItems: 'center' }} onPress={() => PlaceNow()}>
                        <Text style={{ fontSize: 17, fontWeight: '500', color: 'white' }}>Đặt hàng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default PaymentScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#edeef0',
        width: '100%',
    },
});
