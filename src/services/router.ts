import express, { Router, Request, Response, NextFunction } from "express";

import * as middlewares from "../middlewares";
import * as appTypes from "../../types";
import * as regionHandlers from "./handlers/regions";
import * as servantHandlers from "./handlers/servants";
import * as childHandlers from "./handlers/children";
import * as attendanceHandlers from "./handlers/attendance";
const router = Router();

// ********* Region Routes ********* //
// Get all regions
router.get("/regions", regionHandlers.getRegions);
// Get one region
router.get("/regions/:id");
// Create new region
router.post(
  "/regions",
  middlewares.validateRegion,
  regionHandlers.createRegion
);
// Update region
router.put(
  "/regions/:id",
  middlewares.validateRegion,
  regionHandlers.updateRegion
);
// Delete region
router.delete("/regions/:id", regionHandlers.deleteRegion);

// get all servants in a region
router.get("/regions/:id/servants", regionHandlers.getRegionServants);
// get all children in a region
router.get("/regions/:id/children", regionHandlers.getRegionChildren);

// count all servants in a region
router.get("/regions/:id/servants/count", regionHandlers.countRegionServants);

// count all children in a region
// router.get("/regions/:id/children/count", regionHandlers.countRegionChildren);

// ********* End Region Routes ********* //

// ********* Servant Routes ********* //
// Get all servants
router.get("/servants", servantHandlers.getServants);
// Get one servant
router.get("/servants/:id", servantHandlers.getServant);
// Create new servant
router.post(
  "/servants",
  middlewares.validateServant,
  servantHandlers.createServant
);
// Update servant
router.put("/servants/:id", servantHandlers.updateServant);
// Delete servant
router.delete("/servants/:id", servantHandlers.deleteServant);

// get all children for a servant
router.get("/servants/:id/children", servantHandlers.ChildrensByServant);
// ********* End Servant Routes ********* //

// ********* Child Routes ********* //
// Get all children
router.get("/children", childHandlers.getChildren);
// Get one child
router.get("/children/:id", childHandlers.getChild);
// Create new child
router.post("/children", middlewares.validateChild, childHandlers.createChild);
// Update child
router.put("/children/:id", childHandlers.updateChild);
// Delete child
router.delete("/children/:id", childHandlers.deleteChild);

// ********* End Child Routes ********* //

// ********* Attendance Routes ********* //
// Get all attendances
router.get("/attendance", attendanceHandlers.getAttendance);
// Get one attendance
router.get("/attendance/:id", attendanceHandlers.getAttendance);
// Create new attendance
router.post("/attendance", attendanceHandlers.createAttendance);
// Update attendance
router.put("/attendance/:id", attendanceHandlers.updateAttendance);
// Delete attendance
router.delete("/attendance/:id", attendanceHandlers.deleteAttendance);

export default router;
