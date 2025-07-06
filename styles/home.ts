import { StyleSheet } from "react-native";

const HomeStyles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",

    },
    heading: {
        width: "100%",
        marginBottom: 10
    },
    h1: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#834B12"
    },
    h2: {
        color: "#504B4B",
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5
    }, p: {
        color: "#474747",
        fontSize: 14,
        fontWeight: "400",
        fontFamily: "regular",
        lineHeight: 20,
        textAlign: "justify",
        includeFontPadding: false,
        textAlignVertical: "center",
    },
    p2: {
        color: "#a9a9a9",
        fontSize: 12,
        fontWeight: "400",
        fontFamily: "regular",
        lineHeight: 20,
        textAlign: "justify"
    },
    boxwrap: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
        gap: 10,
        marginBottom: 10
    },
    box: {
        borderColor: "#e4e4e4",
        borderWidth: 1,
        borderRadius: 10,
        flex: 0.5,
        height: 100,
        padding: 10
    },
    line: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    circle: {
        width: 30,
        height: 30,
        backgroundColor: "#A7774B",
        borderRadius: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    price: {
        fontWeight: "600",
        fontSize: 20,
        color: "#834B12",
        marginTop: 10
    },
    overview: {
        fontSize: 16,
        fontWeight: "600",
        color: "#002143",
        fontFamily: "bold",
        includeFontPadding: false,
        textAlignVertical: "center",
        marginVertical: 10

    },
    product: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#e4e4e4",
        padding: 8,
        borderRadius: 5,
        gap: 10,
        marginBottom: 10
    }, line2: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    line3: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 5
    },
    ptext: {
        color: "#834B12",
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "bold",
        lineHeight: 20,
    },
    sm: {
        fontSize: 13,
        color: "gray",
        fontFamily: "regular"
    },
    graph: {
        borderWidth: 1,
        borderColor: "#e4e4e4",
        borderRadius: 5,
        padding: 10,
        marginTop: 10
    }


})


export default HomeStyles