const Cesta = require('../models/Cesta');
const Articulo = require('../models/Articulo'); 
const Pedido = require('../models/Pedido');
const Usuario = require('../models/Usuario');


// POST: Crear un nuevo pedido y generar la cesta
const pagar = async (req, res) => {
  try {
    const { id_usuario } = req.body;  // ID del usuario que está pagando

    if (!id_usuario) {
      return res.status(400).json({ error: 'Falta el id_usuario' });
    }

    // 1. Obtenemos todos los artículos en la cesta del usuario
    const cestaArticulos = await Cesta.findAll({
      where: { id_usuario },
      include: {
        model: Articulo,
        attributes: ['id_articulos', 'nombre', 'precio'],
      },
    });

    if (cestaArticulos.length === 0) {
      return res.status(404).json({ error: 'No hay artículos en la cesta para pagar' });
    }

    // 2. Calculamos la cantidad de artículos y el total a pagar
    const cantidad = cestaArticulos.length;
    const cantidadPagar = cestaArticulos.reduce((total, item) => total + item.articulo.precio, 0);

    // 3. Creamos el nuevo pedido
    const nuevoPedido = await Pedido.create({
      id_usuario,
      cantidad,
      cantidad_pagar: cantidadPagar,
      fecha_pedido: new Date(),
    });

    // 4. Creamos los registros correspondientes en la tabla Cesta
    // Para cada artículo en la cesta, asociamos el nuevo pedido
    for (let item of cestaArticulos) {
      await Cesta.create({
        id_articulos: item.articulo.id_articulos,
        id_pedido: nuevoPedido.id_pedido, // Relacionamos el artículo con el nuevo pedido
      });
    }

    // 5. Eliminamos los artículos de la cesta después del pago
    await Cesta.destroy({ where: { id_usuario } });

    res.status(201).json({
      message: 'Pedido creado y cesta generada correctamente',
      pedido: nuevoPedido,
      cantidad,
      cantidad_pagar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al procesar el pedido',
      detalles: error.message,
    });
  }
};


const postCesta = async (req, res) => {
  try {
    const { id_pedido, id_articulos } = req.body;
    if (!id_pedido || !id_articulos) {
      return res.status(400).json({ error: 'Faltan datos requeridos: id_pedido o id_articulos' });
    }
    const pedido = await Pedido.findByPk(id_pedido);
    if (!pedido) {
      return res.status(404).json({ error: 'El pedido asociado no existe' });
    }
    const articulo = await Articulo.findByPk(id_articulos);
    if (!articulo) {
      return res.status(404).json({ error: 'El artículo asociado no existe' });
    }
    const nuevoCesta = await Cesta.create({
      id_pedido,
      id_articulos,
    });

    res.status(201).json({
      message: 'Artículo añadido a la cesta correctamente',
      cesta: nuevoCesta,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al añadir el artículo a la cesta',
      detalles: error.message,
    });
  }
};



const getCesta = async (req, res) => {
  try {
    const cesta = await Cesta.findAll({
      include: {
        model: Articulo,
        attributes: ['nombre', 'precio', 'descripcion'],
      },
    });
    res.status(200).json(cesta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la cesta' });
  }
};

const deleteArticuloCesta = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Cesta.destroy({ where: { ID_cesta: id } });

    if (!resultado) {
      return res.status(404).json({ error: 'Artículo no encontrado en la cesta' });
    }

    res.status(200).json({ message: 'Artículo eliminado de la cesta' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el artículo de la cesta' });
  }
};


const deleteAllCesta = async (req, res) => {
  try {
    await Cesta.destroy({ where: {} }); 
    res.status(200).json({ message: 'Todos los artículos de la cesta han sido eliminados' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar todos los artículos de la cesta' });
  }
};

module.exports = { getCesta, deleteArticuloCesta, deleteAllCesta, postCesta, pagar };
