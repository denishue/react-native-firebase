import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 308,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 32,
        borderColor: '#01aef0',
        borderWidth: 1,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        minWidth:'50%'
    },
    button: {
        backgroundColor: '#01aef0',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: 'rgba(0,0,0, 0.9)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        flexDirection: 'row',
        elevation: 5 // Android  
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#01aef0",
        fontWeight: "bold",
        fontSize: 16
    }
})
