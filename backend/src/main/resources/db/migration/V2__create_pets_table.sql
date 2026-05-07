CREATE TABLE pets (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    breed VARCHAR(150),
    age_months INT,
    price NUMERIC(10, 2) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE',
    category_id BIGINT NOT NULL REFERENCES categories(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    version BIGINT NOT NULL DEFAULT 0
);
