import sqlite from 'sqlite3';

export default class SqliteLinker{
    constructor(filename) {
        this.filename = filename;
        this.db = null;
    }

    /**
    * Создаём подключение к SQLite-базе по файлу this.filename
    * При ошибке выводим детали в консоль
    * При успехе сообщаем, что БД запущена
    */
    async connect() {
        return new Promise ((resolve, reject)=>{
            this.db = new sqlite.Database(this.filename, (err)=> {
                if(err) {
                    console.log(JSON.stringify(err));
                    reject(err);
                    return;
                }
                console.log(`Database is started... on the ${this.filename}`);
                resolve(this.db);
            });    
        });
    }

    /**
    * Оборачиваем асинхронный вызов db.run в Promise, чтобы можно было использовать await (Promise (промис) — это специальный объект в JavaScript, который «обещает» вернуть результат позже: когда завершится какая‑то долгая операция (например, запрос к базе данных, загрузка файла, сетевой запрос).)
    * Выполняем SQL-запрос с параметрами
    * Если возникла ошибка — логируем её и отклоняем Promise
    * При успехе возвращаем метаданные запроса: ID последней вставленной строки и число изменений
    * Возвращаем результат
    */
    async run(sql, params = []) {
        return new Promise((resolve, reject)=> {
            if(!this.db) {
                return reject(new Error('База данных не подключена'));
            }
            this.db.run(sql, params,function (err) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve({
                    lastId: this.lastID,
                    changes: this.changes,
                });
            });
        });
    }

    /**
    * Оборачиваем callback-метод db.get в Promise, чтобы использовать await
    * Выполняем SQL-запрос, который должен вернуть одну строку
    * При ошибке логируем её и отклоняем Promise
    * При успехе возвращаем полученную строку
    * Возвращаем результат: объект строки либо undefined
    */
    async get(sql, params = []) {
        return new Promise((resolve, reject)=> {
            if(!this.db) return reject (new Error('База данных не подключена'));
            this.db.get(sql, params, function (err, row) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(row);
            });
        });
    }

    /**
    * Оборачиваем вызов в Promise, чтобы можно было использовать await
    * db.all Для получения всех строк
    * При ошибке логируем её и отклоняем Promise
    * Возвращаем массив всех найденных строк
    * Возвращаем результат (массив строк или пустой массив)
    */
    async all(sql, params = []){
        return new Promise((resolve, reject)=> {
            if (!this.db) return reject (new Error('База данных не подключена'));
            this.db.all(sql, params, function (err, rows) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }

    /**
    * Оборачиваем закрытие БД в Promise, чтобы можно было использовать await
    * Вызываем метод закрытия соединения с базой данных
    * Если при закрытии возникла ошибка — логируем и отклоняем Promise
    * Если всё хорошо — разрешаем Promise (данных возвращать не нужно)
    */
    async close() {
        return new Promise((resolve, reject)=> {
            if (!this.db) {
                return resolve();
            }
            this.db.close((err)=> {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                this.db = null;
                resolve();
            });
        });
    }

    createPlaceholders(arr) {
        return arr.map(()=> '?').join(', ');
    }

    createSetBlock(properties) {
        const values = [];

        const block = Object.entries(properties)
            .map(([KeyboardEvent, value])=> {
                if (isEmpty(value)) return null;

                values.push(value);
                return `${key} = ?`;
            })
            .filter((p) => p !== null)
            .join(', ');

        return { block, values };
    }
}