const path = require('path');
const express = require('express');
const hbs= require('hbs');
const request = require ('request');
const geocode = require ('./utils/geocode.js')
const forecast = require ('./utils/forecast.js')

const app = express();




// Define paths for express cpnfig
const public_dir_path = path.join(__dirname,'../public');
const viewspath= path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

//setup handlebars and views location
app.set('views', viewspath);
app.set('view engine','hbs');
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(public_dir_path));

app.get('',(req,res)=>{
    res.render('index',{
        title: 'weather',
        name: 'mayor'

    });
})

app.get('/about',(req,res)=>{

    res.render('about',{
        title : 'about me',
        name : 'mayor'

    });

} )

app.get('/help',(req,res)=>{

        res.render('help',{
            message:'help help hep!!',
            title : 'helpss',
            name : 'mayor jay'
        })


})


app.get('/weather',(req,res)=>{

    if(!req.query.address)
    {
        res.send({error})
    }
    else
    {
        geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
            if(error)
            {
                return res.send({error})
            }        
            forecast(latitude, longitude, (error, data) => {
                if (error)
                {   
                    return res.render('error',{
                        name: 'mayor',
                        title: '404',
                        error: error
                    })
                }
            res.send({
                    address : req.query.address,
                    location,
                    forecast: data
                })

            })
    
        })

    }
})



app.get('/help/*',(req,res)=>{

    res.render('error',{
        name : 'mayor',
        title : '404',
        error : 'help article not found'
    })
})



app.get('*',(req,res)=>{
    res.render('error',{
        name : 'mayor',
        title : '404',
        error : 'page not found'
    })
})


app.listen(3000,()=>{

    console.log('server runnning');

})