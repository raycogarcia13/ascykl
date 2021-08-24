class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keyword = this.queryString.keyword ? {
            'texts.name': {
                $regex: this.queryString.keyword,
                $options: `i`
            }
            // 'texts.name': {
            //     $regex: this.queryString.keyword,
            //     $options: `i`
            // }
        }: {}

        this.query = this.query.find({ ...keyword })
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryString }

        // remove fields
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);
        
        let qryStr = JSON.stringify(queryCopy);
        qryStr = qryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        
        this.query = this.query.find(JSON.parse(qryStr))
        // console.log(this.query)
        return this;
    }

    pagination(resPerPage){
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resPerPage* (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures