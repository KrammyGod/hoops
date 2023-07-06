import { useState } from "react"
import { Dropdown } from "react-bootstrap"

export default () => {
    const [isOpen, open] = useState(false);
    return (
        <Dropdown show={isOpen}>
            <Dropdown.Toggle 
                onMouseOver={() => open(true)} 
                onMouseLeave={() => open(false)}
            >
                Bookmarks
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item>See all players</Dropdown.Item>
                <Dropdown.Item></Dropdown.Item>
                
            </Dropdown.Menu>

        </Dropdown>
    );
}