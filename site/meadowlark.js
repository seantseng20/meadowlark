const express=require('express')
const {engine:expressHandlebars}=require('express-handlebars')
const handlers=require('./lib/handlers')

const app=express()

//設置Handlebars view engine
app.engine('handlebars',expressHandlebars({
    defaultLayout:'main',
}))

app.set('view engine','handlebars')

app.use(express.static(__dirname+'/public'))

const port=process.env.PORT||3000

const fortune=require('./lib/fortune')

app.get('/',handlers.home)

app.get('/about',handlers.about)

//自訂404頁面
app.use(handlers.notFound)

//自訂500頁面
app.use(handlers.serverError)

if(require.main===module){
app.listen(port,()=>{
    `Express started on http://localhost:${port};`+`press Ctrl-C to terminate.`
})
}
else{
    module.exports=app
}