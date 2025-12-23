import { API_URL } from "@/constants/api.constants";
import type { NewPropertyBuildType } from "@/lib/types";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios"

export const queryClient = new QueryClient();

export async function createNewProperty(propertyData: Omit<NewPropertyBuildType, "optionalSections">) {
    try {
        const res = await axios.post(API_URL + "/api/properties/create", propertyData, {
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