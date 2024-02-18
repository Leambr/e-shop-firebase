import {
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { Product } from '../ShoppingCart/ShoppingCart';
import { Delete } from '@mui/icons-material';
import { deleteProduct } from '../../services/productsService';

export default function ProductList(props : { products: Product[], onProductDeleted: () => void}) {
    const handleDeleteProduct = async (productId: string) => {
        try {
            await deleteProduct(productId);
            props.onProductDeleted();
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <>
        <Grid>
            <TableContainer component={Paper} elevation={1}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: '#808080' }}>Product</TableCell>
                            <TableCell align="right" style={{ color: '#808080' }}>
                                Price
                            </TableCell>
                            <TableCell align="right" style={{ color: '#808080' }}>
                                Image
                            </TableCell>
                            <TableCell align="right" style={{ color: '#808080' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.products &&
                        props.products.map((product, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.label}
                                </TableCell>
                                <TableCell align="right">
                                    {product.price}
                                    &nbsp;&euro;
                                </TableCell>
                                <TableCell align="right">
                                    {product.img && (
                                        <a href={product.img} target="_blank" rel="noopener noreferrer">
                                            <img src={product.img} alt={product.label} style={{ width: '50px' }} />
                                        </a>
                                    )}

                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleDeleteProduct(product.id)}>
                                        <Delete color="primary" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </Grid>
    </>
  )
}
