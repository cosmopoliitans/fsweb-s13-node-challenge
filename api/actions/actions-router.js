// "eylem" routerını buraya yazın
const router = require("express").Router();
const actionsModel = require("./actions-model");
const mw = require("./actions-middlware");

router.get("/", async (req, res, next) => {
  try {
    const allActions = await actionsModel.get();
    res.json(allActions);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.validateActionId, (req, res, next) => {
  try {
    res.json(req.currentAction);
  } catch (error) {
    next(error);
  }
});

router.post("/", mw.validateActionPayload, async (req, res, next) => {
  try {
    let model = {
      project_id: req.body.project_id,
      notes: req.body.notes,
      description: req.body.description,
      completed: req.body.completed,
    };
    const insertedAction = await actionsModel.insert(model);
    res.status(201).json(insertedAction);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  mw.validateActionId,
  mw.validateActionPayload,
  async (req, res, next) => {
    try {
      let model = {
        project_id: req.body.project_id,
        notes: req.body.notes,
        description: req.body.description,
        completed: req.body.completed,
      };
      const updatedAction = await actionsModel.update(req.params.id, model);
      res.json(updatedAction);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", mw.validateActionId, async (req, res, next) => {
  try {
    await actionsModel.remove(req.params.id);
    res.json({ message: "Silme işlemi başarılı" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
