// Controller - métodos
const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
    try {
        const tasksList = await Task.find(); //pegar as listas lá do DB
        return res.render("index", { tasksList, task: null, taskDelete: null }); // assim que voltar com os dados, ele executará o return
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

const getById = async (req, res) => {
    try {
        const tasksList = await Task.find();
        if (req.params.method == "update") {
            const task = await Task.findOne({ _id: req.params.id });
            res.render("index", { task, taskDelete: null, tasksList });
        } else {
            const taskDelete = await Task.findOne({ _id: req.params.id });
            res.render("index", { task: null, taskDelete, tasksList });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const updateOneTask = async (req, res) => {
    try {
        const task = req.body;
        await Task.updateOne({ _id: req.params.id }, task);
        res.redirect("/");
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const deleteOneTask = async (req, res) => {
    try {
        await Task.deleteOne({ _id: req.params.id });
        res.redirect("/");
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

// Método da rota para exportação
module.exports = {
    getAllTasks,
    createTask,
    getById,
    updateOneTask,
    deleteOneTask
};