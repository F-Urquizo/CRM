import React from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { usePermissions } from "react-admin";

export const Dashboard = () => {
  const { permissions } = usePermissions();

  return (
    <Card>
      <CardHeader title="Bienvenido..." />
      <CardContent>
        {permissions === "Admin" ? (
          <p>Bienvenido Admin! Tienes acceso completo al sistema!</p>
        ) : permissions === "Donador" ? (
          <p>Bienvenido Donador! Gracias por tu donación!</p>
        ) : (
          <p>
            Bienvenido! Por favor contacta soporte si necesitas acceso a más
            componentes del sistema.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
