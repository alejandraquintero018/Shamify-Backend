const router = require('express').Router();
//const { json } = require('body-parser');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  console.log('here')
  Category.findAll({
    include: [Product],
  })
    .then((categories) => res.json(categories))
    .catch((err) => res.status(500).json(err))
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }],
    }).then((categoryData) => res.status(200).json(categoryData))
    if (!categoryData) {
      res.status(404).json({ message: 'There are no categories under that id' });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category'
router.post('/', async (req, res) => {
  try {
    const createCategory = await Category.create({
      category_name: req.body.category_name,
    })
    .then((createCategory) => res.status(200).json(createCategory))
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.body.id
      }
    });
    res.status(200).json(updateCategory);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      }
    }).then((deleteCategory) => res.status(200).json(deleteCategory))
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
