import React from "react";
import Modal from "react-modal";
import Graphics from "./Graphics/Graphics";
import { connect } from "react-redux";
import "./DataViewer.css";


export class DataViewer extends React.Component {
    constructor() {
        super();

        this.state = {
            data: [],               // holds the tabledata from the redux store
            modalIsOpen: false,     // if the modal is open
            isMobile: false         // if the current screen size is typical for mobiles
        }
    
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    // multiple methods to manipulate isMobile state
    componentDidMount() {
        this.handleWindowSizeChange();
    }
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

    // opens the modal
    openModal() {
        this.setState({
            modalIsOpen: true,
            data: this.props.data
        });
    }
     
    // closes the modal
    closeModal() {
        this.setState({ modalIsOpen: false});
    }

    render() {
        return (
            <>
                <div className="modalObject">
                    <button className="graph-button" onClick={this.openModal}>
                        Graphics
                        <i className="fas fa-chart-line fa-lg"></i>
                    </button>
                    <Modal
                        className="modal"
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel="Graphics Modal"
                    >
                        { this.state.isMobile ? 
                        <p className="no-graphics-text">Your current screen size do not support graphics section</p>
                        :
                        <Graphics data={this.state.data}/>
                        }
                    </Modal>
                </div>
            </>
        );
    }
}

const mapStateToProps = state =>({
    data: state.data
  });

export default connect(mapStateToProps)(DataViewer)
