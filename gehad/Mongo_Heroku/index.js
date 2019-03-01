const express=require('express');
const app=express();

const AccRts=require('./routes/AccRts');

app.use('/Accounts',AccRts);
app.set('port', (process.env.PORT || 5000));
app.get('/',(req,res)=>{
res.send('<a href="/Accounts">Accounts</a>');
})

app.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});