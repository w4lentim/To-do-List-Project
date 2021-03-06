// Controller - métodos
const Task = require('../models/Task');

let message = "";
let type = "";

const getAllTasks = async (req, res) => {
    try {
        const tasksList = await Task.find(); //pegar as listas lá do DB
        return res.render("index", { 
            tasksList,
            task: null,
            taskDelete: null,
            message,
            type
        });
    } catch (err) {
        res.status(500).send({ error: err.message }); // caso não consiga acesso, informará o erro
    }
};

const createTask = async (req, res) => {
    const task = req.body;

    if (!task.task) {
        message = "Insira um texto, antes de adicionar uma nova tarefa!";
        type = "danger";
        return res.redirect("/");
    }

    try {
        await Task.create(task);
        message = "Tarefa criada com sucesso!";
        type = "success";
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
            res.render("index", { task, taskDelete: null, tasksList, message, type });
        } else {
            const taskDelete = await Task.findOne({ _id: req.params.id });
            res.render("index", { task: null, taskDelete, tasksList, message, type });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const updateOneTask = async (req, res) => {
    try {
        const task = req.body;
        await Task.updateOne({ _id: req.params.id }, task);
        message = "Tarefa atualizada com sucesso!";
        type = "success";
        res.redirect("/");
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

const deleteOneTask = async (req, res) => {
    try {
        await Task.deleteOne({ _id: req.params.id });
        message = "Tarefa excluída com sucesso!";
        type = "success";
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