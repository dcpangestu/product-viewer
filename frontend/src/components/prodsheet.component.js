import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export default class ProductSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_name: '',
            price: '',
            dimension: '',
            colours: '',
            material: '', 
            image: ''
        }
    }

    componentDidMount() {
        let visitCounter = parseInt(Cookies.get('visitCounter'));
        console.log(visitCounter);
        
        if (!visitCounter) {
            Cookies.set('visitCounter', 1);
        } else {
            Cookies.set('visitCounter', visitCounter + 1);
        }

        axios.get('https://backend-product-viewer.herokuapp.com/')
        .then(response => {
            if (visitCounter >= 9) {
                Cookies.set('visitCounter', 1);
            }
            let product = response.data[visitCounter - 1]
            this.setState({
                product_name: product.product_name,
                price: product.price,
                dimension: product.dimension,
                colours: product.colours,
                material: product.material, 
                image: product.image
            })
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
      render(){
        return (
            <Grid container xs={12} spacing={3} justify="center" alignContent="center">
                <Card style={{ maxWidth: 345, margin: 50 }}>
                    <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image={this.state.image}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                        {this.state.product_name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Price: {this.state.price} <br/>
                            Dimension: {this.state.dimension} <br/>
                            Colours: {this.state.colours} <br/>
                            Material: {this.state.material} <br/>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
        );
    }
}