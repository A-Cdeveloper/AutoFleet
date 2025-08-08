import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { vehicleFormSchema, type VehicleFormData } from "@/types/vehicle";
import Button from "@/ui/Button";
import FormErrorMessage from "@/ui/FormErrorMessage";
import Headline from "@/ui/Headline";
import Input from "@/ui/Input";
import Spinner from "@/ui/Spinner";
import ErrorBoundary from "@/ui/ErrorBoundary";
import { useEditVehicle } from "@/features/vehicle/hooks/useEditVehicle";
import useGetVehicle from "@/features/vehicle/hooks/useGetVehicle";

const EditVehicleForm = ({ id }: { id: string }) => {
  const navigate = useNavigate();

  const {
    data: vehicle,
    isLoading: loadingVehicle,
    error: loadError,
  } = useGetVehicle(id || "");
  const {
    editExistingVehicle,
    isPending: editing,
    error: editError,
  } = useEditVehicle();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleFormSchema),
  });

  useEffect(() => {
    if (vehicle) {
      reset({
        marka: vehicle.marka,
        model: vehicle.model,
        godina: vehicle.godina.toString(),
        services: vehicle.services || [],
      });
    }
  }, [vehicle, reset]);

  const onSubmit = (data: VehicleFormData) => {
    if (!id) return;
    editExistingVehicle(
      {
        id,
        data: {
          ...data,
          godina: Number(data.godina),
          services: data.services || [],
        },
      },
      {
        onSuccess: () => navigate(`/vehicles/${id}`),
      }
    );
  };

  if (loadingVehicle) return <Spinner />;
  if (loadError) return <FormErrorMessage message={loadError} />;

  return (
    <ErrorBoundary>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Headline level={2}>Izmeni vozilo</Headline>

        <div>
          <Controller
            name="marka"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Marka vozila"
                size="medium"
              />
            )}
          />
          <FormErrorMessage message={errors.marka?.message} />
        </div>

        <div>
          <Controller
            name="model"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Model vozila"
                size="medium"
              />
            )}
          />
          <FormErrorMessage message={errors.model?.message} />
        </div>

        <div>
          <Controller
            name="godina"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                placeholder="Godina proizvodnje"
                size="medium"
              />
            )}
          />
          <FormErrorMessage message={errors.godina?.message} />
        </div>

        {editError && <FormErrorMessage message={editError} />}

        <div className="flex gap-4 justify-end">
          <Button
            type="submit"
            variation="primary"
            size="medium"
            disabled={isSubmitting || editing}
          >
            {editing ? "Čuvanje..." : "Sačuvaj izmene"}
          </Button>
          <Button
            type="button"
            variation="secondary"
            size="medium"
            onClick={() => navigate(`/vehicles/${id}`)}
          >
            Odustani
          </Button>
        </div>
      </form>
    </ErrorBoundary>
  );
};

export default EditVehicleForm;
