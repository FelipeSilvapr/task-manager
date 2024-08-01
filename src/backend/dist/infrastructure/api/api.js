"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const list_controller_1 = require("../controller/list.controller");
const task_controller_1 = require("../controller/task.controller");
const app = new hono_1.Hono();
app.onError((err, c) => {
    const body = JSON.stringify({
        message: 'Internal Server Error',
        error: err.message
    });
    return new Response(body, {
        status: 500,
        headers: {
            'Content-Type': 'application/json'
        }
    });
});
app.use(async (context, next) => {
    //@ts-ignore
    context.set('userId', '57bad979-0d73-448e-b4ea-a1b7fbef8d7f');
    await next();
});
app.route('/', list_controller_1.ListController);
app.route('/', task_controller_1.TaskController);
(0, node_server_1.serve)(app);
