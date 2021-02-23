//1 True

//2
export async function* getBooks() {
    const requestURL = await fetch('http://localhost:3456/books.json');
    try {
        const books = yield call(request, requestURL);
        yield put(booksLoaded(books));
    } catch (err){
        yield put(bookLoadingError(err));
    }
}

//3
const sendBooks = async () => {
    const ws1 = fs.createWriteStream('output.json');
    const books = await fetch('books.json');
    books.body.pipe(ws1);
    const rs1 = fs.createReadStream(`${__dirname}/output.json`);
    console.log(JSON.stringify(rs1));
}

//4
const sendBooks = async () => {
    const url1 = 'bookstore.com/books';
    const ws1 = fs.createWriteStream('output.json');
    const books = await fetch(url1);
    books.body.pipe(ws1);
    const rs1 = fs.createReadStream(`${__dirname}/output.json`);
    console.log(JSON.stringify(rs1));
}

//5
export async function* getPrice() {
    const title = yield select(makeTitle());
    const requestURL = `http://localhost:3456/books/${title}`;
    try {
        const books = yield call(request, requestURL);
        yield put(booksLoaded(books, title));
    } catch (err){
        yield put(bookLoadingError(err));
    }
}

//6
app.get('/books/:title',(req,res) =>{
    const {title} = req.params;
    fetch(`http://localhost/books/${title}`);
    const price = title.length * 3;
    res.json({title: `${title}`, price: `${price}`})
        .then(json => res.send(json));
})

//7
let re = /(\d[\s-]?)?[\(\[\s-]{0,2}?\d{3}[\)\]\s-]{0,2}?\d{3}[\s-]?\d{4}/;

//8
//The phone number is 601-123-4567.
//6011234567 is my number.
//Call (601) 123-4567 to reach me.

//9 True

//10 Events are an action when something happens in code, mainly used to fire events.
ws3.on('close', () =>{
    messageEmitter.emit('ws3Close');
})