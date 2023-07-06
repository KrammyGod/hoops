import { useState } from "react"
import { Button } from "react-bootstrap"

export default () => {
    const [isMarked, mark] = useState(false);

    const toggleMark = () => {
        mark((s) => !s)
    };

    return (
        <Button onClick={toggleMark}>
            Bookmarks
        </Button>
    );
}
