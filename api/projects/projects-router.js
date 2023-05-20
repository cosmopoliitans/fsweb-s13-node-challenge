// "project" routerını buraya yazın!
const router = require("express").Router();
const pm = require("./projects-model");
const mw = require("./projects-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allProjects = await pm.get();
    res.json(allProjects);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.validateProjectId, (req, res, next) => {
  try {
    res.json(req.currentProject);
  } catch (error) {
    next(error);
  }
});

router.post("/", mw.validateProjectPayload, async (req, res, next) => {
  try {
    let model = {
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed,
    };
    const inserted = await pm.insert(model);
    res.status(201).json(inserted);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  mw.validateProjectId,
  mw.validateProjectPayload,
  async (req, res, next) => {
    try {
      let model = {
        name: req.body.name,
        description: req.body.description,
        completed: req.body.completed,
      };
      const update = await pm.update(req.params.id, model);
      res.json(update);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.validateProjectId, async (req, res, next) => {
  try {
    await pm.remove(req.params.id);
    res.json({ message: "Silme işlemi tamamlandı." });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/actions", mw.validateProjectId, async (req, res, next) => {
  try {
    const projectActions = await pm.getProjectActions(req.params.id);
    res.json(projectActions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
