const express=require('express')
// const {engine:expressHandlebars}=require('express-handlebars')
const expressHandlebars=require('express-handlebars')
const handlers=require('./lib/handlers')
const weatherMiddleware=require('./lib/middleware/weather')
const app=express()

//設置Handlebars view engine
app.engine('handlebars',expressHandlebars.engine({
    defaultLayout:'main',
    helpers:{
        section:function(name,options){
            if(!this._sections)this._sections={}
            this._sections[name]=options.fn(this)
            return null
        }
    }
}))

app.set('view engine','handlebars')

app.use(express.static(__dirname+'/public'))

const port=process.env.PORT||3000

const fortune=require('./lib/fortune')

app.get('/',handlers.home)

app.get('/about',handlers.about)

app.get('/section-test',handlers.sectiontest)

//自訂404頁面
app.use(handlers.notFound)

//自訂500頁面
app.use(handlers.serverError)

app.use(weatherMiddleware)

if(require.main===module){
app.listen(port,()=>{
    `Express started on http://localhost:${port};`+`press Ctrl-C to terminate.`
})
}
else{
    module.exports=app
}
