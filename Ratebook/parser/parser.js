const joi = require('joi')
const jgen = require('joi-generate').Generate()

var schema = joi.object({
  name: joi.string().min(2).max(12).required(),
  birthdate: joi.date().required(),
  gender: joi.string().valid(['male', 'female']).required()
})

// joi.example()
// console.log(joi.validate({
//   name: 'omar',
//   birthdate: '2056-06-27T05:56:41.407Z',
//   gender: 'whatever'
// }, schema))

jgen(schema, (err, model) => {
  if (err) {
    console.log(err)
  } else {
    console.log(model)
  }
})
