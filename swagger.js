import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

// Swagger Definition
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "API documentation for the E-Commerce system",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: [path.resolve("routes/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

export default function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs available at http://localhost:5000/api-docs");
}
