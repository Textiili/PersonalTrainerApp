import React, { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import ExportCustomers from './ExportCustomers';
import DeleteIcon from '@mui/icons-material/Delete';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function CustomerList() {

    const [customers, setCustomers] = useState([]);
    const [gridApi, setGridApi] = useState(null);

    useEffect(() => {
        fetchCustomers();
    },[]);

    const onGridReady = (params) => {
        setGridApi(params.api);
    }

    const [columnDefs] = useState([
        {field: 'firstname', headerName: 'First Name', sortable: true, filter: true},
        {field: 'lastname', headerName: 'Last Name', sortable: true, filter: true},
        {field: 'streetaddress', headerName: 'Street Address', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {
            headerName: 'Add training',
            filter: false,
            sortable: false,
            width: 120,
            cellRenderer: row => <AddTraining saveTraining={saveTraining} customer={row.data}/>
        },
        {
            filter: false,
            sortable: false,
            width: 120,
            cellRenderer: row => <EditCustomer updateCustomer={updateCustomer} customer={row.data}/>
        },
        {
            filter: false,
            sortable: false,
            width: 120,
            cellRenderer: row => <Button size="small" onClick={() => deleteCustomer(row.data.links[0].href)}><DeleteIcon/></Button>
        }
    ]);
    
    const fetchCustomers = () => {
        fetch(import.meta.env.VITE_API_URL + '/api/customers')
        .then(response =>{
            if (response.ok)
                return response.json();
            else throw new Error("Error in fetching customers: " + response.statusText);
        })
        .then(data => setCustomers(data))
        .catch(err => console.error(err))
    }

    const saveCustomer = (customer) => {
        fetch(import.meta.env.VITE_API_URL + '/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(response => fetchCustomers())
        .catch(err => console.error(err))
    }

    const saveTraining = (training) => {
        fetch(import.meta.env.VITE_API_URL + '/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(response => {
            if (response.ok)
                alert("Training added successfully!");
            else {
                alert("Adding training failed! Did you use proper datatypes?");
                throw new Error("Error in adding training: " + response.statusText);
            }
        })
        .catch(err => console.error(err)) 
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(() => fetchCustomers())
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        console.log(link)
        if (window.confirm("Are you sure you want to delete customer AND their trainings?")) {
                fetch(link, { method: 'DELETE'})
                .then(response => {
                if (response.ok)
                    fetchCustomers();
                else throw new Error("Error in DELETE: " + response.statusText);
            })
            .catch(err => console.error(err))
        }
    }

    return(
        <>
        <br/>
        <ButtonGroup style={{margin: 20}} variant="contained">
        <AddCustomer saveCustomer={saveCustomer}/>
        <ExportCustomers gridApi={gridApi}/>
        </ButtonGroup>
        <div className="ag-theme-material" style={{ width: '100%', height: 600}}>
        <AgGridReact
                rowData={customers.content}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
                paginationAutoPageSize={true}
                onGridReady={onGridReady}
            />
        </div>
        </>
    );
}