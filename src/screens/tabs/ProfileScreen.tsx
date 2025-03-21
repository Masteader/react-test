import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    FlatList,
    ScrollView,
} from "react-native";
import companyService from "../../services/companies";
import {
    getCoreAuthToken,
} from "../../services/storage.service";
import { Company } from "../../models/companies";
import { Picker } from "@react-native-picker/picker";
import workoutService from "../../services/workouts.service";
import { TokenDetails } from "../../models/user";
import { Surface } from "react-native-paper";
import { useAuth } from "../../context/AuthContext";
import userProfileStyle from "../../styles/styles.profile";


const ProfileScreen = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const { logout } = useAuth(); // Get logout function from AuthContext
    const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");
    const [tokenDetails, settokenDetails] = useState<TokenDetails | null>(null);
    const styles = userProfileStyle();
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

    // const handleLogout = async () => {
    //     resetNavigation("Login"); // Navigate back to login screen
    // };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Profile Section */}
            <Surface style={styles.profileSection}>
                <Image
                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlZ2vhLzIdtwpwXw90ZuWhngB-MdFsjD64CQ&s" }}
                    style={styles.profileImage}
                />
                <View>
                    <Text style={styles.profileName}>{uniqueName ?? "User"}</Text>
                    <TouchableOpacity>
                        <Text style={styles.editProfile}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </Surface>

            {/* Coins & Pearls Section */}
            <Surface style={styles.walletContainer}>
                <View style={styles.walletTop}>
                    <View style={styles.walletDetails}>
                        <View style={styles.walletItem}>
                            <Text style={styles.coinIcon}>💰</Text>
                            <Text style={styles.walletText}>
                                <Text style={styles.walletAmount}>1000</Text> Calories
                            </Text>
                        </View>
                        <View style={styles.walletItem}>
                            <Text style={styles.pearlIcon}>💎</Text>
                            <Text style={styles.walletText}>
                                <Text style={styles.walletAmount}>9999</Text> Steps
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Bottom Section - Top Up */}
                <View style={styles.walletBottom}>
                    <View style={styles.topUpContainer}>
                        <Text style={styles.topUpText}>Top Up</Text>
                        <TouchableOpacity style={styles.topUpButton}>
                            <Text style={styles.bonusText}>Discount up to 100% </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.arrowIcon}>➜</Text>
                </View>
            </Surface>

            {/* Company Selection */}
            <Text style={styles.sectionTitle}>Choose Company</Text>

            {companies.length > 0 ? (
                <Picker
                    selectedValue={selectedCompanyId}
                    style={styles.picker}
                    onValueChange={(itemValue: string) => handleCompanySelection(itemValue)}
                >
                    {companies.map((company: Company) => (
                        <Picker.Item key={company.id} label={company.name} value={company.id} />
                    ))}
                </Picker>
            ) : (
                <Text style={styles.noCompaniesText}>No Companies Available. Add One!</Text>
            )}


            {/* Menu List */}
            <FlatList
                nestedScrollEnabled={true}
                style={styles.menuList}
                data={[
                    { icon: "⭐", title: "Rewards" },
                    { icon: "📩", title: "Message", badge: 3 },
                    { icon: "🔔", title: "Notification", badge: 8 },
                    { icon: "🏷️", title: "Coupon", badge: 8 },
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
        </ScrollView>
    );


};


export default ProfileScreen;
