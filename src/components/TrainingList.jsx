import React, { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import Button from '@mui/material/Button';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import moment from 'moment';

import DeleteIcon from '@mui/icons-material/Delete';

export default function TrainingList() {

    const [training, setTraining] = useState([]);

    useEffect(() => {
        fetchTraining();
    },[]);

    const [columnDefs] = useState([
        {field: 'customer.firstname',headerName: 'First Name', sortable: true, filter: true},
        {field: 'customer.lastname',headerName: 'Last Name', sortable: true, filter: true},
        {field: 'activity', sortable: true, filter: true},
        {field: 'duration', sortable: true, filter: true},
        {field: 'date', sortable: true, filter: true,
        cellRenderer: (data) => {
            return moment(data.value).format('DD/MM/YYYY HH:mm');
        }},
        {
            filter: false,
            sortable: false,
            width: 120,
            cellRenderer: row => <Button size="small" onClick={() => deleteTraining(row.data.id)}><DeleteIcon/></Button>
        }
    ]);
    
    const fetchTraining = () => {
        fetch(import.meta.env.VITE_API_URL + '/gettrainings')
        .then(response =>{
            if (response.ok)
                return response.json();
            else throw new Error("Error in fetching trainings: " + response.statusText);
        })
        .then(data => setTraining(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = (link) => {
        if (window.confirm("Are you sure you want to delete this training?")) {
                fetch(import.meta.env.VITE_API_URL + '/api/trainings/' + link, { method: 'DELETE'})
                .then(response => {
                if (response.ok)
                    fetchTraining();
                else throw new Error("Error in DELETE: " + response.statusText);
            })
            .catch(err => console.error(err))
        }
    }

    return(
        <>
        <br/>
        <div className="ag-theme-material" style={{ width: '100%', height: 600}}>
        <AgGridReact
                rowData={training}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
                paginationAutoPageSize={true}
            />
        </div>
        </>
    );
}