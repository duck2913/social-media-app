const db = require("./config")

const execute = async () => {
	const result = await db.any(
		`create table users(
            id int serial primary key not null,
            name varchar(50) not null,
            title varchar(50),
            avatar_url varchar(50)
        )`,
	)
	// const result = await db.any("select * from products")
	console.log(result)
}

execute()
