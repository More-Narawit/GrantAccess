import './GrantAccess.css'
import React from 'react'

function ExpandableButton({ isOpen, toggle }) {
    return (
        <span onClick={toggle}
            className={(isOpen) ? "bi bi-chevron-up" : "bi bi-chevron-down"}
            >
        </span>
    )
}

export default ExpandableButton