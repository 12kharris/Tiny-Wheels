import React from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";

export const OptionsDropdown = (props) => {
    const {handleEdit, handleDelete} = props;

    return (
        <DropdownButton id="dropdown-basic-button" title="..." variant="Secondary">
            <Dropdown.Item>
                <Button onClick={handleEdit}>Edit</Button>
            </Dropdown.Item>
            <Dropdown.Item>
                <Button onClick={handleDelete}>Delete</Button>
            </Dropdown.Item>
        </DropdownButton>
    )
    
}