import { pink, primary } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const DetailStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fafafa"
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
        fontSize: 14,
        color: "#474747",
        fontFamily: "regular",
        fontWeight: '500',
        marginBottom: 20
    },
    formwrap: {
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 5,
        elevation: 15,
        shadowColor: "rgba(0,0,0,0.2)",
        marginBottom: 20,
    },
    formwrap_text: {
        color: primary,
        fontFamily: "bold",
        fontWeight: '600',
        fontSize: 15,
        marginBottom: 10
    },
    formgroup: {
        marginBottom: 15,
        width: "100%"
    },
    label: {
        fontSize: 14,
        color: "#474747",
        fontFamily: "regular",
        fontWeight: "400",
        includeFontPadding: false,
        textAlignVertical: "center",

    },
    label2: {
        fontSize: 14,
        color: "#474747",
        fontFamily: "regular",
        fontWeight: "400",
        includeFontPadding: false,
        textAlignVertical: "center",
        marginTop:5

    },
        label2Active: {
        fontSize: 14,
        color: "#fff",
        fontFamily: "regular",
        fontWeight: "400",
        includeFontPadding: false,
        textAlignVertical: "center",
        marginTop:5

    },
    wrapText: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: 4
    },
    text: {
        fontSize: 14,
        color: "#474747",
        fontFamily: "regular",
        fontWeight: "400",
        includeFontPadding: false,
        textAlignVertical: "center",
        marginTop: 4,
        textTransform: "capitalize"
    },
    link: {
        fontSize: 15,
        color: "#14589f",
        fontFamily: "regular",
        fontWeight: "400",
        includeFontPadding: false,
        textAlignVertical: "center",
        marginTop: 3,
        width: "auto"
    },
    card: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#EFEFEF",
        padding: 10,
        borderRadius: 10,
        marginBottom: 15
    },
    cardImg: {
        width: 50,
        height: 50,
        borderRadius: 5
    },
    imagewrap: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    price: {
        color: pink,
        fontSize: 14,
        fontWeight: "600",
        fontFamily: "bold"
    },
    name: {
        color: pink,
        fontSize: 15,
        fontWeight: "600",
        fontFamily: "bold"
    },
    content: {
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
        gap: 5
    },
    total: {
        backgroundColor: "#EFEFEF",
        padding: 10,
        borderRadius: 5
    },
    totalText: {
        fontFamily: "bold",
        fontWeight: '500',
        fontSize: 14
    }, sm: {
        fontSize: 12,
        color: "#989898",
        fontFamily: "regular",
        fontWeight: "400",
        includeFontPadding: false,
        textAlignVertical: "center",
        marginTop: 8,
        textTransform: "capitalize"
    }, otp: {
        fontSize: 15,
        color: pink,
        fontFamily: "bold",
        fontWeight: "500",
        includeFontPadding: false,
        textAlignVertical: "center",
        marginTop: 15,
        textAlign: "center",
        textTransform: "capitalize"
    }, input: {
        backgroundColor: "#F9F9F9",
        height: 40,
        marginTop: 15,
        borderRadius: 5, paddingHorizontal: 10
    }, submit: {
        backgroundColor: primary,
        height: 50,
        marginTop: 10,
        width: "100%",
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    statusCard: {
        width: "100%",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: "#e4e4e4",
        marginBottom: 15
    },
    title: {
        color: primary,
        fontWeight: '500',
        fontSize: 15,
        fontFamily: 'bold',
        marginBottom:5
    },
    titleActive:{
          color: "#fff",
        fontWeight: '500',
        fontSize: 15,
        fontFamily: 'bold',
         marginBottom:5
    },
    
    statusCardActive:{
         width: "100%",
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: primary,
        marginBottom: 15,
        backgroundColor:"#002143"
    }


})

export default DetailStyle