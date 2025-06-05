import { pink, primary } from "@/constants/Colors";
import { StyleSheet } from "react-native";

const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 20,
        paddingVertical: 15

    },
    heading: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    headingText: {
        color: pink,
        fontWeight: '600',
        fontFamily: 'bold', fontSize: 18,
    },
    headingStatus: {
        backgroundColor: "#e5f9ef",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    headingStatusText: {
        color: "#3ac677",
        fontFamily: "regular",
        fontWeight: '500'
    },
    profileHead: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    profileCircle: {
        backgroundColor: primary,
        borderWidth: 2,
        borderColor: pink,
        width: 80,
        height: 80,
        borderRadius: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    pcText: {
        color: "#fff",
        fontWeight: '600',
        fontSize: 35,
        fontFamily: 'bold',
        includeFontPadding: false,
        textAlignVertical: "center",
    },
    pcTextHead: {
        marginTop: 5,
        color: pink,
        fontSize: 18,
        fontWeight: '500',
        fontFamily: "bold"
    },
    label: {
        color: "#474747",
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'regular',
        marginTop: 4
    },
    info: {
        width: "100%",
        marginTop: 20
    },
    infoHead: {
        fontSize: 14,
        color: primary,
        fontWeight: '500',
        marginBottom: 10
    },
    form: {
        width: "100%",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 10
    },
    form_icon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "row",
        gap: 5,
        flex: 0.5,
    },
    pText: {
        color: "#474747",
        fontWeight: '400',
        fontFamily: "regular",
        textAlignVertical: "center",
        textAlign: "right",
        includeFontPadding: false,
        width: "60%"
    },
    utils: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginBottom: 10,
        paddingVertical: 5
    },
    utilsText: {
        color: "#474747",
        fontWeight: '500',
        fontFamily: "regular",
        textAlignVertical: "center",
        textAlign: "right",
        includeFontPadding: false,
        fontSize: 14
    },
    logout: {
        backgroundColor: "#e4e4e4",
        borderRadius: 5,
        height: 50,
        width: "100%",
        marginTop: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 5

    },
    logoutText: {
        color: "#474747",
        fontWeight: '500',
        fontFamily: "bold",
        textAlignVertical: "center",
        includeFontPadding: false,
        fontSize: 15
    },
     formGroup: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        marginBottom: 20,
    },
    labelz: {
        fontFamily: "regular",
        fontWeight: '500',
        color: "#434343",
        fontSize: 14,
        marginBottom: 10,
    },
    input: {
        width: "100%",
        borderColor: "#e4e4e4",
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: "#f8f8f8",
        borderRadius: 10,
    },
    login: {
        backgroundColor: "#002143",
        width: "100%",
        height: 50,
        borderRadius: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },


})

export default ProfileStyles