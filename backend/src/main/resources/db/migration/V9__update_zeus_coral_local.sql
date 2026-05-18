-- Update Zeus and Coral to use local, verified high-resolution animal images
UPDATE pets SET image_url = '/images/pets/zeus.png' WHERE name = 'Zeus';
UPDATE pets SET image_url = '/images/pets/coral.png' WHERE name = 'Coral';
