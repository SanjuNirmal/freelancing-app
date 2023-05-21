import React, { Component } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default class JobProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      id: "",
    };
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    const id = useSelector((state) => state.jobList.jobID);
    this.setState({
      id: id,
    });

    axios
      .get(`http://localhost:3420/api/job/view_one`, {
        id: id,
      })
      .then((res) => {
        this.setState({ data: res.data.result });
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="outerLayer">
          <div className="section">
            <div className="sectionTile">{this.state.data.mainTitle}</div>
            <div className="sectionDetails">
              Fixed-price - Expert - Est. Budget: ${this.state.data.price} -
              Duration {this.state.data.days} days
            </div>
            <div className="content">{this.state.data.content}</div>
            <div className="location">
              {this.state.data.category}, {this.state.data.category2}
            </div>
            <hr className="header-top__seperator" />
          </div>
        </div>

        <div className="rightSideMenu">
          <div className="component">
            <button type="button" class="btn btn-outline-success padding">
              Place An Order
            </button>
          </div>
          <div className="component">
            <div className="tileRight">My Categories</div>
            <div className="itemRight">Desktop Software Development</div>
            <div className="itemRight">E - commerce Development</div>
            <div className="itemRight">Other - Software Development</div>
            <div className="itemRight">Mobile Development</div>
          </div>
        </div>
      </div>
    );
  }
}
