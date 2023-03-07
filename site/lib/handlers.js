exports.api={}

const fortune=require('./fortune')

exports.home=(req,res)=>res.render('home')

exports.about=(req,res)=>res.render('about',{fortune:fortune.getFortune()})

exports.sectiontest=(req,res)=>res.render('sectiontest')

exports.newsletterSignup=(req,res)=>{
    res.render('newsletter-signup',{csrf:'CSRF token goes here'})
}

exports.newsletterSignupProcess = (req, res) => {
    console.log('Form(from querystring):'+req.query.form)
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible form field): ' + req.body.email)
    res.redirect(303, '/newsletter-signup/thank-you')
  }

exports.newsletterSignupThankyou=(req,res)=>{res.render('newsletter-signup-thank-you')}

exports.notFound=(req,res)=>res.render('404')

/* eslint-disable no-unused-vars */
exports.serverError=(err,req,res,next)=>res.render('500')
/* eslint-enable no-unused-vars */