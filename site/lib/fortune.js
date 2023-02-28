const fortuneCookies=[
    "Conquer your fears or they will conquer you.",
    "River need springs.",
    "Do not fear what you dont know.",
    "You will have a pleasant surpise.",
    "whenever possible,keep it simple.",
]

exports.getFortune=()=>{
    const idx=Math.floor(Math.random()*fortuneCookies.length)
    return fortuneCookies[idx]
}