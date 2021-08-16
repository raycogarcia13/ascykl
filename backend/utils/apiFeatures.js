class APIFeatures {
    constructor(query, queryString, prop) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keyword = this.queryString ? {
            name: {
                $regex: this.queryString,
                $options: `i`
            }
        }: {}

        this.query = this.query.find({ ...keyword })
        return this;
    }
}

module.exports = APIFeatures