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
    console.log(res);
    

    if (!res.ok) {
        const error = new Error("An error occurred while creating the event");
        throw error;
    }

    const { event } = await res.json();
    console.log(event);
    

    return event;
}