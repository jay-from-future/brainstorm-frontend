export class Idea {

    constructor(private _self: URL, private _title: string, private _description: string) {
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
}

/*
{
  "title": "test title",
  "description": "test description",
  "_links": {
    "self": {
      "href": "http://localhost:8080/ideas/5d406c0f628dc54cf096d39e"
    },
    "idea": {
      "href": "http://localhost:8080/ideas/5d406c0f628dc54cf096d39e"
    },
    "categories": {
      "href": "http://localhost:8080/ideas/5d406c0f628dc54cf096d39e/categories"
    },
    "voters": {
      "href": "http://localhost:8080/ideas/5d406c0f628dc54cf096d39e/voters"
    }
  }
}
 */