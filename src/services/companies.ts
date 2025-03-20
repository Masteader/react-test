import apiClient from "./api.service";
import { Company } from "../models/companies";
import { getCoreAuthToken, storeCoreAuthToken } from "./storage.service";


class CompanyService {

    async fetchCompanies(): Promise<Company[]> {
        try {
            const response = await apiClient.get(`portal/Company/get-user-companies`);

            return response.data.map((company: any) => new Company(company.id, company.name));
        } catch (error) {
            console.error("Fetch Companies Error:", error);
            return [];
        }
    }
    async selectCompanyToken(companyId: string): Promise<boolean> {
        try {
            const response = await apiClient.get(`portal/Authentication/get-token/${companyId}`);

            if (response.data.isSuccess) {
                await storeCoreAuthToken(response.data.accessToken);

                console.log("Company selected, new token:", response.data.accessToken);
                const getsCompanyToken = await getCoreAuthToken();
                console.log("Saved Company new token ", getsCompanyToken);

                return true;
            } else {
                console.error("Failed to select/get company token:", response.data);
                return false;
            }
        } catch (error) {
            console.error("Company Token selection error:", error);
            return false;
        }
    }
}

// Export Singleton Instance
const companyService = new CompanyService();
export default companyService;
