import React, {Component} from 'react'

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>WPM</th>
                <th>Time</th>
                <th>Accuracy</th>
            </tr>
        </thead>
    )
}

const TableBody = (props) => {
    const rows = props.scoreData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.number}</td>
                <td>{row.name}</td>
                <td>{row.wpm}</td>
                <td>{row.time}</td>
                <td>{row.acc}</td>
                <td>
                    <button onClick={() => props.removeScore(index)}>Delete</button>
                </td>
            </tr>
        )
    })

    return <tbody>{rows}</tbody>
}

const Table = (props) => {
    const {scoreData, removeScore} = props

    return (
        <table>
            <TableHeader />
            <TableBody scoreData={scoreData} removescore={removeScore} />
        </table>
    )
}

export default Table