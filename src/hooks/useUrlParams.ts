import { useSearchParams } from "react-router-dom";

export const useUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const marka = searchParams.get("marka") || "";
  const godiste = searchParams.get("godiste") || "";
  const model = searchParams.get("model") || "";

  const setCurrentParams = (params: URLSearchParams) => {
    setSearchParams(params);
  };

  return {
    marka,
    godiste,
    model,
    searchParams,
    setCurrentParams,
  };
};
