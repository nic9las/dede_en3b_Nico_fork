import React, {useState, useEffect} from "react";
import Grid from "@mui/material/Grid";
import { IProduct } from "../../../restapi/model/Products";
import {useParams} from 'react-router-dom';
import {getProduct} from '../api/api';
import { Card } from "@mui/material";
import Typography from '@mui/material/Typography';
import { ICartItem } from "../components/ICartItem";
import { StyledOuterGrid, StyledButton, StyledImg } from './Product.styles';
import NumberPicker from "react-widgets/NumberPicker";

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

    useEffect(() =>{ 
        selectProduct();
        console.log(product?.name);
        console.log(product?._id);
    }, []);


    const [value, setValue] = useState<number>(1);

    const showValue = (n : number) => console.log(value);

    const productToItem = (prod: IProduct) => ({ product: prod, units: value });

    if (typeof product === "undefined"){
        return (
            <React.Fragment>
                <h2>No such product exists</h2>
            </React.Fragment>
        );
    } else {

        let imageRef: string = require("../static/images/" + id + ".png");

        return (
            <React.Fragment>
                
                <StyledOuterGrid container>

                    <Grid item xs={4}>
                        <div className="product-pic">
                            <StyledImg
                                src={imageRef}
                                alt="Product"
                            />
                        </div>
                    </Grid>

                    <Grid item xs={4} >
                        <div className="product-info">
                            <h2>{product.name}</h2>
                            <Card sx={{maxWidth: 550}}>
                                <Typography>{product.description}</Typography>
                            </Card>
                            <h3>Price: {product.price}€</h3>
                            <NumberPicker min={1} value={value} onChange={value => { if (value !== null ) setValue(value); showValue(1)}}></NumberPicker>
                        
                            <StyledButton onClick={event => props.onAddToCart(productToItem(product))}>Add to cart</StyledButton>
                        </div>
                    </Grid>
                </StyledOuterGrid>
            </React.Fragment>
        );
    }
}

export default IndividualProduct;