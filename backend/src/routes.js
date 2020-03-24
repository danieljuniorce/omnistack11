const express = require("express");

const routes = express.Router();

/**
 * IMPORT CONTROLLERS
 */
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

//Routes Controller ONG
routes.get("/ongs", OngController.index);
routes.get("/ongs", OngController.show);
routes.post("/ongs", OngController.store);
routes.put("/ongs", OngController.update);
routes.delete("/ongs", OngController.delete);

//Routes Controller Incidents
routes.get("/incidents", IncidentController.index);
routes.get("/incidents/:id", IncidentController.show);
routes.post("/incidents", IncidentController.store);
routes.put("/incidents", IncidentController.update);
routes.delete("/incidents/:id", IncidentController.delete);

//Routes Controller Profile
routes.get("/profile", ProfileController.index);

//Routes Controller Session
routes.get("/sessions", SessionController.create);

module.exports = routes;
