import { API_URL } from "@/constants/api.constants";
import type { NewPropertyBuildType } from "@/lib/types";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios"

export const queryClient = new QueryClient();

export async function createNewProperty(propertyData: Omit<NewPropertyBuildType, "optionalSections">) {
    try {
        const res = await axios.post(API_URL + "/api/properties/create", JSON.stringify(propertyData), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(res); // TODO: remove when getting ready for production

        const { property } = res.data;
        console.log(property); // TODO: remove when getting ready for production

        return property;
    } catch (error) {
        throw new Error("An error occurred while creating the property");
    }
}

export async function fetchProperties(userId: string): Promise<{}[]> {
    try {
        const res = await axios.get(`${API_URL}/api/properties/all/${userId}`);
        console.log(res); // TODO: remove when getting ready for production

        const { properties } = res.data;
        console.log(properties); // TODO: remove when getting ready for production

        return properties;
    } catch (error) {
        throw new Error("An error occurred while fetching properties");
    }
}