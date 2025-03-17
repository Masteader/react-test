import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    StyleSheet,
    FlatList,
} from "react-native";
import companyService from "../../services/companies";
import {
    getCoreAuthToken,
} from "../../services/storage.service";
import { resetNavigation } from "../../navigation/navigationRef";
import { Company } from "../../models/companies";
import { Picker } from "@react-native-picker/picker";
import workoutService from "../../services/workouts.service";
import { TokenDetails } from "../../models/user";
import { Button } from "react-native-paper";
import { useAuth } from "../../context/AuthContext";


const ProfileScreen = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const { logout } = useAuth(); // Get logout function from AuthContext
    const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");
    const [tokenDetails, settokenDetails] = useState<TokenDetails | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [selecting, setSelecting] = useState<boolean>(false);
    const [uniqueName, setUniqueName] = useState<String | null>(null);


    useEffect(() => {
        loadCompanies();

        getUserDetails();
    }, []);
    useEffect(() => {
        if (tokenDetails) {
            setUniqueName(tokenDetails.unique_name);
        }
    }, [tokenDetails]); // This ensures the code runs AFTER `tokenDetails` updates

    const getUserDetails = async () => {
        const details = await workoutService.getTokenDetails("portal");
        settokenDetails(details); // Updates state asynchronously
    }


    const loadCompanies = async () => {
        setLoading(true);
        try {
            // const token = await getAuthToken();
            // setAuthToken(token);

            const fetchedCompanies = await companyService.fetchCompanies();
            setCompanies(fetchedCompanies);

            const storedCompanyId = await getCoreAuthToken();

        } catch (error) {
            console.error("Error loading Companies:", error);
        }
        setLoading(false);
    };

    const handleCompanySelection = async (companyId: string) => {
        setSelecting(true);
        const success = await companyService.selectCompanyToken(companyId);
        if (success) {

            setSelectedCompanyId(companyId);
        }
        setSelecting(false);
    };

    const handleLogout = async () => {
        resetNavigation("Login"); // Navigate back to login screen
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Profile Section */}
            <View style={styles.profileSection}>
                <Image
                    source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s",
                    }}
                    style={styles.profileImage}
                />
                <View>
                    <Text style={styles.profileName}>{uniqueName ?? "av"}</Text>
                    <Text >Edit Profile</Text>
                </View>
            </View>

            {/* Coins & Pearls Section */}
            <View style={styles.walletContainer}>
                {/* Top Section - Coins & Pearls */}
                <View style={styles.walletTop}>
                    <View style={styles.walletDetails}>
                        <View style={styles.walletItem}>
                            <Text style={styles.coinIcon}>💰</Text>
                            <Text style={styles.walletText}>
                                <Text style={styles.walletAmount}>267</Text> coins
                            </Text>
                        </View>
                        <View style={styles.walletItem}>
                            <Text style={styles.pearlIcon}>💎</Text>
                            <Text style={styles.walletText}>
                                <Text style={styles.walletAmount}>987</Text> pearls
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Bottom Section - Top Up */}
                <View style={styles.walletBottom}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={styles.topUpText}>Top Up</Text>
                        <TouchableOpacity style={styles.topUpButton}>
                            <Text style={styles.bonusText}>Up to 100% bonus</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.arrowIcon}>➜</Text>
                </View>
            </View>

            <Text style={styles.profileName}>Choose Company</Text>
            {/* Dropdown for Selecting Company */}
            <Picker
                selectedValue={selectedCompanyId}
                style={styles.picker}
                onValueChange={(itemValue: string) => handleCompanySelection(itemValue)}
            >
                {companies.map((company: Company) => (
                    <Picker.Item key={company.id} label={company.name} value={company.id} />
                ))}
            </Picker>

            {/* Menu List */}
            <FlatList
                data={[
                    { icon: "⭐", title: "Rewards" },
                    { icon: "📩", title: "Message", badge: 3 },
                    { icon: "🔔", title: "Notification", badge: 8 },
                    { icon: "🏷️", title: "Coupon" },
                    { icon: "📖", title: "Recently viewed" },
                    { icon: "👍", title: "Following/Likes" },
                    { icon: "🛍️", title: "Purchase history" },
                ]}
                keyExtractor={(item) => item.title}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuIcon}>{item.icon}</Text>
                        <Text style={styles.menuText}>{item.title}</Text>
                        {item.badge && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{item.badge}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                )}
            />

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingHorizontal: 20,
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    profileName: {
        fontSize: 18,
        fontWeight: "bold",
    },
    editProfile: {
        fontSize: 18,
        fontWeight: "bold",
    },
    coinsContainer: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    coinsText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#f5a623",
    },
    pearlsText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#a623f5",
    },
    picker: {
        height: 50,
        backgroundColor: "white",
        marginVertical: 10,
        borderRadius: 8,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 8,
    },
    menuIcon: {
        fontSize: 20,
        marginRight: 10,
    },
    menuText: {
        fontSize: 16,
        flex: 1,
    },
    badge: {
        backgroundColor: "red",
        borderRadius: 15,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    badgeText: {
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
    },
    logoutButton: {
        backgroundColor: "red",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    logoutText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    walletContainer: {
        overflow: "hidden", // Prevents content overflow
        marginBottom: 15,
    },
    walletTop: {
        backgroundColor: "white",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
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
        fontWeight: "500",
        marginLeft: 5,
    },
    walletAmount: {
        fontWeight: "bold",
        fontSize: 18,
    },
    coinIcon: {
        fontSize: 20,
        color: "#f5a623",
    },
    pearlIcon: {
        fontSize: 20,
        color: "#a623f5",
    },
    walletBottom: {
        backgroundColor: "#8000ff",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    topUpButton: {
        backgroundColor: "white",
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 10,
        marginLeft: 10,
    },
    topUpText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
    },
    bonusText: {
        fontSize: 12,
        color: "#8000ff",
    },
    arrowIcon: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },
});

export default ProfileScreen;
