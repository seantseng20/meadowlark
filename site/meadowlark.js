const express=require('express')
const {engine:expressHandlebars}=require('express-handlebars')

const app=express()

//設置Handlebars view engine
app.engine('handlebars',expressHandlebars({
    defaultLayout:'main',
}))

app.set('view engine','handlebars')

app.use(express.static(__dirname+'/public'))

const port=process.env.PORT||3000

const fortune=require('./lib/fortune')

app.get('/',(req,res)=>{
res.render('home')
})

app.get('/about',(req,res)=>{

  res.render('about',{fortune:fortune.getFortune})
})


//自訂404頁面
app.use((req,res)=>{
    res.status(404)
    res.render('404')
})

//自訂500頁面
app.use((err,req,res,next)=>{
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port,()=>{
    `Express started on http://localhost:${port};`+`press Ctrl-C to terminate.`
})