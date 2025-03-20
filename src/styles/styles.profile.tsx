import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const userProfileStyle = () => {
    const theme = useTheme();

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
            paddingHorizontal: 16,
            paddingTop: 10,
        },
        profileSection: {
            flexDirection: "row",
            alignItems: "center",
            padding: 15,
            borderRadius: 12,
            backgroundColor: theme.colors.surface,
            shadowColor: theme.colors.shadow,
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 3 },
            shadowRadius: 5,
            elevation: 3,
            marginBottom: 12,
        },
        profileImage: {
            width: 70,
            height: 70,
            borderRadius: 35,
            marginRight: 15,
            borderWidth: 2,
            borderColor: theme.colors.primary,
        },
        profileName: {
            fontSize: 20,
            fontWeight: "bold",
            color: theme.colors.onBackground,
        },
        editProfile: {
            fontSize: 14,
            fontWeight: "bold",
            color: theme.colors.primary,
            marginTop: 4,
        },

        /** Wallet / Coins Section */
        walletContainer: {
            overflow: "hidden",
            borderRadius: 15,
            shadowColor: theme.colors.shadow,
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 6,
            elevation: 4,
            marginBottom: 12,
        },
        walletTop: {
            backgroundColor: theme.colors.surface,
            padding: 15,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
        },
        walletDetails: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        walletItem: {
            flexDirection: "row",
            alignItems: "center",
        },
        walletText: {
            fontSize: 16,
            fontWeight: "600",
            marginLeft: 6,
            color: theme.colors.onSurface,
        },
        walletAmount: {
            fontWeight: "bold",
            fontSize: 18,
        },
        coinIcon: {
            fontSize: 22,
            color: theme.colors.primary,
        },
        pearlIcon: {
            fontSize: 22,
            color: theme.colors.secondary,
        },
        walletBottom: {
            backgroundColor: theme.colors.primary,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 15,
            paddingHorizontal: 20,
        },
        topUpContainer: {
            flexDirection: "row",
            alignItems: "center",
        },
        topUpButton: {
            backgroundColor: theme.colors.onPrimary,
            borderRadius: 20,
            paddingHorizontal: 14,
            paddingVertical: 8,
            marginLeft: 10,
        },
        topUpText: {
            fontSize: 14,
            fontWeight: "bold",
            color: theme.colors.onPrimary,
        },
        bonusText: {
            fontSize: 12,
            color: theme.colors.primary,
        },
        arrowIcon: {
            fontSize: 22,
            color: theme.colors.onPrimary,
            fontWeight: "bold",
        },

        /** Company Selection */
        sectionTitle: {
            fontSize: 18,
            fontWeight: "bold",
            color: theme.colors.onBackground,
            marginBottom: 6,
        },
        picker: {
            height: 50,
            backgroundColor: theme.colors.surface,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: theme.colors.outline,
            paddingHorizontal: 12,
            color: theme.colors.onSurface,
            marginBottom: 12,
        },
        noCompaniesText: {
            fontSize: 16,
            color: theme.colors.onBackground,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 10,
            padding: 10,
            backgroundColor: theme.colors.onBackground,
            borderRadius: 5,
        },

        /** Menu List */
        menuList: {
            paddingBottom: 20,
        },
        menuItem: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.colors.surface,
            padding: 15,
            borderRadius: 12,
            marginBottom: 10,
        },
        menuIcon: {
            fontSize: 22,
            marginRight: 12,
            color: theme.colors.primary,
        },
        menuText: {
            fontSize: 16,
            flex: 1,
            color: theme.colors.onSurface,
        },
        badge: {
            backgroundColor: theme.colors.error,
            borderRadius: 15,
            paddingHorizontal: 8,
            paddingVertical: 2,
        },

        /** Logout Button */
        logoutButton: {
            backgroundColor: theme.colors.primary,
            padding: 15,
            borderRadius: 12,
            alignItems: "center",
            marginTop: 20,
        },
        logoutText: {
            color: theme.colors.onPrimary,
            fontSize: 16,
            fontWeight: "bold",
        },
        badgeText: {
            color: theme.colors.onError,
            fontSize: 14,
            fontWeight: "bold",
        },
        loaderContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.background, // Match the theme background
        },
    });
};

export default userProfileStyle;
