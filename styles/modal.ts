import { pink, primary } from "@/constants/Colors";
import { StyleSheet } from "react-native";


const ModalStyle = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        padding: 10,
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        width: "100%",
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 10
    },

    heading: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 15
    },
    headingText: {
        color: primary,
        fontFamily: 'bold',
        fontWeight: '600',
        fontSize: 16,
        textAlignVertical: 'center',
        includeFontPadding: false
    },
    form: {
        marginBottom: 15
    },
    formText: {
        color: primary,
        fontFamily: 'regular',
        fontWeight: '500',
        fontSize: 14,
        textAlignVertical: 'center',
        includeFontPadding: false,
        marginBottom: 10
    },

    group: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 10
    },
    date: {
        borderColor: "#e4e4e4",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        display: 'flex',
        flexDirection: "row",
        justifyContent: "flex-start", alignItems: "center",
        flex: 0.5,
        gap: 10
    },
    tabs: {
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        gap: 10,
        marginTop: 5
    },
    tabItem: {
        backgroundColor: "#fff",
        paddingHorizontal: 22,
        paddingVertical: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        height: 40,
        borderWidth: 1,
        borderColor: "#e4e4e4",


    },
    tabItemActive: {
        backgroundColor: primary,
        paddingHorizontal: 22,
        paddingVertical: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        height: 40,
    },
    tabItemText: {
        color: "#474747",
        fontFamily: 'regular',
        fontWeight: '500',
        fontSize: 14,
        textAlignVertical: 'center',
        includeFontPadding: false,
        textTransform: "capitalize",
        width: "100%",
    },
    tabItemTextActive: {
        color: "#fff",
        fontFamily: 'bold',
        fontWeight: '600',
        fontSize: 14,
        textAlignVertical: 'center',
        includeFontPadding: false,
        textTransform: "capitalize",
        width: "100%",
    },
    clear: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#e4e4e4",
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        marginTop: 20
    },
    clearText: {
        color: "#474747",
        fontFamily: 'bold',
        fontWeight: '600',
        fontSize: 16,
        textAlignVertical: 'center',
        includeFontPadding: false
    },


    apply: {
        width: "100%",
        height: 50,
        backgroundColor: primary,
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    applyText: {
        color: "#fff",
        fontFamily: 'bold',
        fontWeight: '600',
        fontSize: 16,
        textAlignVertical: 'center',
        includeFontPadding: false
    }
})

export default ModalStyle