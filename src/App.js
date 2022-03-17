import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const App = () => {
  const classes = useStyles();
  const [product, setProduct] = useState([]);

  const getProductData = async () => {
    const data = await axios.get(
      "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
    );
    console.log(data?.data);
    setProduct(data?.data);
  };

  useEffect(() => {
    getProductData();
  }, []);
  return (
    <div className="App">
      <TableContainer>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Product Name</StyledTableCell>
              <StyledTableCell align="right">Product Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product.map((item) => {
              return (
                <StyledTableRow key={item.id}>
                  <StyledTableCell>{item.name}</StyledTableCell>
                  <StyledTableCell align="right">{item.price}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;
