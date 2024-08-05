import { RocketIcon } from "lucide-react";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export function AlertDemo({title}) {
    return (
      <Alert>
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
    )
};

export default AlertDemo;
