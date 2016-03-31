/**
 * Created by Dhruv on 3/30/2016.
 */
module.exports = function(mongoose) {

    var FieldSchema = require("./field.schema.server.js");

    var FormSchema = mongoose.Schema({
        userId: String,
        title: { type: String, default: "New Form"},
        fields: [FieldSchema],
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now }
    }, {collection: 'assignment.formmaker.form'});
    return FormSchema;
};