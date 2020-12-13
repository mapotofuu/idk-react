import React, { Component } from 'react';

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Delete</th>
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
        <td>
          <button onClick={() => props.removeName(index)}>Delete</button>
        </td>
      </tr>
    )
  });

  return (
    <tbody>
      {rows}
    </tbody>
  )
};

const Table = (props) => {
  const { nameData, removeName } = props;

  return (
    <table>
      <TableHeader />
      <TableBody nameData={nameData} removeName={removeName} />
    </table>
  )

};

export default Table