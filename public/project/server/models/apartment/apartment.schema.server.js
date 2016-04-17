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
        cleaning_fee: String,
        price: Number,
        country:String,
        featured_photo: [String],
        owner_id:String,
        number_of_bathrooms:String,
        rating:String,
        zipcode:String,
        favourite_count:Number
    }, {collection: 'project.rentout.apartment'});
    return ApartmentSchema;
};

