export class Idea {

    constructor(private _self: URL,
                private _title: string,
                private _description: string,
                private _category: string,
                private _created: Date,
                private _updated: Date) {
    }

    static getDefault() {
        return new Idea(URL.prototype, '', '', '', Date.prototype, Date.prototype)
    }

    get self(): URL {
        return this._self;
    }

    set self(value: URL) {
        this._self = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get category(): string {
        return this._category;
    }

    set category(value: string) {
        this._category = value;
    }

    get created(): Date {
        return this._created;
    }

    set created(value: Date) {
        this._created = value;
    }

    get updated(): Date {
        return this._updated;
    }

    set updated(value: Date) {
        this._updated = value;
    }

}