import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    containerbutton: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
      },
      item: {
        width: '50%', // is 50% of container width   
        textAlign: 'center'
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
        paddingLeft: 16
    },   
     scrollchoice: {
        marginLeft: 30,
        marginRight: 30,
        height: 48,
        borderRadius: 32,
        
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonActive: {
        backgroundColor: '#01aef0',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,
        height: 48,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: 'rgba(0,0,0, 0.2)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        flexDirection: 'row',
        elevation: 3 // Android     

    },
    buttonActiveSecond: {
        backgroundColor: '#ee008c',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,
        height: 48,
        borderRadius: 32,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: 'rgba(0,0,0, 0.4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        flexDirection: 'row',
        elevation: 5 // Android     

    },
    buttonInactive: {
        backgroundColor: '#FFFFFF',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 10,
        height: 48,
        borderWidth: 1,
        borderColor: '#01aef0',
        borderRadius: 32,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitleActive: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    buttonTitleInactive: {
        color: '#01aef0',
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
    },
    titre: {
        fontSize: 36,
        textAlign: 'center',
        color: '#01aef0',
        paddingBottom: 12
    },
    sousTitre: {
        fontSize: 24,
        textAlign: 'center',
        color: '#000000'
    }
})
