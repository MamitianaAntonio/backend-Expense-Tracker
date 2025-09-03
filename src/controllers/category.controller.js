import {
  getCategoriesQuery,
  postCategoryQuery,
  updateCategoryQuery,
  deleteCategoryQuery,
} from "../services/category.js";
export const getCategories = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("the user id is" + userId);
    const resultSet = await getCategoriesQuery(userId);
    res.status(200).json({ data: resultSet.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const postCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("the user id is" + userId);
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }
    const resultSet = await postCategoryQuery(userId, name);
    res.status(201).json({
      message: "Category created successfully",
      data: resultSet.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("the user id is" + userId);
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }
    const resultSet = await updateCategoryQuery(userId, id, name);
    if (resultSet.rowCount === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      message: "Category updated successfully",
      data: resultSet.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("the user id is" + userId);
    const { id } = req.params;
    const resultSet = await deleteCategoryQuery(userId, id);
    if (resultSet.rowCount === 0) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      message: "Category deleted successfully",
      data: resultSet.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
