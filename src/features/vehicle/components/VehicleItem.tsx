import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import React from "react";
import type { Vehicle } from "@/types/vehicle";
import { Button, Headline } from "@/ui";
import { useAuthStore } from "@/store/authStore";

const VehicleItem = React.memo(({ vehicle }: { vehicle: Vehicle }) => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleNavigate = useCallback(() => {
    navigate(`/vehicles/${vehicle.id}`);
  }, [navigate, vehicle.id]);

  return (
    <div className=" bg-white p-2">
      <Headline level={3}>{vehicle.marka}</Headline>

      <p>Model: {vehicle.model}</p>
      <p>Godina: {vehicle.godina}</p>
      {isAuthenticated && (
        <div className="flex justify-end">
          <Button
            size="small"
            variation="secondary"
            className="py-[4px]"
            onClick={handleNavigate}
            aria-label={`Pogledaj detalje za ${vehicle.marka} ${vehicle.model}`}
          >
            Detalji
          </Button>
        </div>
      )}
    </div>
  );
});

export default VehicleItem;
