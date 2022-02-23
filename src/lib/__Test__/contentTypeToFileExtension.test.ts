import  fs from 'fs';
import { runTest } from "../../utils/runTest";
import contentTypeToFileExtension from "../contentTypeToFileExtension";

describe("Obtain destination path and file name", () => {
  runTest([
      {
          input: ["application/json"],
          expectedOutput: ".json",
      },
      {
          input: ["application/xml"],
          expectedOutput: ".xsl"
      }
  ]
    ,
    contentTypeToFileExtension
    , (input, output, defaultDescription) => {

        return `${input} should map to ${output}`
    }
  );
});

