import React from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import styles from "../styles/OptionsDropdown.module.css";

export const OptionsDropdown = (props) => {
  const { handleEdit, handleDelete } = props;

  return (
    <Dropdown style={{ fontSize: "30px" }}>
      <Dropdown.Toggle>
        <span className={styles.icon}>
          <i className="fa-solid fa-bars"></i>
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>
          <span onClick={handleEdit}>Edit</span>
        </Dropdown.Item>
        <Dropdown.Item>
          <span onClick={handleDelete} className={styles.delete}>
            Delete
          </span>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
