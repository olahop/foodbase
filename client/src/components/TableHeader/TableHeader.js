import React from "react";
import { connect } from "react-redux";
import { changeSort } from "./../../actions/sort";
import { resetSortAsc, toggleSortAsc } from "./../../actions/sortAsc";
import { Thead, Tr, Th } from "react-super-responsive-table";
import "./TableHeader.css";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";


class TableHeader extends React.Component {

    onChange = event => {
        if (this.props.sort !== event.target.getAttribute("value")){
            this.props.onChangeSort(event.target.getAttribute("value"));
            this.props.onChangeResetAsc();
        }else{
            this.props.onChangeToggleAsc();
        }
    }

    render() {
        const { sort, sortAsc } = this.props
        return (
            <Thead>
                <Tr>
                    <Th className="header-option" value="Name" onClick={this.onChange}>
                        Name {sort === "Name" ? (sortAsc ? "↓" : "↑") : ""}
                    </Th>
                    <Th className="header-option" value="Fat" onClick={this.onChange}>
                        Fat&nbsp;(g) {sort === "Fat" ? (sortAsc ? "↓" : "↑") : ""}
                    </Th>
                    <Th className="header-option" value="Carbohydrates" onClick={this.onChange}>
                        Carbs&nbsp;(g) {sort === "Carbohydrates" ? (sortAsc ? "↓" : "↑") : ""}
                    </Th>
                    <Th className="header-option" value="Protein" onClick={this.onChange}>
                        Protein&nbsp;(g) {sort === "Protein" ? (sortAsc ? "↓" : "↑") : ""}
                    </Th>
                </Tr>
            </Thead>
        );
    }
}

const mapStateToProps = state => ({
    sort: state.sort,
    sortAsc: state.sortAsc
});

const mapActionsToProps = {
    onChangeSort: changeSort,
    onChangeToggleAsc: toggleSortAsc,
    onChangeResetAsc: resetSortAsc
};

export default connect(mapStateToProps,mapActionsToProps)(TableHeader)
