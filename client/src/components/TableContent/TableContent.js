import React from "react";
import { connect } from "react-redux";
import { replaceData } from "../../actions/data";
import { Tbody } from "react-super-responsive-table";
import "./TableContent.css";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

import TableRowContent from "./TableRowContent/TableRowContent";


class TableContent extends React.Component {
    /*
    Class handling the fetching and rendering of food data displayed in the table
    */
    
    myRef = React.createRef();

    state = {
        filter: "",             // holds the filter of the current table
        search: "",             // holds the search parameter of the current table
        sort: "Name",           // holds the sort parameter of the current table
        sortAsc: true,          // holds the sort direction parameter of the current table
        range: 0,               // holds the range from which the fetching should happen on the current query
        tableData: [],          // holds the fetched data from the database
        hasMore: true           // if the current fetch parameters has unfetched values in the database
    }

    componentDidMount() {
        this.fetchMultipleFoods(0)
    }

    componentDidUpdate() {
        const { filter, search, sort, sortAsc } = this.state
        if ( filter !== this.props.filter
             || search !== this.props.search
             || sort !== this.props.sort
             || sortAsc !== this.props.sortAsc
        ) {
            this.setState({ 
                filter: this.props.filter,
                search: this.props.search,
                sort: this.props.sort,
                sortAsc: this.props.sortAsc,
                hasMore: true,
                range: 0,
                tableData: []
            });
            this.fetchMultipleFoods(0);
        }
    }

    // triggered when scrolling inside the food table and triggers fetchMultipleFoods if expedient
    onScroll = () => {
        const { range, hasMore } = this.state;

        const scrollTop = this.myRef.current.scrollTop;
        const scrollHeight = this.myRef.current.scrollHeight;
        const clientHeight = this.myRef.current.clientHeight;
        const scroll = clientHeight + scrollTop > scrollHeight-50;

        if (scroll && hasMore) {
            this.fetchMultipleFoods(range+20);
            this.setState({ range: range+20 });
        }

        this.setState({
          scrollTop: scrollTop
        })
      }

    // fetches new food-objects from the database, 10 at the time with given parameters
    fetchMultipleFoods = async (range) => {
        const { filter, search, sort, sortAsc } = this.props;

        const fetchURl = ("http://localhost:4000/api/food/many?"
            + "filter=" + filter + "&"
            + "search=" + search + "&"
            + "sort=" + sort + "&"
            + (sortAsc === (sort === "Name") ? "sortAsc=" + sortAsc + "&" : "") 
            + "range=" + range
        );

        const result = await fetch(fetchURl, {
            method: "GET"}
        )
        .then(res => res.json());

        if (result.food.length < 20) {
            this.setState({ hasMore: false });
        }

        let newTableData = result.food
        if(range !== 0) {
            newTableData = this.state.tableData.concat(result.food);
        }

        this.props.onChangeReplaceData(newTableData);

        this.setState({
            tableData: newTableData
        })  
    }

    render() {
        return (
            <div 
                ref={this.myRef}
                onScroll={this.onScroll}
                className="table-body-wrapper"
            >
                <Tbody className="table-body">
                    {this.state.tableData.map(food => (
                        <TableRowContent data={food} />
                    ))}
                </Tbody>
            </div>
        );
    }
}

const mapStateToProps = state =>({
    search: state.search,
    sort: state.sort,
    filter: state.filter,
    sortAsc: state.sortAsc
});

const mapActionsToProps = {
    onChangeReplaceData: replaceData
};

export default connect(mapStateToProps,mapActionsToProps)(TableContent)
