create table products(
	id varchar(100),
	name varchar(100),
	image text,
	create_at timestamp default CURRENT_TIMESTAMP not null,
	update_at timestamp default CURRENT_TIMESTAMP not null
);

CREATE  FUNCTION update_updated_at_categorys()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';



CREATE TRIGGER update_categorys_updated_at
    BEFORE UPDATE
    ON
        categorys
    FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_categorys();