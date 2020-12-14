import React from 'react';

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>Delete</th>
      </tr>
    </thead>
  )
};

const TableBody = (props) => {
  const rows = props.userData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.username}</td>
        <td>{row.email}</td>
        <td>
          <button onClick={() => props.removeUser(index)}>Delete</button>
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
  const { userData, removeUser } = props;

  return (
    <table>
      <TableHeader />
      <TableBody userData={userData} removeUser={removeUser} />
    </table>
  )

};

export default Table