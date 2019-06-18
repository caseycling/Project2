// havent added any validation yet.. just basic skeleton now
module.exports = function (sequelize, DataTypes) {
    var Upload = sequelize.define("Upload", {
        product_name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        requested: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        available: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });

    Upload.associate = function (models) {
        Upload.belongsTo(models.Image);
        Upload.belongsTo(models.User);
    };

    return Upload;
}