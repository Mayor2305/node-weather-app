const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=12d974018c9bb18655cd4654688cd9bb&query='+latitude+','+longitude;

    request({url:url,json: true},(error,{body}={})=>{
        if(error)
        {
                callback('NETWORK ERROR',undefined);
        }
        else if(body.error)
        {
            callback('unable to find the location',undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+'.current temperature : ' +body.current.temperature+'. feels like : ' +body.current.feelslike)
        }
    })
}

module.exports=forecast