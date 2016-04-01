/**
 * Created by Dhruv on 3/30/2016.
 */
module.exports = function(mongoose) {


    var FieldSchema = mongoose.Schema({
        label: String,
        type: String,
        placeholder: String,
        options: [{label:String, value:String}]
    },{collection:'assignment.formmaker.field'});
    return FieldSchema;
};