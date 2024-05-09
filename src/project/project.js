import Project from './projectModel.js';
import * as uuid from 'uuid';

export const createProject = async (req, res) => {
  try {
    const {name, description} = req.body
    if(!name ||!description) {
      return res.status(400).json({message: "all fields are required"})
    }
    let conf ={
      "application_name": name,
      "application_version": "1.0.0",
      "parts": [
          {
      "part_handler": "ReactHandlerV1",
      "version": "18.2.0",
      "pages": [
          {
          "component_name": "index",
          "react_component_relative_path": "components/react_app/index/reactIndex_1_v2_0_0.js",
          "install_path": "src",
          "constants": {},
          "packages": [
              {
              "package_name": "react-router-dom@6.22.1"
              }
          ]
          },
          {
          "component_name": "App",
          "react_component_relative_path": "components/react_app/ReactApp_1_v2_0_0.js",
          "install_path": "src",
          "constants": {},
          "packages": [
              {
              "package_name": "react-redux@8.1.2"
              }
          ]
          }
      ]
      },
      {
          "part_handler": "TailwindCssHandler",
          "install_path": "src",
          "plugins": [
              {
              "plugin_name": "tailwindcss",
              "replacements": [
                  {
                  "pattern": "@@primaryColor@@",
                  "content": "#000000"
                  },
                  {
                  "pattern": "@@secondaryColor@@",
                  "content": "#FFFFFF"
                  }
              ]
              }
          ]
          },
          {
          "part_handler": "ResourceHandler",
          "resources": [
              {
              "source": "html/project_module/index.html",
              "destination": "public"
              },

              {
              "source": "images/project_module/public",
              "destination": "public"
              },

              {
              "source": "css/project_module/index.css",
              "destination": "src"
              },

              {
              "source": "css/project_module/tailwind.config.js",
              "destination": "./"
              },

              {
              "source": "css/project_module/App.css",
              "destination": "src"
              },

              {
              "source": "utils/project_module",
              "destination": "src"
              }
          ]
          }
      ]
  }
    if(!name ||!description) {
      return res.status(400).json({message: "all fields are required"})
    }
    const body = {
      conf,
      name,
      description,
      key: uuid.v4(),
      path: `/luday-dev/application-generator/generated/${name}`,
      port: Math.floor(Math.random() * (9999 - 9000 + 1)) + 9000,
      slug: name,
      pid: Math.floor(Math.random() * (40000 - 30000 + 1)) + 30000,
      status: true
    }
    const project = await Project.create(body)
    return res.status(201).json(project)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({message: error.message})
    
  }
}
export const getProject = async (req, res) => {
  try {
    const {id} = req.params
    const project = await Project.find({id})
    res.status(200).json(project)
  } catch (error) {
    res.status(500).json({message: error.message})
}
}

export const updateProject = async (req, res) => {
  try {
    const project = req.body
    if (!project.id || !project.conf) {
      return res.status(400).json({message: "all fields are required"})
    }
    const updatedProject = await Project.findByIdAndUpdate(project._id, project, {new: true})
    res.status(200).json(updatedProject)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}