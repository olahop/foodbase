import React from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { changeFilter } from "./../../actions/filter";
import "./Filter.css";

class Filter extends React.Component {

    // updates the filter value in the redux store when the filter selector is changed
    onChange = (event) => {
        this.props.onChange(event.value);
    }

    render() {
        const options = [
            { value: "", label: "Alle" },
            { value: "Div ferdigretter, produkter og ingredienser", label: "Div ferdigretter, produkter og ingredienser" },
            { value: "Drikke", label: "Drikke" },
            { value: "Egg", label: "Egg" },
            { value: "Grønnsaker, frukt og bær", label: "Grønnsaker, frukt og bær" },
            { value: "Kjøtt", label: "Kjøtt" },
            { value: "Korn- og bakervarer", label: "Korn- og bakervarer" },
            { value: "Margarin, smør, matolje o.l.", label: "Margarin, smør, matolje o.l." },
            { value: "Meieriprodukter", label: "Meieriprodukter" },
            { value: "Sjømat", label: "Sjømat" },
            { value: "Spedbarnsmat", label: "Spedbarnsmat" },
            { value: "Sukker og søte produkter", label: "Sukker og søte produkter" }
          ]
        return (
            <Select 
                className="select"
                options={options} 
                onChange={this.onChange}
                placeholder="Alle"
            />
        );
    }
}
const mapStateToProps = state => ({
    filter: state.filter,
});

const mapActionsToProps = {
    onChange: changeFilter
};

export default connect(mapStateToProps,mapActionsToProps)(Filter)

