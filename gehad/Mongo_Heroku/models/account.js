const mongoose=require('mongoose');
const schema=mongoose.Schema;

const AccountSchema = new schema({
    account_no:{type:Number,required:true,unique:true},
    owner_name:{type:String,required:true,unique:true},
    created_on:{type:Date,required:true,unique:false}
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;