import React from "react";
import { Table } from "react-super-responsive-table";
import "./App.css";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import Search from "./components/Search/Search";
import Filter from "./components/Filter/Filter";
import TableHeader from "./components/TableHeader/TableHeader";
import TableContent from "./components/TableContent/TableContent";
import DataViewer from "./components/DataViewer/DataViewer";


const App = () => {
  return (
    <>
    <div className="overlay">
      <h1 className="site-header">foodbase</h1>
      <div className="search-bar-container">
        <Search /> 
      </div>
      <div className="table-choice-container">
        <div className="filter-select-container">
          <Filter />
        </div>
        <div className="graphic-button-container">
          <DataViewer />
        </div>
      </div>
      <div className="table-container">
        <Table className="table">
          <TableHeader className="table-header"/>
          <TableContent className="table-content"/>
        </Table>
        <p className="info-text">*Alle verdier er per 100 gram av matvaren</p>
      </div>
    </div>
    </>
  );
}

export default App