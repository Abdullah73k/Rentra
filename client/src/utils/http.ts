import { API_URL } from "@/constants/api.constants";
import type { patchTransactionSchema } from "@/lib/schemas";
import type {
  EditPropertyBuildType,
  FetchPropertyReturnType,
  NewPropertyBuildType,
  Transaction,
  WithId,
} from "@/lib/types";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import type z from "zod";

export const queryClient = new QueryClient();

export async function createNewProperty(
  propertyData: Omit<NewPropertyBuildType, "optionalSections">
) {
  try {
    const res = await axios.post(
      API_URL + "/api/properties/create",
      propertyData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    const { property } = res.data;
    return property;
  } catch (error) {
    throw new Error("An error occurred while creating the property");
  }
}
export async function fetchProperties(): Promise<
  WithId<NewPropertyBuildType["property"]>[]
> {
  try {
    const res = await axios.get(`${API_URL}/api/properties/all/`, {
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    throw new Error("An error occurred while fetching properties");
  }
}
export async function createNewTransaction(data: Transaction) {
  try {
    const res = await axios.post(
      API_URL + "/api/properties/create/transaction",
      { transactionDetails: data },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    throw new Error("An error occurred while creating the transaction");
  }
}
export async function fetchPropertyInfo(
  propertyId: string
): Promise<FetchPropertyReturnType> {
  try {
    const res = await axios.get(`${API_URL}/api/properties/${propertyId}`, {
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    throw new Error("An error occurred while fetching the property info");
  }
}
export async function editUserAvatar(data: File) {
  try {
    const formData = new FormData();
    formData.append("avatar", data);
    const res = await axios.patch(API_URL + "/api/user/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw new Error("An error occurred while updating the avatar");
  }
}
export async function editPropertyInfo(
  data: Omit<EditPropertyBuildType, "optionalSections">
) {
  try {
    const res = await axios.patch(
      API_URL + "/api/properties/update/" + data.property.id,
      data,
      {
        withCredentials: true,
      }
    );
    return res.data.data;
  } catch (error) {
    throw new Error("An error occurred while updating the property info");
  }
}
export async function editTransaction(
  data: z.input<typeof patchTransactionSchema>
) {
  try {
    const res = await axios.patch(
      API_URL + "/api/properties/update/transaction/" + data.id,
      data,
      {
        withCredentials: true,
      }
    );
    return res.data.data;
  } catch (error) {
    throw new Error("An error occurred while updating the transaction");
  }
}
export async function addOptionalData(
  option: "lease" | "tenant" | "loan",
  data: NewPropertyBuildType["lease" | "tenant" | "loan"],
  propertyId: string
) {
  try {
    await axios.post(
      `${API_URL}/api/properties/optional/${propertyId}?option=${option}`,
      data,
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    throw new Error("An error occurred while adding the optional data");
  }
}
export async function deleteTransaction(transactionId: string) {
  try {
    await axios.delete(API_URL + "/api/properties/delete/transaction/" + transactionId, {
      withCredentials: true,
    });
  } catch (error) {
    throw new Error("An error occurred while deleting the transaction");
  }
}
export async function deleteProperty(propertyId: string) {
  try {
    await axios.delete(API_URL + "/api/properties/delete/" + propertyId, {
      withCredentials: true,
    });
  } catch (error) {
    throw new Error("An error occurred while deleting the property");
  }
}