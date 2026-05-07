-- Categories
INSERT INTO categories (name, display_name, description, image_url) VALUES
('DOG', 'Dogs', 'Loyal, loving, and playful companions for every lifestyle.', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800'),
('CAT', 'Cats', 'Independent, elegant, and endlessly entertaining companions.', 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800'),
('BIRD', 'Birds', 'Colorful, cheerful, and intelligent feathered friends.', 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800'),
('FISH', 'Fish', 'Beautiful, calming aquatic pets for your home.', 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800');

-- Dogs (6)
INSERT INTO pets (name, breed, age_months, price, description, image_url, status, category_id) VALUES
('Buddy', 'Golden Retriever', 6, 1200.00, 'Buddy is a playful and friendly Golden Retriever puppy who loves fetch and cuddles. He is vaccinated and microchipped.', 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='DOG')),
('Max', 'German Shepherd', 12, 1500.00, 'Max is a loyal and intelligent German Shepherd. Well-trained, great with families and protective of his home.', 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='DOG')),
('Bella', 'Beagle', 8, 900.00, 'Bella is a curious and gentle Beagle who loves outdoor adventures. She is great with children and other pets.', 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='DOG')),
('Charlie', 'French Bulldog', 5, 2500.00, 'Charlie is an adorable French Bulldog with a big personality. Low maintenance and perfect for apartment living.', 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='DOG')),
('Luna', 'Siberian Husky', 10, 1800.00, 'Luna is a stunning Siberian Husky with piercing blue eyes. Energetic and loves the outdoors.', 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='DOG')),
('Rocky', 'Labrador Retriever', 7, 1100.00, 'Rocky is a cheerful and friendly Labrador who loves swimming and playing. Ideal family dog.', 'https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='DOG'));

-- Cats (6)
INSERT INTO pets (name, breed, age_months, price, description, image_url, status, category_id) VALUES
('Whiskers', 'Persian', 14, 800.00, 'Whiskers is a gentle and affectionate Persian cat with a luxurious coat. She loves being pampered.', 'https://images.unsplash.com/photo-1511275539165-cc46b1ee89bf?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='CAT')),
('Oliver', 'Maine Coon', 18, 1200.00, 'Oliver is a majestic Maine Coon, one of the largest domestic cat breeds. Friendly and dog-like in personality.', 'https://images.unsplash.com/photo-1598188306155-25e400eb5078?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='CAT')),
('Nala', 'Siamese', 9, 700.00, 'Nala is a talkative and social Siamese cat. She loves attention and will follow you everywhere.', 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='CAT')),
('Simba', 'British Shorthair', 11, 1100.00, 'Simba is a calm and easygoing British Shorthair. Perfect for quiet households.', 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='CAT')),
('Mia', 'Bengal', 6, 1500.00, 'Mia is an active and playful Bengal cat with a wild, spotted coat. She loves interactive toys.', 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='CAT')),
('Leo', 'Ragdoll', 16, 950.00, 'Leo is a docile and cuddly Ragdoll who goes limp with affection. Great for families with children.', 'https://images.unsplash.com/photo-1569591159212-b02ea8a9f239?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='CAT'));

-- Birds (6)
INSERT INTO pets (name, breed, age_months, price, description, image_url, status, category_id) VALUES
('Kiwi', 'Budgerigar', 3, 45.00, 'Kiwi is a friendly and social budgie who can learn to mimic words. Easy to care for and great for beginners.', 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='BIRD')),
('Mango', 'Cockatiel', 5, 120.00, 'Mango is a cheerful cockatiel who loves whistling tunes. Very affectionate and hand-tamed.', 'https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='BIRD')),
('Rio', 'African Grey Parrot', 24, 2200.00, 'Rio is a highly intelligent African Grey known for exceptional mimicry. Requires experienced owner.', 'https://images.unsplash.com/photo-1548767797-d8c844163c4a?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='BIRD')),
('Sunny', 'Sun Conure', 8, 450.00, 'Sunny is a vibrant and social Sun Conure. Colorful, energetic, and loves being the center of attention.', 'https://images.unsplash.com/photo-1590418606746-018840f9eff0?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='BIRD')),
('Pearl', 'Lovebird', 4, 85.00, 'Pearl is an affectionate Lovebird best kept in pairs. Small, colorful, and full of personality.', 'https://images.unsplash.com/photo-1617715016568-6c72f35e9c33?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='BIRD')),
('Zeus', 'Macaw', 36, 3500.00, 'Zeus is a stunning Blue and Gold Macaw with brilliant plumage. A lifelong companion for dedicated owners.', 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='BIRD'));

-- Fish (6)
INSERT INTO pets (name, breed, age_months, price, description, image_url, status, category_id) VALUES
('Nemo', 'Clownfish', 2, 25.00, 'Nemo is a vibrant Clownfish ideal for saltwater aquariums. Hardy and beginner-friendly.', 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='FISH')),
('Dory', 'Blue Tang', 3, 60.00, 'Dory is a beautiful Blue Tang with striking coloration. Best kept in larger tanks with experienced keepers.', 'https://images.unsplash.com/photo-1573824258540-26b97ca8e6a0?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='FISH')),
('Goldie', 'Goldfish', 1, 12.00, 'Goldie is a classic fancy goldfish perfect for beginners. Easy to care for and very peaceful.', 'https://images.unsplash.com/photo-1520302519878-3b5a8e3c3e8d?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='FISH')),
('Blaze', 'Betta Fish', 2, 18.00, 'Blaze is a stunning red Betta fish with flowing fins. Keep alone — very territorial but mesmerizing to watch.', 'https://images.unsplash.com/photo-1583501791422-5e7eca4e5899?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='FISH')),
('Coral', 'Discus Fish', 6, 150.00, 'Coral is a rare and beautiful Discus fish, the "king of the aquarium." Requires pristine water conditions.', 'https://images.unsplash.com/photo-1496309732348-3627f3f040ee?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='FISH')),
('Gill', 'Angelfish', 4, 35.00, 'Gill is an elegant Angelfish with distinctive shape. Peaceful community fish for planted tanks.', 'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=600', 'AVAILABLE', (SELECT id FROM categories WHERE name='FISH'));

-- Admin user (password: Admin@123)
INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES
('admin@petstore.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Admin', 'User', 'ADMIN');
