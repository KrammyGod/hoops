import { useState } from "react"
import { Dropdown } from "react-bootstrap"

export default () => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success">
                Bookmarks
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item>See all players</Dropdown.Item>
                <Dropdown.Item></Dropdown.Item>

            </Dropdown.Menu>

        </Dropdown>
    );
}