import Migration from '../migration.js';

async function createDB() {
    const migration = new Migration();
    await migration.up(`PRAGMA foreign_keys = ON;`);
 
    await migration.up(`
        create table if not exists structure(
        id integer primary key autoincrement,
        name text not null,
        address text not null
        );
    `)

    await migration.up(`
        create table if not exists floor(
        id integer primary key autoincrement,
        name text not null,
        structure_id integer not null,
        foreign key (structure_id) references structure(id) 
        on delete cascade 
        );
    `)

    await migration.up(`
        create table if not exists room(
        id integer primary key autoincrement,
        room_number text not null,        
        floor_id integer not null,
        foreign key (floor_id) references floor(id) 
        on delete cascade
        );
    `)

    await migration.up(`
        create table if not exists place(
        id integer primary key autoincrement,
        number text not null,     
        room_id integer not null,
        foreign key (room_id) references room(id) 
        on delete cascade
        );
    `)

    await migration.up(`
        create table if not exists location(
        id integer primary key autoincrement,
        name text not null,
        parent_id integer,
        foreign key (parent_id) references parent(id)
        on delete set null
        );
    `)

    await migration.up(`
        create table if not exists category(
        id integer primary key autoincrement,
        name text not null,
        parent_id integer,
        foreign key (parent_id) references category(id)
        on delete set null
        );
    `)

    await migration.up(`
        create table if not exists item(
        id integer primary key autoincrement,
        name text not null,
        status text not null,
        category_id integer,
        current_location_id integer,
        location_id integer,
        properties jsonb not null,

        foreign key (category_id) references category(id) 
        on delete set null,
        foreign key (location_id) references location(id) 
        on delete set null,
        foreign key (current_location_id) references location(id) 
        on delete set null
        );
    `) 
}
(async () => {
    await createDB();
})();