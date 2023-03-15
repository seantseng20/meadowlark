const fortune=require('./fortune')

exports.home=(req,res)=>{res.render('home')
res.cookie('monster','nom nom')
const monster=req.cookies.monster
console.log(monster)
}

exports.about=(req,res)=>res.render('about',{fortune:fortune.getFortune()})


exports.sectiontest=(req,res)=>res.render('sectiontest')

exports.newsletterSignup=(req,res)=>{
    res.render('newsletter-signup',{csrf:'CSRF token goes here'})
}
class NewsletterSignup {
  constructor({ name, email }) {
    this.name = name
    this.email = email
  }
  async save() {
    // here's where we would do the work of saving to a database
    // since this method is async, it will return a promise, and
    // since we're not throwing any errors, the promise will
    // resolve successfully
  }
}

exports.newsletterSignupProcess = (req, res) => {
  const name = req.body.name || '', email = req.body.email || ''
  // input validation
  if(!VALID_EMAIL_REGEX.test(email)) {
    req.session.flash = {
      type: 'danger',
      intro: 'Validation error!',
      message: 'The email address you entered was not valid.',
    }
    return res.redirect(303, '/newsletter-signup')
  }
  // NewsletterSignup is an example of an object you might create; since
  // every implementation will vary, it is up to you to write these
  // project-specific interfaces.  This simply shows how a typical
  // Express implementation might look in your project.
  new NewsletterSignup({ name, email }).save()
    .then(() => {
      req.session.flash = {
        type: 'success',
        intro: 'Thank you!',
        message: 'You have now been signed up for the newsletter.',
      }
      return res.redirect(303, '/newsletter-archive')
    })
    .catch(err => {
      req.session.flash = {
        type: 'danger',
        intro: 'Database error!',
        message: 'There was a database error; please try again later.',
      }
      return res.redirect(303, '/newsletter-archive')
    })
}

// exports.newsletterSignupProcess = (req, res) => {
//     console.log('Form(from querystring):'+req.query.form)
//     console.log('CSRF token (from hidden form field): ' + req.body._csrf)
//     console.log('Name (from visible form field): ' + req.body.name)
//     console.log('Email (from visible form field): ' + req.body.email)
//     res.redirect(303, '/newsletter-signup/thank-you')    
//   }

exports.newsletterSignupThankyou=(req,res)=>{res.render('newsletter-signup-thank-you')}

exports.notFound=(req,res)=>res.render('404')

/* eslint-disable no-unused-vars */
exports.serverError=(err,req,res,next)=>res.render('500')
/* eslint-enable no-unused-vars */

exports.newsletter=(req,res)=>{res.render('newsletter',{csrf:'CSRF token goes here'})}

exports.api={
  newsletterSignup:(req,res)=>{
  console.log('CSRF token(from hidden form field):'+req.body._csrf)
  console.log('Name(from visible form field):'+req.body.name)
  console.log('Email(from visible form field):'+req.body.email)
  res.send({result:'sucess'})
  }
}

exports.vacationPhotoContest = (req, res) => {
  const now = new Date()
  res.render('contest/vacation-photo', { year: now.getFullYear(), month: now.getMonth() })
}

exports.vacationPhotoContestProcess=(req,res,fields,files)=>{
  console.log('field data:',fields)
  console.log('files',files)
  res.redirect(303,'/contest/vacation-photo-thank-you')
}

exports.api.vacationPhotoContest=(req,res,fields,files)=>{
  console.log('field data:',fields)
  console.log('files:',files)
  res.send({result:'sucess'})
}

exports.vacationPhotoContestProcessThankYou = (req, res) => {
  res.render('contest/vacation-photo-thank-you')
}

const VALID_EMAIL_REGEX = new RegExp('^[a-zA-Z0-9.!#$%&\'*+\/=?^_`{|}~-]+@' +
  '[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?' +
  '(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$')

exports.newsletterArchive = (req, res) => res.render('newsletter-archive')