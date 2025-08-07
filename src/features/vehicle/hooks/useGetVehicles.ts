import { useQuery } from "@tanstack/react-query";
import { fetchVehicles } from "../api/vehicleApi";
import type { Vehicle } from "../../../types/vehicle";
import type { ApiResponse } from "../../../types/api";

const useGetVehicles = () => {
  const {
    data: response,
    isLoading,
    error,
  } = useQuery<ApiResponse<Vehicle[]>>({
    queryKey: ["vehicles"],
    queryFn: fetchVehicles,
  });

  const data = response?.success ? response.data : null;
  const apiError = response?.success === false ? response.error : null;

  return {
    data,
    isLoading,
    error: apiError || error?.message,
  };
};

export default useGetVehicles;
