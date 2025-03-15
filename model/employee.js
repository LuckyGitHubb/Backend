const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

// const counterSchema = new mongoose.Schema({
//     _id: { type: String }, 
//     sequence_value: { type: Number, default: 0 }
//   });

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    mobile:{
        type:String,
    },
    city:{
            type:String,

        },
    experience:{
        type:String,
    },
    age:{
        type:String,
    },
    department:{
        type:String,
    },
    gender:{
        type:String,
    },
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
})
// const getNextSequenceValue = async () => {
//     const result = await counterModel.findByIdAndUpdate(
//       { _id: 'employee_id' }, 
//       { $inc: { sequence_value: 1 } }, 
//       { new: true, upsert: true } 
//     );
//     return result.sequence_value;
//   };
  

//   employeeSchema.pre('save', async function(next) {
//     if (!this.sequence) {
//       const nextSequence = await getNextSequenceValue();
//       this.sequence = nextSequence;
//     }
//     next();
//   });
  
const employeeModel = mongoose.model('employee',employeeSchema)
module.exports = employeeModel
