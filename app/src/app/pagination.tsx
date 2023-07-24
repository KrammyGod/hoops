import { useState } from "react";
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';

interface PaginationProps {
    page: number;
    numPages: number;
    onPageChange: (n: number) => void;
}

export default function Pagination({page, numPages, onPageChange}: PaginationProps) {

    const [inpt, setInpt] = useState<number>(1);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (value <= 0 || value > numPages) return;
		setInpt(value);
	}

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onPageChange(inpt)
        }
	}

    const handlePrev = () => {
        const value = page - 1;
        if (value <= 0 || value > numPages) return;
		onPageChange(value);
        setInpt(value);
	}

    const handleNext = () => {
        const value = page + 1;
        if (value <= 0 || value > numPages) return;
		onPageChange(value);
        setInpt(value);
	}

    return (
        <div className="mx-auto d-flex align-items-center" style={{width: '200px'}}>
            <button type="button" className="btn" onClick={handlePrev}><BiChevronLeft/></button>
            <span style={{margin:'10px'}}>
                <input type="number" value={inpt} onChange={handleChange} onKeyDown={handleKeyPress} style={{width:'40px', textAlign:'center', appearance:'textfield'}}></input> of {numPages}
            </span>
            <button type="button" className="btn" onClick={handleNext}><BiChevronRight/></button>
        </div>
    )
}
