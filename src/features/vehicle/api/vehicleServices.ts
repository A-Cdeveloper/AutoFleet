import { config } from "../../../config/env";
import type { ApiError, ApiResponse } from "../../../types/api";
import type { Service } from "../../../types/service";
import type { Vehicle } from "../../../types/vehicle";

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

export const addServiceToVehicle = async (
  vehicleId: string,
  serviceData: Omit<Service, "id">
): Promise<ApiResponse<Service>> => {
  try {
    // new service
    const serviceResponse = await fetch(`${config.apiBaseUrl}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serviceData),
    });

    if (!serviceResponse.ok) {
      const error: ApiError = {
        message: "Greška pri dodavanju servisa!",
        status: serviceResponse.status,
      };
      return {
        data: null,
        error: error.message,
        success: false,
      };
    }

    const newService: Service = await serviceResponse.json();

    // update vehicle
    const vehicleResponse = await fetch(
      `${config.apiBaseUrl}/vehicles/${vehicleId}`
    );
    if (!vehicleResponse.ok) {
      const error: ApiError = {
        message: "Greška pri pronalaženju vozila!",
        status: vehicleResponse.status,
      };
      return {
        data: null,
        error: error.message,
        success: false,
      };
    }

    const vehicle: Vehicle = await vehicleResponse.json();
    const updatedServices = [...(vehicle.services || []), newService.id];

    const updateResponse = await fetch(
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

    if (!updateResponse.ok) {
      const error: ApiError = {
        message: "Greška pri povezivanju servisa sa vozilom!",
        status: updateResponse.status,
      };
      return {
        data: null,
        error: error.message,
        success: false,
      };
    }

    return {
      data: newService,
      error: null,
      success: true,
    };
  } catch (error) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : "Nepoznata greška",
      status: 0,
    };
    console.error("Greška pri dodavanju servisa:", apiError);
    return {
      data: null,
      error: apiError.message,
      success: false,
    };
  }
};

export const editServiceInVehicle = async (
  serviceId: string,
  serviceData: Omit<Service, "id">
): Promise<ApiResponse<Service>> => {
  try {
    const serviceResponse = await fetch(
      `${config.apiBaseUrl}/services/${serviceId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      }
    );

    if (!serviceResponse.ok) {
      const error: ApiError = {
        message: "Greška pri ažuriranju servisa!",
        status: serviceResponse.status,
      };
      return {
        data: null,
        error: error.message,
        success: false,
      };
    }

    const updatedService: Service = await serviceResponse.json();

    return {
      data: updatedService,
      error: null,
      success: true,
    };
  } catch (error) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : "Nepoznata greška",
      status: 0,
    };
    console.error("Greška pri ažuriranju servisa:", apiError);
    return {
      data: null,
      error: apiError.message,
      success: false,
    };
  }
};
