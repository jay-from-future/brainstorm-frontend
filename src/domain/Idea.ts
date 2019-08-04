export class Idea {

    constructor(private _self: string,
                private _title: string,
                private _description: string,
                private _category: string,
                private _created: Date,
                private _updated: Date,
                private _thumbUp: number,
                private _thumbDown: number) {
    }

    static getDefault() {
        return new Idea('', '', '', '', new Date(), new Date(), 0, 0)
    }

    get self(): string {
        return this._self;
    }

    set self(value: string) {
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

    get thumbUp(): number {
        return this._thumbUp;
    }

    set thumbUp(value: number) {
        this._thumbUp = value;
    }

    get thumbDown(): number {
        return this._thumbDown;
    }

    set thumbDown(value: number) {
        this._thumbDown = value;
    }
}