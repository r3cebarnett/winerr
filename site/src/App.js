import './App.css';
import err_list from './err.json';

import { useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {Switch, FormGroup, FormControlLabel, TextField} from '@mui/material';

const errExeUrl = 'https://download.microsoft.com/download/4/3/2/432140e8-fb6c-4145-8192-25242838c542/Err_6.4.5/Err_6.4.5.exe';

const MAX_ENTRIES = 150;
err_list.sort((a, b) => a.code - b.code);

function ErrorTable({data, isCodeHex}) {
  return <>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Code</TableCell>
          <TableCell>Error</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Header</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          data.map((error, index) =>
            <TableRow key={index}>
              <TableCell>{isCodeHex ? '0x' + error.code.toString(16) : error.code.toString()}</TableCell>
              <TableCell>{error.error}</TableCell>
              <TableCell>{error.desc}</TableCell>
              <TableCell>{error.header}</TableCell>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  </>
}

function App() {
  const [data, setData] = useState(err_list.slice(0, MAX_ENTRIES));
  const [isCodeHex, setIsCodeHex] = useState(false);

  function handleHexSwitch(event, value) {
    setIsCodeHex(value);
  }

  function handleSearchText(event) {
    var data_filter = [];
    var num;
    var value = event.target.value.toLowerCase();
    if (!isNaN(num = Number(value))) {
      // Code
      err_list.forEach((error) => {
        if (error.code === num) {
          data_filter.push(error);
        }
      });
    } else {
      // Search for error name
      err_list.forEach((error) => {
        if (error.error.toLowerCase().startsWith(value)) {
          data_filter.push(error);
        }
      });
    }

    setData(data_filter.slice(0, MAX_ENTRIES));
  }

  return (
    <div className="App">
      <h1>Windows Error Search Tool</h1>
      <p>Retrieved from <a href={errExeUrl}>Err 6.4.5</a></p>
      <p>Table results are limited to {MAX_ENTRIES} entries.</p>

      <FormGroup>
        <FormControlLabel control={<Switch onChange={handleHexSwitch} />} label="Display Code as Hex"></FormControlLabel>
        <TextField variant='outlined' onChange={handleSearchText} label="Search code or error"/>
      </FormGroup>
      <ErrorTable data={data} isCodeHex={isCodeHex}></ErrorTable>
    </div>
  );
}

export default App;
