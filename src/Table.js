import React, { Component } from 'react';

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
            </tr>
        </thead>
    )
};

const TableBody = (props) => {
    const rows = props.nameData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.firstname}</td>
                <td>{row.lastname}</td>
            </tr>
        )
    });

    return (
        <tbody>
            {rows}
        </tbody>
    )
};

class Table extends Component {
    render() {
        const { nameData } = this.props;

        return (
            <table>
                <TableHeader />
                <TableBody nameData={nameData} />
            </table>
        )
    }
}

export default Table