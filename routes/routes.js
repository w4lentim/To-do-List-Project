const routes = require('express').Router();
const TaskController = require("../controller/TaskController");

routes.get("/", TaskController.getAllTasks);
routes.post('/create', TaskController.createTask); // post para habilitar a nova postagem
routes.get('/getById/:id/:method', TaskController.getById);
routes.post('/updateOneTask/:id', TaskController.updateOneTask);
routes.get('/deleteOneTask/:id', TaskController.deleteOneTask);

module.exports = routes;