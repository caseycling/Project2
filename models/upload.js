// havent added any validation yet.. just basic skeleton now
module.exports = function (sequelize, DataTypes) {
    var Upload = sequelize.define("Upload", {
        product_name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        // will leave it as string until I figure out 
        file_path: {
            type: DataTypes.STRING
        }
    });

    // needs to link to user once Steven has login done:)
    // Upload.associate = function(models) {
    //     Upload.belongsTo(models.Login,{
    //     });
    // };

    return Upload;
}