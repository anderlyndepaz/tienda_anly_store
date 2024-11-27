const Pedido = require('../models/Pedido');

const getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.status(200).json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
};

const getPedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await Pedido.findByPk(id);

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.status(200).json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el pedido' });
  }
};


const updatePedido = async (req, res) => {
  try {
    const { id } = req.params; //valor id
    const { cantidad, cuenta_pagar } = req.body; //valor de cantidad y cuenta :)

    const pedido = await Pedido.findByPk(id);

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    pedido.cantidad = cantidad ?? pedido.cantidad; //null, se mantiene 
    pedido.cuenta_pagar = cuenta_pagar ?? pedido.cuenta_pagar; //lo mismo

    await pedido.save(); //metodo sequelize para guardar 

    res.status(200).json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el pedido' });
  }
};

const deletePedido = async (req, res) => {
  try {
    const { id } = req.params;

    const pedido = await Pedido.findByPk(id);

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    await pedido.destroy();

    res.status(200).json({ message: 'Pedido eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el pedido' });
  }
};

module.exports = {
  getPedidos,
  getPedidoById,
  updatePedido,
  deletePedido,
};