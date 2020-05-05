import React from "react";
import { Tr, Td } from "react-super-responsive-table";
import "./TableRowContent.css";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";


class TableRowContent extends React.Component {
    /*
    Class handling the fetching and rendering of one food object displayed in the table
    */
    
    state = {
        expanded: false,            // if the current food object is selected
        data: this.props.data,      // holds the most central data of this food object
        extendedData: null,         // holds extended data of this food object
        voted: false,               // if the actvie user has voted on this food during the active session
        vote: 0,                    // holds the vote if current user has voted
        isMobile: false             // if the screen width is typical of a mobile not
    }

    componentDidMount() {
        this.handleWindowSizeChange();
        const vote = sessionStorage.getItem(this.state.data._id);
        if(vote) {
            this.setState({
                voted: true,
                vote: vote
            })
        }
    }
    
    // multiple methods to manipulate isMobile state
    componentWillMount() {
        window.addEventListener("resize", this.handleWindowSizeChange);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowSizeChange);
    }
    handleWindowSizeChange = () => {
        if(window.innerWidth <= 500) {
          this.setState({ isMobile: true});
        } else {
          this.setState({ isMobile: false });
        }
    };

    // triggered when the objects table row is clicked and triggers approprate actions
    changeFocus = async () => {
      const { data, expanded } = this.state;
      if (expanded) {
        this.setState({ expanded: false, extendedData: [] });
      } else {
        await fetch("http://localhost:4000/api/food/one/" + data._id, {
          method: "GET"
        })
        .then(res => res.json())
        .then(result => this.setState({ expanded: true, extendedData: result }));
      }
    }

    // sends a newly given rating to the database and sets the new data on return
    sendRating = async (value) => {
        const { data } = this.state;

        await fetch("http://localhost:4000/api/food/" + data._id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "value": value
            })
        })
        .then(res => res.json());

        sessionStorage.setItem(data._id, value);
        this.setState({ 
            voted: true, 
            vote: value,
            expanded: false, 
            extendedData: []
        });
    }

    renderExtention() {
        const { extendedData, voted, vote } = this.state;
        return (
            <>
                <Td>
                    <p className="secondary-header">Rating: &nbsp;</p>
                    {extendedData.Rating ? extendedData.Rating.toFixed(2) : "0"}
                    <br/>
                    {voted ? 
                    <>
                        <p className="secondary-header">Your vote: &nbsp;</p>
                        {vote}
                    </>
                    :
                    <>
                        <p className="secondary-header">Rate (0-5): &nbsp;</p>
                        <div className="rating">
                            <button onClick={() => this.sendRating(5)} className="ratingButton">☆</button>
                            <button onClick={() => this.sendRating(4)} className="ratingButton">☆</button>
                            <button onClick={() => this.sendRating(3)} className="ratingButton">☆</button>
                            <button onClick={() => this.sendRating(2)} className="ratingButton">☆</button>
                            <button onClick={() => this.sendRating(1)} className="ratingButton">☆</button>
                            <button onClick={() => this.sendRating(0)} className="ratingButton">☆</button>
                        </div>
                    </>}
                </Td>
                <Td onClick={() => this.changeFocus()} />
                <Td onClick={() => this.changeFocus()}>
                    <p className="secondary-header">KiloJoule:&nbsp;</p>
                    {extendedData.KiloJoule}
                    <br/>
                    <p className="secondary-header">KiloCalories: &nbsp;</p>
                    {extendedData.KiloCalories}
                </Td>
                <Td onClick={() => this.changeFocus()}>
                    <p className="secondary-header">Category: &nbsp;</p>
                    {extendedData.Category}
                </Td>
            </>
        );
    }

    render() {
        const { data, expanded, isMobile } = this.state;
        return (
            <>
                <Tr
                    className="row"
                    style={expanded ? {backgroundColor: "#b5ffd8", color: "black"} : {}}
                    key={data._id}
                    onClick={() => this.changeFocus()}
                    >
                    <Td>{data.Name}</Td>
                    <Td>{data.Fat ? data.Fat : "0"}</Td>
                    <Td>{data.Carbohydrates ? data.Carbohydrates : "0"}</Td>
                    <Td>{data.Protein ? data.Protein : "0"}</Td>

                    { isMobile && expanded ? this.renderExtention() : ""}

                </Tr>

                {!isMobile && expanded ? 
                    <Tr
                        className="expanded-row"
                        style={{backgroundColor: "#e6fff2", color: "black"}}
                        key={"extended-" + data._id}
                        >
                        { this.renderExtention() }
                    </Tr>
                : "" }
            </>
        );
    }
}

export default TableRowContent
