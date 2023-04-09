import { v2 as cloudinary } from "cloudinary";
import { fileUpload } from "./../../src/helpers/fileUpload";

cloudinary.config({
  cloud_name: "dnix6ucks",
  api_key: "559948974233615",
  api_secret: "Qi6t9hMtOF6Id_I3HGDpy1NH8hM",
  secure: true,
});
describe("Test on fileUpload", () => {
  test("should upload img to cloudinary", async () => {
    const imgUrl =
      "https://www.traveloffpath.com/wp-content/uploads/2022/11/Skyline-Of-Dubai-United-Arab-Emirates-With-The-Tallest-Building-In-The-World-Burj-Khalifa-Reflecting-The-Sun-Shine-And-A-Sea-Of-Skyscrapers-Surrounding-It-Middle-East-1.jpg.webp";
    const resp = await fetch(imgUrl);
    const blob = await resp.blob();
    const file = new File([blob], "testFoto.jpg");
    const url = await fileUpload(file);
    expect(typeof url).toBe("string");

    const segments = url.split("/");
    const imgId = segments[segments.length - 1].replace(".webp", "");

    const cloudResp = await cloudinary.api.delete_resources(
      ["journal/" + imgId],
      { resource_type: "image" }
    );
  });

  test("should return error", async () => {
    const file = new File([], "testFoto.jpg");
    const url = await fileUpload(file);
    expect(url).toBeNull();
  });
});
