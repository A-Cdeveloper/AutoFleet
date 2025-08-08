import type { ApiResponse, ApiError } from "@/types/api";

import { config } from "@/config/env";
import type { Vehicle } from "@/types/vehicle";
import type { Service } from "@/types/service";

export const fetchServicesByVehicleId = async (
  vehicleId: string
): Promise<ApiResponse<Service[]>> => {
  try {
    //
    const vehicleRes = await fetch(
      `${config.apiBaseUrl}/vehicles/${vehicleId}`
    );
    if (!vehicleRes.ok) {
      const error: ApiError = {
        message: "Greška pri preuzimanju vozila",
        status: vehicleRes.status,
      };
      return { data: null, error: error.message, success: false };
    }

    const vehicle: Vehicle = await vehicleRes.json();

    //
    if (!vehicle.services || vehicle.services.length === 0) {
      return { data: [], error: null, success: true };
    }

    //
    const servicesRes = await fetch(`${config.apiBaseUrl}/services`);
    if (!servicesRes.ok) {
      const error: ApiError = {
        message: "Greška pri preuzimanju servisa",
        status: servicesRes.status,
      };
      return { data: null, error: error.message, success: false };
    }

    const allServices: Service[] = await servicesRes.json();

    //
    const vehicleServices = allServices.filter((service) =>
      vehicle.services.includes(service.id)
    );

    return { data: vehicleServices, error: null, success: true };
  } catch (error) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : "Nepoznata greška",
      status: 0,
    };
    return {
      data: null,
      error: apiError.message,
      success: false,
    };
  }
};
