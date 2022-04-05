import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#555555",
    color: "#aaaaaa",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.common.white,
  },
}));

const StyledTableBuyCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#555555",
    color: "#aaaaaa",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#aa0000",
  },
}));

const StyledTableSellCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#555555",
    color: "#aaaaaa",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#00aa00",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#222222",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#333333",
  }
}));

const Home: React.FC = () => {
  const [read, setRead] = useState(true);
  const [buy, setBuy] = useState([]);
  const [sell, setSell] = useState([]);
  const [isBuy, setIsBuy] = useState(1);
  const ws = new WebSocket("wss://production-esocket.delta.exchange");
  const [symbol, setSymbol] = React.useState("BTCUSDT");

  const handleChangeSymbol = (event: SelectChangeEvent) => {
    setSymbol(event.target.value as string);
  };

  ws.onopen = (event) => {
    const apiCall = {
      type: "subscribe",
      payload: {
        channels: [
          {
            name: "l2_orderbook",
            symbols: [symbol],
          },
        ],
      },
    };
    if (read) {
      ws.send(JSON.stringify(apiCall));
      setRead(false);
    }
  };

  ws.onmessage = function (event) {
    const json = JSON.parse(event.data);
    try {
      if (json.buy) {
        setBuy(json.buy);
        setSell(json.sell);
        ws.close();
        setRead(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box p={10}>
      <Box sx={{ width: 220 }} mb={1}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Symbol</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={symbol}
            label="Symbol"
            onChange={handleChangeSymbol}
            size="small"
          >
            <MenuItem value="BTCUSDT">BTCUSDT</MenuItem>
            <MenuItem value="BTCUSD">BTCUSD</MenuItem>
            <MenuItem value="ETHUSDT">ETHUSDT</MenuItem>
            <MenuItem value="DOGEUSDT">DOGEUSDT</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box mb={2}>
        <Button
          variant={isBuy === 1 ? "contained" : "outlined"}
          onClick={() => setIsBuy(1)}
          sx={{ marginRight: "10px" }}
        >
          Buy
        </Button>
        <Button
          variant={isBuy === 2 ? "contained" : "outlined"}
          onClick={() => setIsBuy(2)}
          sx={{ marginRight: "10px" }}
        >
          Sell
        </Button>
        <Button
          variant={isBuy === 3 ? "contained" : "outlined"}
          onClick={() => setIsBuy(3)}
        >
          Both
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(isBuy === 1 || isBuy === 3) &&
              buy &&
              buy?.map((row: any) => (
                <StyledTableRow
                  key={row.depth}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableBuyCell>{row.limit_price}</StyledTableBuyCell>
                  <StyledTableBuyCell>{row.size}</StyledTableBuyCell>
                </StyledTableRow>
              ))}
            {(isBuy === 2 || isBuy === 3) &&
              sell &&
              sell?.map((row: any) => (
                <StyledTableRow
                  key={row.depth}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableSellCell>{row.limit_price}</StyledTableSellCell>
                  <StyledTableSellCell>{row.size}</StyledTableSellCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Home;
