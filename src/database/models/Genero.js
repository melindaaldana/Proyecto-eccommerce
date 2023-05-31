module.exports = (sequelize, DataTypes) =>{
  let alias = "Genero";
  let cols = {
    id: {
      type: DataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
}
  
  let config = {
    timestamps: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false

  }

  const Genero = sequelize.define(alias, cols, config);

  Genero.associate = function (models){
    Genero.hasMany(models.Libro, {
        as: "libros",
        foreignKey: "id_genero"
    })
  }
   return Genero
};