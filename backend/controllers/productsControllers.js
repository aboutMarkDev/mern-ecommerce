import Product from "../models/productsModel.js";
import cloudinary from "../config/cloudinary.js";

// Add/Create Product
export const addProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    size,
    category,
    subCategory,
    variationsName,
  } = req.body;

  const varNameArray = JSON.parse(variationsName);
  const sizeArray = JSON.parse(size);
  const categoryStr = JSON.parse(category);
  const subCategoryStr = JSON.parse(subCategory);

  try {
    // Checks if there are images/file uploaded
    if (!req.files["imageUrl"] || !req.files["varImgUrls"]) {
      return res
        .status(400)
        .json({ message: "Product image and variations required." });
    }

    // Upload the productImageUrl to cloudinary
    const pdImage = await cloudinary.uploader.upload(
      req.files["imageUrl"][0].path,
      {
        asset_folder: "Ecommerce/Products",
      }
    );
    // If there are problems in uploading to cloudinary (e.g., file size)
    if (!pdImage) return console.log("Error on uploading product image");

    // Upload all variation image urls in cloudinary
    const urls = await Promise.all(
      req.files["varImgUrls"].map((file) => {
        return cloudinary.uploader.upload(file.path, {
          asset_folder: "Ecommerce/Products/Variations",
        });
      })
    );
    // If there are any error on uploading in cloudinary (e.g., file size)
    if (!urls) return console.log("Error on uploading variations images");

    // Store here the imageUrl
    const varImageUrls = [];
    // store the urls like this: ['url', 'url', ...etc]
    varImageUrls.push(...urls.map((url) => url.secure_url));

    // Store the variationsDetails such as the variation name and the image url
    // (e.g., [{ name: "Variation 1", imageUrl: "secure_url"}, ...etc])
    const varArr = [];

    // Checks if the variation names and imageurls have the same length
    if (varNameArray.length === varImageUrls.length) {
      varArr.push(
        ...varNameArray.map((name, index) => ({
          name,
          imageUrl: varImageUrls[index],
        }))
      );
    } else {
      return res
        .status(400)
        .json({ message: "No. of variation name and imageUrl were not equal" });
    }

    const add = await Product.create({
      name,
      description,
      imageUrl: pdImage.secure_url,
      price,
      size: sizeArray,
      variations: [{ name, imageUrl: pdImage.secure_url }, ...varArr],
      category: categoryStr,
      subCategory: subCategoryStr,
    });

    if (!add) return console.log("Error on creating product");

    res.status(201).json({ message: "Product Added" });
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products)
      return res
        .status(400)
        .json({ message: "Fetching product failed in mongoose" });

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    if (!productId) {
      return res.status(400).json({ message: "Product ID not provided." });
    }

    const product = await Product.findById(productId);

    const productDetails = {
      id: product._id,
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      size: product.size,
      variations: product.variations,
      category: product.category,
      subCategory: product.subCategory,
    };

    res.status(200).json(productDetails);
  } catch (error) {
    console.log(error);
  }
};

export const editProductById = async (req, res) => {
  const { productId } = req.params;
  const {
    updatedName,
    updatedDescription,
    updatedPrice,
    updatedCategory,
    updatedSubcategory,
    updatedSizes,
  } = req.body;

  try {
    if (!productId) return res.status(400);

    const productToBeUpdated = await Product.findById(productId);
    if (!productToBeUpdated)
      return res.status(400).json({ message: "Product not found" });

    productToBeUpdated.name = updatedName || productToBeUpdated.name;
    productToBeUpdated.description =
      updatedDescription || productToBeUpdated.description;
    productToBeUpdated.price = updatedPrice || productToBeUpdated.price;
    productToBeUpdated.category =
      updatedCategory || productToBeUpdated.category;
    productToBeUpdated.subCategory =
      updatedSubcategory || productToBeUpdated.subCategory;
    productToBeUpdated.size = updatedSizes || productToBeUpdated.size;

    const updatedProduct = await productToBeUpdated.save();
    res.status(200).json({ message: "Product Updated" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    const productToBeDeleted = await Product.findById(productId);

    // Delete the img url of the product first in cloudinary.
    const { imageUrl } = productToBeDeleted;
    const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0];
    const deleteImgUrl = await cloudinary.uploader.destroy(publicId);

    if (!deleteImgUrl) {
      console.log("Deleting the main img url in cloudinary failed");
      return res.status(500).json({ message: "Something went wrong." });
    }

    // Arrays of variation urls
    // (e.g., ['imageUrl', 'imageUrl', ...etc])
    const variationsImgUrl = productToBeDeleted.variations.map(
      (vrs) => vrs.imageUrl
    );

    await Promise.all(
      variationsImgUrl.map((url) => {
        const publicId = url.split("/").slice(-1)[0].split(".")[0];
        return cloudinary.uploader.destroy(publicId, (error, result) => {
          if (error) {
            return console.log("Deletion of imageUrls failed", error);
          }
          return console.log("Deletion of imageUrls sucessfully", result);
        });
      })
    );

    const deletedProduct = await Product.deleteOne({ _id: productId });

    if (deletedProduct.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Something went wrong. Product not found." });
    }

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.log(error);
  }
};
