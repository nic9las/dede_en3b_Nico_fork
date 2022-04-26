import React, {useState, useEffect} from "react";
import Grid from "@mui/material/Grid";
import {IProduct} from '../shared/shareddtypes';
import {useParams} from 'react-router-dom';
import {getProduct} from '../api/api';
import { Card } from "@mui/material";
import Typography from '@mui/material/Typography';
import { ICartItem } from "../components/ICartItem";
import { StyledButton, StyledImg } from './Product.styles';
import NumberPicker from "react-widgets/NumberPicker";
import Box from '@mui/material/Box';

type IndividualProductProps = {
    product: IProduct;
    onAddToCart: (clickedproduct: ICartItem) => void;
}


const IndividualProduct = (props: IndividualProductProps) => {

    //Id
    const { id } = useParams();
    const [product, setProduct] =useState<IProduct>();
    
    const selectProduct = async () => {
        if (props.product == null) setProduct( await getProduct(id!));
        else setProduct(props.product);
    }
    // eslint-disable-next-line
    useEffect(() =>{ 
        // eslint-disable-next-line
        selectProduct();
        // console.log(product?.name);
        // console.log(product?._id);
    },
    // eslint-disable-next-line
    []);


    const [value, setValue] = useState<number>(1);

    const productToItem = (prod: IProduct) => ({ product: prod, units: value });    

    if (typeof product === "undefined"){
        return (
            <Box sx={{bgcolor: 'background.default', display: 'flex', flexWrap: 'wrap', flexDirection: 'column', height: '100vh'}}>
                <Typography
                    variant='h4'
                    sx={{color:'text.default', padding: 4}}>
                    No such product exists
                </Typography>
                
            </Box>
        );
    } else {

        const addProductToCart = () => {
            props.onAddToCart(productToItem(product));
            setValue(1);
        }

        let imageRef: string = require("../static/images/" + product._id + ".png");

        return (
            <Box sx={{bgcolor: 'background.default', display: 'flex', flexWrap: 'wrap', flexDirection: 'column', height: '100vh'}}>
                
                <Box sx={{margin: '1em', borderRadius: 25, alignItems: "center", justifyContent: "center"}}>

                    <Grid item >
                        <div className="product-pic">
                            <StyledImg
                                src={imageRef}
                                alt="Product"
                            />
                        </div>
                    </Grid>

                    <Grid item sm={1}/>

                    <Grid item >
                        <div className="product-info">
                            <h2>{product.name}</h2>
                            <Card sx={{maxWidth: 550}}>
                                <Typography>{product.description}</Typography>
                            </Card>
                            <h3>Price: {product.price}€</h3>
                            <NumberPicker min={1} value={value} onChange={value => { if (value !== null ) setValue(value)}}></NumberPicker>
                        
                            <StyledButton onClick={addProductToCart}>Add to cart</StyledButton>
                        </div>
                    </Grid>
                </Box>
            </Box>
        );
    }
}

export default IndividualProduct;