import { useAuthStore } from "@/store/authStore";
import { loginSchema, type LoginFormData } from "@/types/auth";
import { Button, ErrorBoundary, FormErrorMessage, Input } from "@/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    const success = login(data.username, data.password);
    if (success) {
      toast.success("Uspešno ste se prijavili!");
      navigate("/");
    } else {
      setError("root", {
        type: "manual",
        message: "Pogrešno korisničko ime ili lozinka",
      });
    }
  };

  return (
    <ErrorBoundary>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 rounded-lg shadow-md w-full max-w-lg space-y-2"
      >
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              placeholder="Korisničko ime"
              autoFocus
              size="medium"
              aria-label="Korisničko ime"
              aria-describedby={errors.username ? "username-error" : undefined}
              aria-invalid={!!errors.username}
            />
          )}
        />
        <FormErrorMessage
          message={errors.username?.message}
          id="username-error"
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="password"
              placeholder="Lozinka"
              size="medium"
              aria-label="Lozinka"
              aria-describedby={errors.password ? "password-error" : undefined}
              aria-invalid={!!errors.password}
            />
          )}
        />
        <FormErrorMessage
          message={errors.password?.message}
          id="password-error"
        />

        <FormErrorMessage message={errors.root?.message} id="form-error" />

        <Button
          type="submit"
          variation="secondary"
          size="small"
          disabled={isSubmitting}
          className="w-full py-[10px]"
        >
          {isSubmitting ? "Prijavljivanje..." : "Prijavi se"}
        </Button>
      </form>
    </ErrorBoundary>
  );
}
