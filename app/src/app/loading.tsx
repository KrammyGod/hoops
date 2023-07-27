'use client'

import { Spinner } from 'react-bootstrap';
import styles from './page.module.css';

export default function Loading({ styled=true }) {
    return (
        <div className={styled ? styles.loading : ''}>
            <Spinner size={styled ? undefined : 'sm'} animation='border' role='status'/>
        </div>
    );
}
