/**
 * Created by Dhruv on 4/16/2016.
 */
module.exports = function(mongoose) {
    var ApartmentSchema = mongoose.Schema({
        title: String,
        number_of_bedrooms: String,
        description: String,
        amenities: [String],
        city: String,
        cleaning_fee: {type:Number,default:5.0},
        price: {type:Number,default:50},
        country:String,
        featured_photo: [String],
        owner_id:String,
        number_of_bathrooms:String,
        rating:String,
        zipcode:String,
        favourite_count:{type:Number,default:0}
    }, {collection: 'project.rentout.apartment'});
    return ApartmentSchema;
};

