import React from "react";
import { connect } from "react-redux";
import { changeSearch } from "../../actions/search";
import "./Search.css";


export class Search extends React.Component {

    constructor(props){
        super(props)

        this.onChange = this.onChange.bind(this)
    }

    // updates the search value in the redux store when the search field is updated
    onChange = (event) => {
        this.props.onChange(event.target.value)
    }

    render() {
        return (
            <>
              <div className="wrap">
                <div className="search" >
                    <input className="searchTerm" onChange={this.onChange} placeholder="Søk etter matvare..." />
                    <button type="submit" className="searchButton">
                        <i className="fa fa-search"></i>
                    </button>
                </div> 
              </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    search: state.search,
});

const mapActionsToProps = {
    onChange: changeSearch
};

export default connect(mapStateToProps,mapActionsToProps)(Search)
