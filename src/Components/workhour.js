import React, { useState, useRef, useCallback,useEffect } from "react";
import "./Workhour.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
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
      // checkboxSelection: true,
    },
      {
      headerName:"closed",
      checkboxSelection: true
  },
    { field: "fromPM", headerName: "PM FROM", editable: true },
    { field: "toPM", headerName: "PM FROM", editable: true },
  ]);
  const [rowData,setRowData]=useState();

  columnDefs.checkboxSelection = true;
  // useEffect(() => {
  //   fetch('https://address of your url')
  //   .then(result => result.json())
  //   .then(rowData => setRowData(rowData))
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
  useEffect(()=>{
		setRowData(demoData);
	}, [])
  const onSelectionChanged = useCallback((event) => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    console.log(selectedRows);
    // const obj=selectedRows[0];
    // let rowNode = gridRef.current.api.getRowNode(obj.day);
    console.log(gridRef.current.api);
    // let rowNode = gridRef.current;
// console.log(rowNode);
  },[]);

 const  setData = (data) =>{
console.log(data);
  }

  const onRowValueChanged = useCallback(
    (event) => {
      console.log('called')
      var data = event.data;
      for (let i = 0; i < demoObj.openingHours.length; i++) {
        let obj = demoObj.openingHours[i];
        if (obj.day === data.day) {
          obj = { ...data };
        }
      }
      console.log(demoObj);
    },
    [demoObj]
  );

  return (
    <>
     <div className="ag-theme-alpine" style={{ height: 500, width: 800 }}>
      <AgGridReact
        checkboxSelection={true}
       onSelectionChanged={onSelectionChanged}
        onRowValueChanged={onRowValueChanged}
        ref={gridRef}
        // getRowId={getRowId}
        setData={setData}
        rowData={rowData}
        columnDefs={columnDefs}
      ></AgGridReact>

    </div>
    <button>
      submit
    </button>
    </>
   
  );
}

export default Workhour;
