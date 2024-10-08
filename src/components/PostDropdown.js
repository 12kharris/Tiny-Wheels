import React from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";

export const PostDropdown = (props) => {
    const {handleEdit, handleDelete} = props;

    return (
        <DropdownButton id="dropdown-basic-button" title="..." variant="Secondary">
            <Dropdown.Item>
                <Button onClick={handleEdit}>Edit post</Button>
            </Dropdown.Item>
            <Dropdown.Item>
                <Button onClick={handleDelete}>Delete post</Button>
            </Dropdown.Item>
        </DropdownButton>
    )
    
}