import { useState } from "react";
import { toast } from "react-toastify";

interface UsePostProps {
  url: string;
}

export const usePost = ({ url }: UsePostProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitData = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      toast.success("Success");
      return data;
    } catch (error) {
      toast.error("Error");
      setError(error instanceof Error ? error : new Error("Unknown error"));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitData, isLoading, error };
};
