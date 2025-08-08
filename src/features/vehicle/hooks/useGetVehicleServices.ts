import { useQuery } from "@tanstack/react-query";
import type { Service } from "@/types/service";
import type { ApiResponse } from "@/types/api";
import { fetchServicesByVehicleId } from "@/features/services/api/servicesApi";

const useGetVehicleServices = (vehicleId: string) => {
  const {
    data: response,
    isLoading,
    error,
  } = useQuery<ApiResponse<Service[]>>({
    queryKey: ["vehicle-services", vehicleId],
    queryFn: () => fetchServicesByVehicleId(vehicleId),
    enabled: !!vehicleId,
  });

  const data = response?.success ? response.data : null;
  const apiError = response?.success === false ? response.error : null;

  return {
    data,
    isLoading,
    error: apiError || error?.message,
  };
};

export default useGetVehicleServices;
