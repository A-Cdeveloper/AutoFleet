import type { Service } from "../../../types/service";
import Button from "../../../ui/Button";
import ErrorBoundary from "../../../ui/ErrorBoundary";
import Headline from "../../../ui/Headline";
import useGetVehicleServices from "../hooks/useGetVehicleServices";
import VehicleService from "./VehicleService";
import { useState } from "react";

type VehicleServicesProps = {
  vehicleId: string;
};

const VehicleServices = ({ vehicleId }: VehicleServicesProps) => {
  const { data: services, isLoading, error } = useGetVehicleServices(vehicleId);
  const [showAddForm, setShowAddForm] = useState(false);

  if (isLoading) return <p>Učitavanje servisa...</p>;
  if (error) return <p>Greška: {error}</p>;

  let content = (
    <ul className="space-y-2">
      {services?.map((service: Service) => (
        <VehicleService
          key={service.id}
          service={service}
          vehicleId={vehicleId}
        />
      ))}
    </ul>
  );

  if (!services || services.length === 0)
    content = <p>Nema evidentiranih servisa za ovo vozilo.</p>;

  return (
    <ErrorBoundary>
      <div>
        <Headline level={2}>Lista servisa</Headline>
        {content}

        {showAddForm && (
          <div className="bg-gray-50 p-4 rounded-md border my-4">
            <h3 className="text-lg font-semibold mb-4">Dodaj novi servis</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Datum
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tip servisa
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Izaberi tip servisa</option>
                    <option value="redovni">Redovni servis</option>
                    <option value="kvar">Kvar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Opis
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Opis servisa..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cena
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  variation="secondary"
                  size="small"
                  onClick={() => setShowAddForm(false)}
                >
                  Otkaži
                </Button>
                <Button type="submit" variation="primary" size="small">
                  Dodaj servis
                </Button>
              </div>
            </form>
          </div>
        )}

        <div className="flex justify-end my-4 border-t py-4">
          <Button
            variation="secondary"
            size="small"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? "Otkaži" : "Dodaj servis"}
          </Button>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default VehicleServices;
