const db = require("../../database/models")
const sequelize = db.Sequelize

const librosApi = {
    list: (req, res) =>{
        db.Libro.findAll()
        .then(libro =>{
            res.status(200).json({
                meta: {
                    status: 200,
                    total: libro.length,
                    url: "api/librosApi"
                }
            })
        })
    }
}

module.exports = librosApi;