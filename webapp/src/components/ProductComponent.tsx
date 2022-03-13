import { render } from "@testing-library/react";
import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IProduct } from "../../../restapi/model/Products";
import { ICartItem } from "./ICartItem";
import { useNavigate } from 'react-router-dom';

type ProductComponentProps = {
  product: IProduct;
  onAddToCart: (clickedproduct: ICartItem) => void;
}

function ProductComponent(props: ProductComponentProps): JSX.Element {

  const productToItem = (prod: IProduct) => ({ product: prod, units: 1 });
  let imageRef: string = require("../static/images/" + props.product._id + ".png");
  const navigate = useNavigate();
    return (
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="350"
          image={imageRef}
        alt={props.product.description}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {props.product.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
        {props.product.price} €
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {props.product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
          <Button onClick={event => props.onAddToCart(productToItem(props.product))}>Add to cart</Button>
          <Button onClick={event => navigate(`/products/${props.product._id}`)}>See more</Button>
      </CardActions>
    </Card>
    )
}

export default ProductComponent;
   


