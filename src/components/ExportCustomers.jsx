import { Button } from '@mui/material';
import { useState } from 'react';

export default function ExportCustomers(api) {
    
    const getParams = () => {
        return{
            fileName: "customers.csv",
            columnKeys: [
                "firstname",
                "lastname",
                "streetaddress",
                "postcode",
                "city",
                "email",
                "phone"
            ]
        };
    }
    
    const exportCustomers = () => {
        api.gridApi.exportDataAsCsv(getParams());
    }

    return(
    <Button onClick={exportCustomers}>Export customer info</Button>
    );
}