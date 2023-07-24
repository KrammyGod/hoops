import { useState } from "react";
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';

interface PaginationProps {
    page: number;
    numPages: number;
    onPageChange: (n: number) => void;
}

export default function Pagination({page, numPages, onPageChange}: PaginationProps) {

    const [input, setInput] = useState<number>(1);
    
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
        if (value <= 0 || value > numPages) return;
		onPageChange(value);
        setInput(value);
	}

    const handleNext = () => {
        const value = page + 1;
        if (value <= 0 || value > numPages) return;
		onPageChange(value);
        setInput(value);
	}

    return (
        <div className="mx-auto d-flex align-items-center" style={{width: '200px'}}>
            <button type="button" className="btn" onClick={handlePrev}><BiChevronLeft/></button>
            <span style={{margin:'10px'}}>
                <input type="number" value={(input > numPages) ? 1 : page} onChange={handleChange} onKeyDown={handleKeyPress} style={{width:'40px', textAlign:'center', appearance:'textfield'}}></input> of {numPages}
            </span>
            <button type="button" className="btn" onClick={handleNext}><BiChevronRight/></button>
        </div>
    )
}
