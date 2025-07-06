import { primary } from "@/constants/Colors";
import { StyleSheet } from "react-native";


const UpcomingStyle = StyleSheet.create({

    container: {
        padding: 20,
        width: "100%",
        height: "100%"
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
        justifyContent: "flex-start",
        flexDirection: "row",
        marginBottom: 16,
        gap: 5
    },
    status: {
        display: "flex",
        alignItems: "center",
        gap: 3,
        backgroundColor: "#A7774B",
        flexDirection: "row",
        paddingHorizontal: 6,
        paddingVertical: 5,
        borderRadius: 5
    },
    statusText: {
        color: "#fff",
        fontWeight: "500",
        fontSize: 12,
        fontFamily: "bold",
        textAlignVertical: "center",
        includeFontPadding: false
    },
    productList: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 10
    },
    product: {
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "row",
        gap: 10,

    },
    productTextWrap: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: 1,

    },
    h1: {
        width: "100%",
        color: "#834B12",
        fontWeight: '600',
        fontFamily: "bold",
        fontSize: 16,
        textTransform:"capitalize",
        includeFontPadding:false
    },
    h6: {
        color: "#504B4B",
        fontWeight: '500',
        fontFamily: "bold",
        fontSize: 13,
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 5
    },
    img2wrap: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: "#EBEBEB",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10,
        overflow: "hidden"

    },

    img2: {
        width: 35,
        height: 35,
        borderRadius: 50,
        objectFit: "fill",

    },
    agentWrap: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    h66: {
        color: "#979797",
        fontWeight: '400',
        fontFamily: "regular",
        fontSize: 12,
    },
    h4: {
        color: "#4A4A4A",
        fontWeight: '500',
        fontFamily: "bold",
        fontSize: 15,
        marginTop: 1
    },

    bar: {
        flex: 0.9,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: "#e4e4e4",
        marginVertical: 15

    },
    phone: {
        width: 28,
        height: 28,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E1E1E1"
    },


    last: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 15,
        borderTopWidth: 1,
        borderTopColor: "#e4e4e4",
        backgroundColor: "#fff",
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
    btn: {
        backgroundColor: "#834B12",
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5
    },
    btnText: {
        color: "#fff",
        fontFamily: "bold",
        fontWeight: '500',
        fontSize: 12
    }




})

export default UpcomingStyle