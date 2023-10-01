create table products(
	id varchar(100),
	name varchar(100),
	description text,
	price int,
	stock int,
	sold int,
	image text[],
	category_id varchar(100),
	store_id varchar(100),
	create_at timestamp default CURRENT_TIMESTAMP not null,
	update_at timestamp default CURRENT_TIMESTAMP not null
);

CREATE  FUNCTION update_updated_at_product()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';



CREATE TRIGGER update_product_updated_at
    BEFORE UPDATE
    ON
        products
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_product();