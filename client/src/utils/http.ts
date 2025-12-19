import { API_URL } from "@/constants/api.constants";
import type { NewPropertyBuildType } from "@/lib/types";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function createNewProperty(propertyData: Omit<NewPropertyBuildType, "optionalSections">) {
    const res = await fetch(API_URL + "/api/properties/create", {
        method: "POST",
        body: JSON.stringify(propertyData),
        headers: {
            "Content-Type": "application/json",
        },
    })
    console.log(res); // TODO: remove when getting ready for production

    if (!res.ok) {
        const error = new Error("An error occurred while creating the property");
        throw error;
    }

    const { property } = await res.json();
    console.log(property);// TODO: remove when getting ready for production

    return property;
}