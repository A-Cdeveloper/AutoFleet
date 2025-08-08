import type { Vehicle } from "@/types/vehicle";
import type { ApiResponse, ApiError } from "@/types/api";
import { config } from "@/config/env";

export const fetchVehicles = async (): Promise<ApiResponse<Vehicle[]>> => {
  try {
    const response = await fetch(`${config.apiBaseUrl}/vehicles`);

    if (!response.ok) {
      const error: ApiError = {
        message: `Greška pri preuzimanju vozila!`,
        status: response.status,
      };
      return {
        data: null,
        error: error.message,
        success: false,
      };
    }

    const data = await response.json();
    return {
      data,
      error: null,
      success: true,
    };
  } catch (error) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : "Nepoznata greška",
      status: 0,
    };
    console.error("Greška pri preuzimanju vozila:", apiError);
    return {
      data: null,
      error: apiError.message,
      success: false,
    };
  }
};

export const fetchVehicleById = async (
  id: string
): Promise<ApiResponse<Vehicle>> => {
  try {
    const response = await fetch(`${config.apiBaseUrl}/vehicles/${id}`);

    if (!response.ok) {
      const error: ApiError = {
        message: `Greška pri preuzimanju vozila!`,
        status: response.status,
      };
      return {
        data: null,
        error: error.message,
        success: false,
      };
    }

    const data = await response.json();
    return {
      data,
      error: null,
      success: true,
    };
  } catch (error) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : "Nepoznata greška",
      status: 0,
    };
    console.error(`Greška pri preuzimanju vozila ${id}:`, apiError);
    return {
      data: null,
      error: apiError.message,
      success: false,
    };
  }
};

export const addVehicle = async (
  vehicle: Omit<Vehicle, "id">
): Promise<ApiResponse<Vehicle>> => {
  try {
    const response = await fetch(`${config.apiBaseUrl}/vehicles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...vehicle, services: [] }),
    });

    if (!response.ok) {
      const error: ApiError = {
        message: `Greška pri dodavanju vozila!`,
        status: response.status,
      };
      return {
        data: null,
        error: error.message,
        success: false,
      };
    }

    const data = await response.json();
    return {
      data,
      error: null,
      success: true,
    };
  } catch (error) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : "Nepoznata greška",
      status: 0,
    };
    console.error("Greška pri dodavanju vozila:", apiError);
    return {
      data: null,
      error: apiError.message,
      success: false,
    };
  }
};

export const editVehicle = async (
  id: string,
  vehicle: Omit<Vehicle, "id">
): Promise<ApiResponse<Vehicle>> => {
  try {
    const response = await fetch(`${config.apiBaseUrl}/vehicles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicle),
    });

    if (!response.ok) {
      const error: ApiError = {
        message: `Greška pri izmeni vozila!`,
        status: response.status,
      };
      return {
        data: null,
        error: error.message,
        success: false,
      };
    }

    const data = await response.json();
    return {
      data,
      error: null,
      success: true,
    };
  } catch (error) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : "Nepoznata greška",
      status: 0,
    };
    console.error(`Greška pri izmeni vozila ${id}:`, apiError);
    return {
      data: null,
      error: apiError.message,
      success: false,
    };
  }
};

export const deleteVehicle = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const response = await fetch(`${config.apiBaseUrl}/vehicles/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error: ApiError = {
        message: `Greška pri brisanju vozila!`,
        status: response.status,
      };
      return {
        data: null,
        error: error.message,
        success: false,
      };
    }

    return {
      data: null,
      error: null,
      success: true,
    };
  } catch (error) {
    const apiError: ApiError = {
      message: error instanceof Error ? error.message : "Nepoznata greška",
      status: 0,
    };
    console.error(`Greška pri brisanju vozila ${id}:`, apiError);
    return {
      data: null,
      error: apiError.message,
      success: false,
    };
  }
};
