import { Box, Button, TextField, Typography } from '@mui/material'
import { SetStateAction, useState } from 'react'
import { uploadFile } from '../../services/storageService';
import { addProduct } from '../../services/productsService';
import { useAuthContext } from '../../context/AuthContext';

export default function ProductForm(props: {onCloseModal: () => void, onProductAdded: () => void}) {
    const { user } = useAuthContext();
    const [productName, setProductName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');


    const handleProductNameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setProductName(event.target.value);
    };

    const handlePriceChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setPrice(event.target.value);
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileUrl = await uploadFile(file);
            setImageUrl(fileUrl);
            console.log("fileUrl", fileUrl, typeof fileUrl);
        }
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        await addProduct(productName, Number(price), imageUrl, user.uuid);
        props.onCloseModal();
        props.onProductAdded();
      };


    const modal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 1,
    };
  return <>
    <Box sx={modal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a New Product
        </Typography>          
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="product-name"
                label="Product Name"
                name="name"
                autoFocus
                onChange={handleProductNameChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                type="number"
                onChange={handlePriceChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth   
                id="image"
                label="Image"
                name="image"
                type="file"
                InputLabelProps={{
                shrink: true,
                }}
                onChange={handleImageChange}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} disabled={productName === '' || price === '' || imageUrl === ''}>
                Add Product
            </Button>
        </form>
    </Box>
  </>
}
