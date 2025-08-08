import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../ui/Button";
import Headline from "../../../ui/Headline";
import Spinner from "../../../ui/Spinner";
import ErrorMessage from "../../../ui/ErrorMessage";
import FormErrorMessage from "../../../ui/FormErrorMessage";
import ErrorBoundary from "../../../ui/ErrorBoundary";
import { useEditServiceInVehicle } from "../hooks/useEditServiceInVehicle";
import {
  serviceFormInputSchema,
  ServiceType,
  type ServiceFormInput,
} from "../../../types/service";
import Input from "../../../ui/Input";
import Select from "../../../ui/Select";
import Textarea from "../../../ui/TextArea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { Service } from "../../../types/service";

type EditVehicleServiceFormularProps = {
  service: Service;
  vehicleId: string;
  onCancel: () => void;
};

const EditVehicleServiceFormular = ({
  service,
  vehicleId,
  onCancel,
}: EditVehicleServiceFormularProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormInput>({
    resolver: zodResolver(serviceFormInputSchema),
    defaultValues: {
      datum: service.datum,
      tipServisa: service.tipServisa,
      opis: service.opis,
      cena: service.cena.toString(),
    },
  });

  const { editService, isPending, error } = useEditServiceInVehicle();

  const onSubmit = async (data: ServiceFormInput) => {
    await editService(
      {
        vehicleId,
        serviceId: service.id,
        serviceData: {
          datum: data.datum,
          opis: data.opis,
          cena: Number(data.cena),
          tipServisa: data.tipServisa,
        },
      },
      {
        onSuccess: () => {
          onCancel();
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
        className="bg-gray-300 p-4 rounded-md border my-0 space-y-4"
      >
        <Headline level={2}>Izmeni servis</Headline>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Controller
              name="datum"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) =>
                    field.onChange(date?.toISOString().split("T")[0])
                  }
                  dateFormat="dd.MM.yyyy"
                  minDate={new Date()}
                  placeholderText="Izaberi datum"
                  className="w-full border transition-colors duration-200 font-roboto px-2 py-1 text-xl h-[42px] focus:outline-none focus:ring-1 focus:ring-auto-secondary focus:ring-opacity-50"
                />
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
                  className="!w-40"
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
            onClick={onCancel}
          >
            Otkaži
          </Button>
          <Button
            type="submit"
            variation="primary"
            size="small"
            disabled={isPending}
          >
            {isPending ? "Čuvanje..." : "Sačuvaj izmene"}
          </Button>
        </div>
      </form>
    </ErrorBoundary>
  );
};

export default EditVehicleServiceFormular;
