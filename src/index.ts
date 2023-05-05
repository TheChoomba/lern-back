import express, {Request, Response} from'express';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

const port = process.env.PORT || 3003;

const product  = [{id: 1, title: 'tomato'}, {id: 2, title: "orange"}]
const addresses = [{id: 1, value: 'asdasda'}, {id: 2, value: 'asdqwewzxczx'}]

app.get('/product', (req: Request, res: Response) => {
    if(req.query.title) {
        let serchString = req.query.title.toString();
        res.send(product.filter(t => t.title?.indexOf(serchString) > -1))        
    }
    else { 
        res.send(product);
    }
});

app.get('/product/:id', (req: Request, res: Response) => {
    let productShow = product.find(t => t.id === +req.params.id);
    if(productShow) {
        res.send(productShow);
    }
    else {
        
        res.send(404)
    }
});

app.delete('/product/:id', (req: Request, res: Response) => {
    for(let i = 0; i< product.length; i++) {
        if(product[i].id === + req.params.id) {
            product.splice(i, 1);
            res.send(204);

            return;
        }
    }

    res.send(404);
});

app.post('/product', (req: Request, res: Response) => {
    const newProduct = {
        id: +(new Date()), 
        title: req.body.title
    }

    product.push(newProduct);
    res.status(201).send(newProduct);
});

app.put('/product/:id', (req: Request, res: Response) => {
    const newProduct = product.find(t => t.id === +req.params.id);
    if(newProduct){
        newProduct.title = req.body.title;
        res.status(201).send(newProduct); 
    }
    else {
        res.send(404);
    }
});


app.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses);
});

app.get('/addresses/:id', (req: Request, res: Response) => {
    let id = addresses.find(t => t.id === +req.params.id);
    if(id) {
        res.send(id);
    } 
    else {
        res.send(404);
    }
});

app.listen(port, () => {
    console.log("Server was started!111!!!");
    console.log(`port: ${port}`);
});