-- Fix photos for Zeus (Macaw) and Coral (Discus Fish) with beautiful, correct animal images from Unsplash
UPDATE pets SET image_url = 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=600' WHERE name = 'Zeus';
UPDATE pets SET image_url = 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600' WHERE name = 'Coral';
