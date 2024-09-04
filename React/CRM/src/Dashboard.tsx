import React from 'react';
import { Card, CardContent, CardHeader } from "@mui/material";
import { usePermissions } from 'react-admin'; // Importa usePermissions

export const Dashboard = () => {
  const { permissions } = usePermissions(); // Usamos usePermissions para obtener los permisos del usuario

  return (
    <Card>
      <CardHeader title="Welcome..." />
      <CardContent>
        {permissions === 'admin' ? (
          <p>Welcome Admin! You have full access to the system.</p>
        ) : permissions === 'Donador' ? (
          <p>Welcome User! You have limited access.</p>
        ) : (
          <p>You do not have permissions to view this content.</p>
        )}
      </CardContent>
    </Card>
  );
};
