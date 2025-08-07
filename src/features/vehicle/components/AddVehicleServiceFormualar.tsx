import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../ui/Button";
import Headline from "../../../ui/Headline";
import Spinner from "../../../ui/Spinner";
import ErrorMessage from "../../../ui/ErrorMessage";
import FormErrorMessage from "../../../ui/FormErrorMessage";
import ErrorBoundary from "../../../ui/ErrorBoundary";
import { useAddServiceToVehicle } from "../hooks/useAddServiceToVehicle";
import {
  serviceFormInputSchema,
  ServiceType,
  type ServiceFormInput,
} from "../../../types/service";
import Input from "../../../ui/Input";
import Textarea from "../../../ui/TextArea";
import Select from "../../../ui/Select";

const AddVehicleServiceFormular = ({
  setShowAddForm,
  vehicleId,
}: {
  setShowAddForm: (show: boolean) => void;
  vehicleId: string;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ServiceFormInput>({
    resolver: zodResolver(serviceFormInputSchema),
    defaultValues: {
      datum: new Date(Date.now() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      tipServisa: ServiceType.REDOVNI,
      opis: "",
      cena: "",
    },
  });

  const { addNewService, isPending, error } = useAddServiceToVehicle();

  const onSubmit = async (data: ServiceFormInput) => {
    await addNewService(
      {
        vehicleId,
        serviceData: {
          datum: data.datum,
          opis: data.opis,
          cena: Number(data.cena),
          tipServisa: data.tipServisa,
        },
      },
      {
        onSuccess: () => {
          reset();
          setShowAddForm(false);
        },
      }
    );
  };

  if (isPending) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <ErrorBoundary>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-50 p-4 rounded-md border my-4 space-y-4"
      >
        <Headline level={2}>Dodaj novi servis</Headline>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Controller
              name="datum"
              control={control}
              render={({ field }) => (
                <Input {...field} type="date" size="medium" />
              )}
            />
            <FormErrorMessage message={errors.datum?.message} />
          </div>

          <div>
            <Controller
              name="tipServisa"
              control={control}
              render={({ field }) => (
                <Select {...field} size="medium">
                  <option value={ServiceType.REDOVNI}>Redovni servis</option>
                  <option value={ServiceType.KVAR}>Kvar</option>
                </Select>
              )}
            />
            <FormErrorMessage message={errors.tipServisa?.message} />
          </div>
        </div>

        <div>
          <Controller
            name="opis"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                rows={3}
                placeholder="Opis servisa..."
                size="medium"
              />
            )}
          />
          <FormErrorMessage message={errors.opis?.message} />
        </div>

        <div>
          <Controller
            name="cena"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Cena:</span>
                <Input
                  {...field}
                  type="number"
                  step="0.01"
                  size="medium"
                  className="w-40"
                />
                <span className="text-gray-500">RSD</span>
              </div>
            )}
          />
          <FormErrorMessage message={errors.cena?.message} />
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variation="secondary"
            size="small"
            onClick={() => setShowAddForm(false)}
          >
            Zatvori
          </Button>
          <Button
            type="submit"
            variation="primary"
            size="small"
            disabled={isPending}
          >
            {isPending ? "Dodavanje..." : "Dodaj servis"}
          </Button>
        </div>
      </form>
    </ErrorBoundary>
  );
};

export default AddVehicleServiceFormular;
