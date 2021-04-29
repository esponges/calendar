import React from "react";
import { Button } from "react-bootstrap";

const Header = ({ month, year, getMonth }) => {
    return (
        <div className="row" id="header">
        <div className="col-md-2">
            <div className="btn-group">
            <Button onClick={(e) => getMonth('back', e)}>Back</Button>
            <Button onClick={(e) => getMonth('next', e)}>Next</Button>
            </div>
        </div>
        <div className="col-md-8">
            <h3>
            {month} {year}
            </h3>
        </div>
        </div>
    );
};

export default Header;
