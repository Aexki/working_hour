import React, { useState, useRef, useEffect } from "react";
import "./Workhour.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { GridApi } from "ag-grid-community";
const initObj = {
    regionCode: "ECA",
    customerNumber: "0018527",
    deliveryPoint: "828",
    openingHours: [
        {
            fromAM: "09:00:00",
            toAM: "12:00:00",
            fromPM: "13:00:00",
            toPM: "18:00:00",
            closedPM: false,
            closedAM: false,
        },
        {
            fromAM: "09:00:00",
            toAM: "12:00:00",
            fromPM: "13:00:00",
            toPM: "18:00:00",
            closedPM: false,
            closedAM: false,
        },
        {
            fromAM: "09:00:00",
            toAM: "12:00:00",
            fromPM: "13:00:00",
            toPM: "18:00:00",
            closedPM: false,
            closedAM: false,
        },
        {
            fromAM: "09:00:00",
            toAM: "12:00:00",
            fromPM: "13:00:00",
            toPM: "18:00:00",
            closedPM: false,
            closedAM: false,
        },
        {
            // "day":"thuday",
            fromAM: "09:00:00",
            toAM: "12:00:00",
            fromPM: "13:00:00",
            toPM: "30:00:00",
            closedPM: false,
            closedAM: false,
        },
        {
            fromAM: null,
            toAM: null,
            fromPM: null,
            toPM: null,
            closedPM: true,
            closedAM: true,
        },
        {
            fromAM: null,
            toAM: null,
            fromPM: null,
            toPM: null,
            closedPM: true,
            closedAM: true,
        },
    ],
};

function Workhour() {
    const gridRef = useRef();
    // const rowData=initObj.openingHours;
    const [apiResult, setApiresult] = useState(initObj);
    const [columnDefs, setColumnDefs] = useState([
        { field: "day", headerName: "Day", editable: false },
        { field: "fromAM", headerName: "AM From", editable: true },
        {
            field: "toAM",
            headerName: "AM To",
            editable: true,
        },
        {
            headerName: "closed",
            checkboxSelection: true,
        },
        { field: "fromPM", headerName: "PM FROM", editable: true },
        { field: "toPM", headerName: "PM FROM", editable: true },
    ]);
    let [rowData, setRowData] = useState();

    // columnDefs.checkboxSelection = true;
    // useEffect(() => {
    //   axios.get('https://address of my url')
    //   .then(result => result.json())
    //   .then(apiResult => setApiresult(apiResult))
    // }, []);
    var daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const demoObj = apiResult;
    // Iterate over the daysOfWeek array and add the key-value pair
    for (let i = 0; i < daysOfWeek.length; i++) {
        const day = daysOfWeek[i % 7];
        demoObj.openingHours[i].day = day;
    }
    let demoData = [...demoObj.openingHours];

    demoData = demoData.map((ele) => {
        if (ele.closedAM === null) {
            ele.closedAM = "00:00:00";
        }
        if (ele.closedPM === null) {
            ele.closedPM = "00:00:00";
        }
        if (ele.fromAM === null) {
            ele.fromAM = "00:00:00";
        }
        if (ele.fromPM === null) {
            ele.fromPM = "00:00:00";
        }
        if (ele.toAM === null) {
            ele.toAM = "00:00:00";
        }
        if (ele.toPM === null) {
            ele.toPM = "00:00:00";
        }
        return ele;
    });
    useEffect(() => {
        setRowData(demoData);
    }, []);

    const onSelectionChanged = (event) => {
        const selectedRows = gridRef.current.api.getSelectedNodes();

        if (selectedRows.length > 0) {
            const UpdatedRowData = {
                ...selectedRows[0].data,
                toAM: "00:00:00",
            };
            selectedRows[0].setData(UpdatedRowData);
            if (rowData) {
                rowData = [
                    ...rowData?.filter((item) => {
                        return item.day !== UpdatedRowData.day;
                    }),
                    UpdatedRowData,
                ];
            }
            console.log("rowData", rowData);
        }
    };

    const onRowValueChanged = (event) => {
        console.log("called");
        var data = event.data;

        for (let i = 0; i < demoObj.openingHours.length; i++) {
            let obj = demoObj.openingHours[i];
            if (obj.day === data.day) {
                obj = { ...data };
            }
        }
        console.log(demoObj);
    };

    const onCellEditingStopped = (params) => {
        const UpdatedRowData = params.data;
        setRowData(
            rowData?.map((item) => {
                if (item.day === UpdatedRowData.day) {
                    return UpdatedRowData;
                }
                return item;
            })
        );
    };

    const handleSubmit = () => {
        console.log(
            "gridRef",
            gridRef.current.api.forEachNode((node) => console.log(node))
        );
        console.log(rowData);

        // final api post call
        // axis.post('https://address of my url',rowData);
    };

    return (
        <>
            <div
                className="ag-theme-alpine"
                style={{ height: 500, width: 800 }}
            >
                <AgGridReact
                    checkboxSelection={true}
                    onSelectionChanged={onSelectionChanged}
                    onRowValueChanged={onRowValueChanged}
                    onCellEditingStopped={onCellEditingStopped}
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                ></AgGridReact>
            </div>
            <button onClick={handleSubmit}>submit</button>
        </>
    );
}

export default Workhour;
