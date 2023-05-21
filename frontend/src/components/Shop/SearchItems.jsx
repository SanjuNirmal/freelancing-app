import React from "react";
import { Tooltip } from "@mui/material";
import { Form, FormControl } from "react-bootstrap";
import CloseIcon from "@mui/icons-material/Close";
import "./Shop.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const SearchItems = ({
  searchResults,
  onChange,
  onClickSearch,
  setReduxStore,
  onClickClose,
}) => {
  return (
    <div>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Type Title Here"
          className="me-2"
          aria-label="Search"
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />
        <Button variant="outline-primary" onClick={onClickSearch}>
          Search
        </Button>

        <Tooltip title="Close">
          <CloseIcon onClick={onClickClose} />
        </Tooltip>
      </Form>
      <div style={{ marginTop: 20 }}>
        {searchResults.map((item) => {
          return (
            <div className="section">
              <Link to="/new-shop-item">
                <button
                  className="sectionTile"
                  onClick={() => {
                    setReduxStore(item.id);
                  }}
                >
                  {item.mainTitle}
                </button>
              </Link>
              <div className="sectionDetails">
                Fixed-price - Expert - Est. Budget: ${item.price}
              </div>
              <div className="text-color">{item.content}</div>
              <div className="location">{item.category}</div>
              <hr className="header-top__seperator" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchItems;
