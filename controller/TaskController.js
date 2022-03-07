// Controller - métodos
const getAll = (req, res) => {
    return res.render("index");
};

// Método da rota para exportação
module.exports = {
    getAll,
};