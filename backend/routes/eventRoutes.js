router.get('/', listEvents);
router.get('/:id', getEvent);

router.post(
  '/',
  protect,
  authorizeRoles('admin'),
  upload.single('banner'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
  ],
  createEvent
);

router.put('/:id', protect, authorizeRoles('admin'), upload.single('banner'), updateEvent);
router.delete('/:id', protect, authorizeRoles('admin'), deleteEvent);