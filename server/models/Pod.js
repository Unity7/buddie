const { Schema } = require('mongoose');
 
const podSchema = new Schema(
    {
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    }
)

module.exports = podSchema