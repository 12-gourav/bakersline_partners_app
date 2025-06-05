import { pink, primary } from "@/constants/Colors";
import { StyleSheet } from "react-native";


const OrderStyle = StyleSheet.create({

    container: {
        padding: 20,
        width: "100%",
        flex: 1
    },
    heading: {
        fontSize: 20,
        fontWeight: "600",
        color: "#002143",
        fontFamily: "bold",
        includeFontPadding: false,
        textAlignVertical: "center",
        marginVertical: 4
    },
    searchbar: {
        width: "88%",
        height: 45,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
       
        borderRadius: 5,

    },
    barInput: {
        flex: 0.85,
        height: 45,
        paddingHorizontal: 10

    },
    searchbtn: {
        flex: 0.15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: primary,
        height: 45,
        borderRadius: 5
    },
    search_wrapper: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height:45,
         marginTop: 20,
         gap:5
       
    },
    filterbtn: {
        width:"12%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D9D9D9",
        height: 45,
        borderRadius: 5
    },
    dis: {
        includeFontPadding: false,
        textAlignVertical: "center",
        fontSize: 13,
        color: "#474747",
        fontFamily: "regular",
    },
    card: {
        width: "100%",
        height: "auto",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 5,
        elevation: 15,
        shadowColor: "rgba(0,0,0,0.2)",
        position: "relative",
        marginBottom: 20
    },
    top: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingBottom: 10,
        zIndex: 999,
        backgroundColor: "#fff"
    },
    img: {
        width: 40,
        height: 40,
        borderRadius: 5
    },
    bar: {
        flex: 0.9,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: "#e4e4e4",
        paddingBottom: 5,

    },
    h1: {

        fontSize: 16,
        color: primary,
        fontFamily: "bold",
        fontWeight: "500",
        includeFontPadding: false,
        textAlignVertical: "center",
    },
    date: {
        includeFontPadding: false,
        textAlignVertical: "center",
        fontSize: 12,
        color: "#474747",
        fontFamily: "regular",
        marginTop: 4,
    },
    address: {

        display: 'flex',
        flexDirection: "row",
        gap: 10,
        alignItems: "center"

    },
    pin: {
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: "#E6F3FF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
    },
    pin2: {
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: "#E6F3FF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
    },
    p: {
        fontSize: 13,
        color: "#474747",
        fontFamily: "regular",
        fontWeight: "400",
        includeFontPadding: false,
        textAlignVertical: "center",
    },
    line: {
        position: "absolute",
        borderLeftWidth: 1,
        height: "60%",
        borderColor: "gray",
        left: 25,
        zIndex: 0,
        top: 20,
        borderStyle: "dashed"
    },
    last: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
        borderTopWidth: 1,
        borderTopColor: "#e4e4e4",
        backgroundColor: "#fff",
        zIndex: 999,
        paddingTop: 10,
        paddingBottom: 5
    },
    wrapText: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        verticalAlign: "middle"


    },
    ptext: {
        fontSize: 15,
        color: primary,
        fontFamily: "bold",
        fontWeight: "500",
        includeFontPadding: false,
        textAlignVertical: "center",
    },
    complete: {
        backgroundColor: "#e0e7ff",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
    },
    completeText: {
        color: "#615fff",
        fontSize: 13
    },
    cancel: {
        backgroundColor: "#fef2f2",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
    },
    cancelText: {
        color: "#fb2c36",
        fontSize: 13
    },
    rto: {
        backgroundColor: "#dcfce7",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
    },
    rtoText: {
        color: "#05df72",
        fontSize: 13
    }

})


export default OrderStyle