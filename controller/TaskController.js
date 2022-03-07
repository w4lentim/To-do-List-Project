// Controller - métodos
const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const tasksList = await Task.find(); //pegar as listas lá do DB
        return res.render("index", { tasksList }); // assim que voltar com os dados, ele executará o return
    } catch (err) {
        res.status(500).send({ error: err.message }); // caso não consiga acesso, informará o erro
    }
};

const createTask = async (req, res) => {
    const task = req.body;

    if (!task.task) {
        return res.redirect("/");
    }

    try {
        await Task.create(task);
        return res.redirect("/");
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// Método da rota para exportação
module.exports = {
    getAllTasks,
    createTask,
};