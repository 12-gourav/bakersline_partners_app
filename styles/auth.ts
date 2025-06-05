import { StyleSheet } from "react-native";

const AuthStyles = StyleSheet.create({
    wrapper: {
        flex:1,
        display: "flex",
        flexDirection: "column",
        padding: 20,
       
    },
    brand: {
        color: "#000",
        fontWeight: "600",
        fontSize: 20,
        fontFamily: "bold",
        textAlign: "center",
        includeFontPadding: false,
        textAlignVertical: "center",
        marginTop:10
    },
    brand2: {
         color: "#434343",
        fontSize: 14,
        fontWeight: "400",
        fontFamily: "regular",
        textAlign: "center",
        includeFontPadding: false,
        textAlignVertical: "center",
        marginTop:5,
        marginBottom:20,
        lineHeight:20
    },
    toggleWrap: {
        width: "100%",
        height: 50,
        display: "flex",
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20,
         backgroundColor: "#f8f8f8",
         borderRadius:50
    },
    toggleWrapLeft: {
        width: "50%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
    },
    toggleWrapLeftActive: {
        width: "50%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#A7774B",
        borderRadius: 50,
    },
    textActive: {
        color: "#fff",
        fontWeight: '600',
        fontSize: 16,
        fontFamily: "bold",
        textAlign: "center",
        includeFontPadding: false,
        textAlignVertical: "center",
    },

    text: {
        fontWeight: '500',
        fontSize: 16,
        fontFamily: "regular",
        textAlign: "center",
        includeFontPadding: false,
        textAlignVertical: "center",
    },

    toggleWrapRight: {
        width: "50%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
    },
        toggleWrapRightActive: {
        width: "50%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#A7774B",
        borderRadius: 50,
    },

    formGroup: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        marginBottom: 20,
    },
    label: {
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
        borderRadius: 50,
    },
    login: {
        backgroundColor: "#A7774B",
        width: "100%",
        height: 50,
        borderRadius: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    link:{
         color: "#434343",
         fontSize:14,
         fontFamily:'regular',
         fontWeight:400,
         marginBottom:8,
          includeFontPadding: false,
        textAlignVertical: "center",
    },
    uploader:{
        width:"100%",
        borderColor:"#e4e4e4",
        borderWidth:1,
        padding:10,
        borderRadius:10,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        gap:10
    },
    uploaderText:{
       fontFamily: "regular",
        fontWeight: '500',
        color: "#434343",
        fontSize:12,
        textAlign:"center",
        lineHeight:20
    },
    icon:{
        color:"#002143"
    }


});

export default AuthStyles;
