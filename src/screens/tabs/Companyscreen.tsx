import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { Company } from "../../models/companies";
import { resetNavigation } from "../../navigation/navigationRef";
import companyService from "../../services/companies";
import { getCompanyToken, storeCompanyToken } from "../../services/storage.service";

const CompanyScreen = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selecting, setSelecting] = useState<string | null>(null);

    useEffect(() => {
        loadCompanies();
    }, []);

    const loadCompanies = async () => {
        setLoading(true);
        try {
            const fetchedCompanies = await companyService.fetchCompanies();
            setCompanies(fetchedCompanies);

            const storedCompanyId = await getCompanyToken();
            console.log("Stored Company ID:", storedCompanyId);
            setSelectedCompanyId(storedCompanyId);
        } catch (error) {
            console.error("Error loading companies:", error);
        }
        setLoading(false);
    };

    const handleCompanySelection = async (companyId: string) => {
        setSelecting(companyId);
        const success = await companyService.selectCompany(companyId);

        if (success) {
            setSelectedCompanyId(companyId);
        }

        setSelecting(null);
    };



    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select a Company</Text>
            <FlatList
                data={companies}
                keyExtractor={(item) => item.id.toString()} // Ensure key is a string
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.companyItem,
                            selectedCompanyId === item.id.toString() && styles.selectedCompany,
                        ]}
                        onPress={() => handleCompanySelection(item.id.toString())}
                        disabled={selecting === item.id.toString()}
                    >
                        <Text style={styles.companyText}>{item.name}</Text>
                        {selecting === item.id.toString() && (
                            <ActivityIndicator size="small" color="white" />
                        )}
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text >No companies found.</Text>}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    companyItem: {
        padding: 15,
        backgroundColor: "#007bff",
        marginVertical: 5,
        borderRadius: 8,
        alignItems: "center",
    },
    selectedCompany: {
        backgroundColor: "#28a745",
    },
    companyText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default CompanyScreen;
