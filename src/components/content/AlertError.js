import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert.jsx";
import { useEffect } from "react";

const AlertError = ({ isError, errorFunc, errorMsg }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      errorFunc(false);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [isError]);

  return (
    <div>
      <Alert
        className={isError ? `right-32 bottom-20` : "-right-32"}
        variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{errorMsg}</AlertDescription>
      </Alert>
    </div>
  );
};

export default AlertError;
