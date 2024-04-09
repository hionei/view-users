import * as React from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import "./App.css";
const API_URL = { 19: "https://flareuniverse.xyz/songbird-api", 14: "https://flareuniverse.xyz/flare-api" };

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

type UserType = {
  address: string;
  createdAt: string;
  updatedAt: string;
};
function App() {
  const [alignment, setAlignment] = React.useState("19");
  const [users, setUsers] = React.useState([]);
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  React.useEffect(() => {
    let apiUri = "";
    if (alignment == "19") apiUri = API_URL[19];
    if (alignment == "14") apiUri = API_URL[14];

    const getUsers = async () => {
      const result = await axios.get(apiUri + "/view-users");
      const usersData = result.data;
      if (Array.isArray(usersData)) {
        setUsers(usersData);
      }
    };

    getUsers();
  }, [alignment]);

  const calculateAgoTime = (timeString: string) => {
    const date = Number(new Date(timeString).getTime() / 1000).toFixed();
    const curDate = Number(new Date().getTime() / 1000).toFixed();
    const diff = Number(curDate) - Number(date);
    const day = Math.floor(diff / (24 * 3600));
    const hour = Math.floor((diff % (24 * 3600)) / 3600);
    const minute = Math.floor((diff % 3600) / 60);
    const seconds = Math.floor(diff % 60);
    return `${day}d ${hour}h ${minute}m ${seconds}s ago`;
  };
  return (
    <>
      <div>
        <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform">
          <ToggleButton value="19">Songbird</ToggleButton>
          <ToggleButton value="14">Flare</ToggleButton>
        </ToggleButtonGroup>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Joined</TableCell>
                <TableCell align="right">Last Used</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row: UserType, index) => (
                <TableRow key={row.address} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {index}
                  </TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">{calculateAgoTime(row.createdAt)}</TableCell>
                  <TableCell align="right">{calculateAgoTime(row.updatedAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default App;
