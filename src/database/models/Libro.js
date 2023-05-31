module.exports = (sequelize, DataTypes) =>{
  let alias = "Libro";
  let cols = {
    id: {
      type: DataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    id_genero: {
      type: DataTypes.BIGINT(10).UNSIGNED,
      allowNull: false
    },
    autor: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2).UNSIGNED,
      allowNull: false
    },
    paginas: {
      type: DataTypes.BIGINT(10),
      allowNull: false
    },
    stock: {
      type: DataTypes.BIGINT(10).UNSIGNED,
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING(255)
    },
    editorial: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  };
  
  let config = {
    timestamps: true,
    createdAt: false,
    updatedAt: false,
    deletedAt: false

  }

  const Libro = sequelize.define(alias, cols, config);

  Libro.associate = function(models){
    Libro.belongsTo(models.Genero, {
        as: "genero",
        foreignKey: "id_genero"
    })
  }
  
  return Libro;
};
