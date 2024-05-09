import { Router } from 'express';
import {
  updateProject,
  createProject,
  getProjects,
  getProject,
} from './project.js';
const projectRouter = Router();

projectRouter
  .route('/')
  .get(getProjects)
  .post(createProject)
  .patch(updateProject)
projectRouter.route('/:id').get(getProject)
export default projectRouter;
