const express=require('express')
// const {engine:expressHandlebars}=require('express-handlebars')
const expressHandlebars=require('express-handlebars')
const bodyParser=require('body-parser')
const expressSession=require('express-session')
const cookieParser=require('cookie-parser')
const {credentials}=require('./config')
const multiparty=require('multiparty')
const handlers=require('./lib/handlers')
const weatherMiddleware=require('./lib/middleware/weather')
const flashMiddleware=require('./lib/middleware/flash')

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

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(cookieParser(credentials.cookieSecret))

app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:credentials.cookieSecret,
}))

app.use(express.static(__dirname+'/public'))

const port=process.env.PORT||3000

const fortune=require('./lib/fortune')

app.use(weatherMiddleware)
app.use(flashMiddleware)

app.get('/',handlers.home)

app.get('/about',handlers.about)

app.get('/section-test',handlers.sectiontest)

app.get('/newsletter',handlers.newsletter)
app.post('api/newsletter-signup',handlers.api.newsletterSignup)
app.get('/newsletter-signup',handlers.newsletterSignup)
app.post('/newsletter-signup/process',handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you',handlers.newsletterSignupThankyou)
app.get('/contest/vacation-photo', handlers.vacationPhotoContest)
app.post('/contest/vacation-photo/:year/:month',(req,res)=>{
    const form=new multiparty.Form()
    form.parse(req,(err,fields,files)=>{
        if(err) return res.status(500).send({error:err.message})
        handlers.vacationPhotoContestProcess(req,res,fields,files)
    })
})

app.get('/contest/vacation-photo-thank-you', handlers.vacationPhotoContestProcessThankYou)

app.get('/newsletter-archive', handlers.newsletterArchive)


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
