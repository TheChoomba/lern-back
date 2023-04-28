import express, {Request, Response} from'express';

const app = express();

app.use(express.json());

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