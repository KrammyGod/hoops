import './styles.css';
import { useEffect, useState } from "react";
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';

interface PaginationProps {
    page: number;
    numPages: number;
    onPageChange: (n: number) => void;
}

export default function Pagination({page, numPages, onPageChange}: PaginationProps) {

    const [input, setInput] = useState<number>(1);

    useEffect(() => {
        setInput(page)
    }, [page]);

    const handleBlur = () => {
        setInput(page)
    }

    const handleChange = (event: any) => {
        const value = parseInt(event.target.value);
        if (value <= 0 || value > numPages) return;
	setInput(value);
    }

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            onPageChange(input)
	}
    }

    const handlePrev = () => {
        const value = page - 1;
        if (value <= 0) return;
        onPageChange(value);
        setInput(value);
    }

    const handleNext = () => {
        const value = page + 1;
        if (value > numPages) return;
	onPageChange(value);
        setInput(value);
    }

    return (
        <div className="page-container">
            <button type="button" className="btn" onClick={handlePrev}><BiChevronLeft/></button>
            <span className="input-container">
                <input className="input" type="number" value={(input > numPages) ? 1 : input} onBlur={handleBlur} onChange={handleChange} onKeyDown={handleKeyPress}></input> of {numPages}
            </span>
            <button type="button" className="btn" onClick={handleNext}><BiChevronRight/></button>
        </div>
    )
}
