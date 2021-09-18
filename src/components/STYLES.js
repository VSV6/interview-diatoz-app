import { StatusBar, StyleSheet } from 'react-native'

const STYLES = StyleSheet.create({
    btn: {
        width: 100,
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: "5%",
    },
    btnItem: {
        borderColor: "#E2006A",
        borderRadius: 15,
        paddingHorizontal: "7%",
        paddingVertical: "5%",
    },
    container: {
        flex: 0.9,
        justifyContent: "center",
        paddingHorizontal: "5%",
    },
    itemContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    locationItem: {
        color: "#A4B8D3",
        fontSize: 13,
    },
    shiftsContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
})

export default STYLES