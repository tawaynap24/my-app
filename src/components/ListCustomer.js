import React, { useState, useEffect } from 'react'
import firebase from '../config'

const SORT_OPTIONS = {
    'NUMBER_ASC': { column: 'number', direction: 'asc' },
    'NUMBER_DESC': { column: 'number', direction: 'desc' },

    'NAME_ASC': { column: 'name', direction: 'asc' },
    'NAME_DESC': { column: 'name', direction: 'desc' }
}

function useNumber(sortBy = 'NUMBER_ASC') {
    const [number, setNumber] = useState([])

    useEffect(() => {
        firebase
            .firestore()
            .collection('customer')
            .orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
            .onSnapshot((snapshot) => {
                const newNumber = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setNumber(newNumber)
            })
    }, [sortBy])

    return number
}

const ListCustomer = () => {
    const [sortBy, setSortBy] = useState('NUMBER_ASC')
    const number = useNumber(sortBy)

    return (
        <div>
            <h2>Customer List</h2>
            <div>
                <label>Sort By</label>
                <select value={sortBy} onChange={e => setSortBy(e.currentTarget.value)}>
                    <option value="NAME_ASC">Title (a-z)</option>
                    <option value="NAME_DESC">Title (z-a)</option>
                    <option value="NUMBER_ASC">Number (Lowest)</option>
                    <option value="NUMBER_DESC">Number (Highest)</option>
                </select>
            </div>
            <ol>
                {number.map((num) =>
                    <li key={num.id}>
                        <div>
                            {num.name}
                            <code>{num.number}</code>
                        </div>
                    </li>
                )}
            </ol>
        </div>
    )
}

export default ListCustomer;