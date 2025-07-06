import { StyleSheet } from "react-native";

const onBoardingStyle = StyleSheet.create({

    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#FFF7F0"

    },
    
    container2: {
        width: "100%",
        height: "100%",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#fff"

    },


    image: {
        width: 300,
        height: 300,
       
    },
    heading: {
        fontFamily: "bold",
        fontSize: 20,
        color: "#834B12",
        fontWeight: '700',
        marginBottom: 10
    },
    text: {
        textAlign: "center",
        fontFamily: 'regular',
        fontWeight: '400',
        lineHeight: 20,
        color: "#474747",
        fontSize: 14
    },
    dotWrap: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20
    },
    dot: {
        width: 15,
        height: 15,
        borderRadius: 50,
        backgroundColor: "#e4e4e4"
    },
    activeDot: {
        width: 15,
        height: 15,
        borderRadius: 50,
        backgroundColor: "#834B12"
    },
    next: {
        marginTop: 100,
        backgroundColor: "#834B12",
        paddingHorizontal: 50,
        height: 50,
        borderRadius: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
    },
    nextText: {
        color: "#fff",
        fontWeight: '400',
        fontFamily: "regular",
        includeFontPadding: false,
        textAlignVertical: "center",
        fontSize: 16,

    }






})


export default onBoardingStyle