import express, {Request, Response} from'express';

const app = express();
const port = process.env.PORT || 3003;

app.get('/', (req: Request, res: Response) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log("Server was started!111!!!");
    console.log(`port: ${port}`);
});