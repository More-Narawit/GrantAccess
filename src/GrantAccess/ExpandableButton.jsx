import './GrantAccess.css'
import React from 'react'

function ExpandableButton({ isOpen, toggle }) {
    return (
        <button onClick={toggle}><span
            className={(isOpen) ? "bi bi-chevron-up" : "bi bi-chevron-down"}
            >
        </span>
        </button>
    )
}

export default ExpandableButton