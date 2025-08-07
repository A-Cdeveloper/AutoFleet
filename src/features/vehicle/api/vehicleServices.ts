import { config } from "../../../config/env";
import type { ApiError, ApiResponse } from "../../../types/api";

export const removeServiceFromVehicle = async (
  vehicleId: string,
  serviceId: string
): Promise<ApiResponse<string[]>> => {
  try {
    const res = await fetch(`${config.apiBaseUrl}/vehicles/${vehicleId}`);
    if (!res.ok) {
      return {
        data: null,
        error: "Greška pri pronalaženju vozila!",
        success: false,
      };
    }

    const vehicle = await res.json();

    const updatedServices = (vehicle.services ?? []).filter(
      (id: string) => id !== serviceId
    );

    const updateRes = await fetch(
      `${config.apiBaseUrl}/vehicles/${vehicleId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...vehicle,
          services: updatedServices,
        }),
      }
    );

    if (!updateRes.ok) {
      return {
        data: null,
        error: "Greška pri uklanjanju servisa iz vozila!",
        success: false,
      };
    }

    return {
      data: updatedServices,
      error: null,
      success: true,
    };
  } catch (err) {
    const apiError: ApiError = {
      message: err instanceof Error ? err.message : "Nepoznata greška",
      status: 0,
    };
    return {
      data: null,
      error: apiError.message,
      success: false,
    };
  }
};
