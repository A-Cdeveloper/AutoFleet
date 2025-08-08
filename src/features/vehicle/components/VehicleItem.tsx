import { Link } from "react-router-dom";
import React from "react";
import type { Vehicle } from "@/types/vehicle";
import { Headline } from "@/ui";
import { useAuthStore } from "@/store/authStore";

const VehicleContent = ({ vehicle }: { vehicle: Vehicle }) => (
  <>
    <Headline level={3}>{vehicle.marka}</Headline>
    <p>Model: {vehicle.model}</p>
    <p>Godina: {vehicle.godina}</p>
  </>
);

const VehicleItem = React.memo(({ vehicle }: { vehicle: Vehicle }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <div className="bg-white p-2 cursor-default">
        <VehicleContent vehicle={vehicle} />
      </div>
    );
  }

  return (
    <Link
      to={`/vehicles/${vehicle.id}`}
      className="bg-white p-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200 block"
      aria-label={`Pogledaj detalje za ${vehicle.marka} ${vehicle.model}`}
    >
      <VehicleContent vehicle={vehicle} />
    </Link>
  );
});

export default VehicleItem;
